import type {
  Registry,
  RegistryBinding,
  RegistryDecorator,
  RegistryToken,
  RuntimeEnvironment,
} from "./types";

export const createRegistryToken = <TInstance>(
  description: string,
): RegistryToken<TInstance> => ({
  key: Symbol(description),
});

/** Decorator used to declare where a dependency instance is available. */
export const forEnvironment =
  (environment: RuntimeEnvironment): RegistryDecorator =>
  <TInstance>(instance: TInstance): RegistryBinding<TInstance> => ({
    environment,
    instance,
  });

const detectRuntimeEnvironment = (): RuntimeEnvironment =>
  typeof window === "undefined" ? "server" : "client";

export const createRegistry = (
  runtime: RuntimeEnvironment = detectRuntimeEnvironment(),
): Registry => {
  const instances = new Map<symbol, Map<RuntimeEnvironment, unknown>>();

  return {
    provide(token, binding) {
      const registered = instances.get(token.key) ?? new Map();
      if (registered.has(binding.environment)) {
        throw new Error(
          `A dependency is already registered for ${binding.environment}.`,
        );
      }

      registered.set(binding.environment, binding.instance);
      instances.set(token.key, registered);
    },
    resolve(token, environment = runtime) {
      const registered = instances.get(token.key);
      if (!registered?.has(environment)) {
        throw new Error(
          `No dependency is registered for ${environment} runtime.`,
        );
      }

      return registered.get(environment) as typeof token.__instanceType;
    },
  };
};

export const registry = createRegistry();
