import type {
  RegistryStep,
  RegistryBuilder,
  Container,
  Prettify,
  RuntimeEnvironment,
  RuntimeImplementations,
} from "./registry-types";

const createBuilder = <TInstances extends object>(
  steps: readonly RegistryStep[],
): RegistryBuilder<TInstances> =>
  Object.freeze({
    provide<K extends PropertyKey, V>(
      key: K extends keyof TInstances ? never : K,
      factory: (dependencies: Readonly<Prettify<TInstances>>) => V,
    ): RegistryBuilder<TInstances & Record<K, V>> {
      const registration: RegistryStep = (dependencies) => ({
        [key as PropertyKey]: factory(
          dependencies as Readonly<Prettify<TInstances>>,
        ),
      });

      return createBuilder<TInstances & Record<K, V>>([...steps, registration]);
    },

    provideForRuntime<K extends PropertyKey, V>(
      key: K extends keyof TInstances ? never : K,
      implementations: RuntimeImplementations<TInstances, V>,
    ): RegistryBuilder<TInstances & Record<K, V>> {
      const registration: RegistryStep = (dependencies, environment) => ({
        [key as PropertyKey]: implementations[environment](
          dependencies as Readonly<Prettify<TInstances>>,
        ),
      });

      return createBuilder<TInstances & Record<K, V>>([...steps, registration]);
    },

    includeModule<TModule extends object>(
      moduleFactory: (dependencies: Readonly<Prettify<TInstances>>) => TModule,
    ): RegistryBuilder<TInstances & TModule> {
      const registration: RegistryStep = (dependencies) =>
        moduleFactory(dependencies as Readonly<Prettify<TInstances>>);

      return createBuilder<TInstances & TModule>([...steps, registration]);
    },

    build(): Container<TInstances> {
      const runtime = detectRuntimeEnvironment();
      const resolved: Record<PropertyKey, unknown> = Object.create(null);

      for (const registration of steps) {
        const dependencies = Object.freeze({
          ...resolved,
        }) as Readonly<Record<PropertyKey, unknown>>;

        Object.assign(resolved, registration(dependencies, runtime));
      }

      const instances = Object.freeze({
        ...resolved,
      }) as Prettify<TInstances>;

      return Object.freeze({
        runtime,
        instances,
        get<K extends keyof TInstances>(key: K): TInstances[K] {
          return instances[key];
        },
      });
    }
  });

const detectRuntimeEnvironment = (): RuntimeEnvironment =>
  typeof window === "undefined" ? "server" : "client";

export const createRegistry = (): RegistryBuilder<Record<never, never>> =>
  createBuilder<Record<never, never>>([]);