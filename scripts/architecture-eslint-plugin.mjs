const moduleImportPattern = /(?:^|\/)modules\/([^/]+)(?:\/(.*))?$/;
const publicFolders = new Set([
  "actions",
  "components",
  "containers",
  "data",
  "hooks",
  "queries",
  "requests",
  "schemas",
  "services",
  "store",
  "types",
  "use-cases",
]);

function getModuleImport(value) {
  const match = value.match(moduleImportPattern);
  return match ? { name: match[1], tail: match[2] ?? "" } : null;
}

const plugin = {
  rules: {
    "explicit-module-exports": {
      meta: {
        type: "problem",
        schema: [],
        messages: {
          noStar:
            "List module root exports explicitly; `export *` hides the public API.",
        },
      },
      create(context) {
        const isRootBarrel =
          /[\\/]src[\\/]modules[\\/][^\\/]+[\\/]index\.ts$/.test(
            context.filename,
          );
        return {
          ExportAllDeclaration(node) {
            if (isRootBarrel) context.report({ node, messageId: "noStar" });
          },
        };
      },
    },
    "module-boundaries": {
      meta: {
        type: "problem",
        schema: [],
        messages: {
          deep: "Import another feature through its root or subfolder public barrel, not an implementation file.",
        },
      },
      create(context) {
        const current = context.filename.match(
          /[\\/]src[\\/]modules[\\/]([^\\/]+)/,
        )?.[1];
        function check(node) {
          const value = node.source?.value;
          if (typeof value !== "string") return;
          const resolvedValue = value.startsWith("@/")
            ? value.slice(2)
            : path
                .relative(
                  process.cwd(),
                  path.resolve(path.dirname(context.filename), value),
                )
                .replaceAll("\\", "/");
          const imported = getModuleImport(resolvedValue);
          if (
            !current ||
            !imported ||
            imported.name === current ||
            !imported.tail
          )
            return;
          const parts = imported.tail.split("/");
          const last = parts.at(-1).replace(/\.(tsx?|jsx?)$/, "");
          if (
            last === "index" ||
            (parts.length === 1 && publicFolders.has(last))
          )
            return;
          context.report({ node, messageId: "deep" });
        }
        return {
          ImportDeclaration: check,
          ExportNamedDeclaration: check,
          ExportAllDeclaration: check,
        };
      },
    },
    "client-server-boundary": {
      meta: {
        type: "problem",
        schema: [],
        messages: {
          server:
            "Client code cannot import a server-only implementation or `server-only`.",
        },
      },
      create(context) {
        const source = context.sourceCode;
        const directives = source.ast.body
          .filter((node) => node.type === "ExpressionStatement")
          .map((node) => node.expression.value);
        const filename = context.filename;
        const isClient =
          directives.includes("use client") ||
          /[\\/]client[\\/]|\.client\.[jt]sx?$/.test(filename);
        function check(node) {
          const value = node.source?.value;
          if (
            isClient &&
            typeof value === "string" &&
            (value === "server-only" ||
              /(?:^|\/)server(?:\/|\.)|\.server(?:\.|$)/.test(value))
          ) {
            context.report({ node, messageId: "server" });
          }
        }
        return {
          ImportDeclaration: check,
          ExportNamedDeclaration: check,
          ExportAllDeclaration: check,
        };
      },
    },
  },
};

export default plugin;
import path from "node:path";
