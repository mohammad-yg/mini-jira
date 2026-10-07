import type {
  Registry,
  RegistryBinding,
  RegistryDecorator,
  RegistryInjector,
  RegistryInjectorBinding,
  RegistryInjectorDecorator,
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

/** Declares the runtime where a dependency injector should run. */
export const injectorForEnvironment =
  (environment: RuntimeEnvironment): RegistryInjectorDecorator =>
  (inject: RegistryInjector): RegistryInjectorBinding => ({
    environment,
    inject,
  });

const detectRuntimeEnvironment = (): RuntimeEnvironment =>
  typeof window === "undefined" ? "server" : "client";

export const createRegistry = (
  runtime: RuntimeEnvironment = detectRuntimeEnvironment(),
  injectors: readonly RegistryInjectorBinding[] = [],
): Registry => {
  const instances = new Map<symbol, Map<RuntimeEnvironment, unknown>>();

  const registry: Registry = {
    provide<TInstance>(
      token: RegistryToken<TInstance>,
      binding: RegistryBinding<TInstance>,
    ) {
      const registered = instances.get(token.key) ?? new Map();
      if (registered.has(binding.environment)) {
        throw new Error(
          `A dependency is already registered for ${binding.environment}.`,
        );
      }

      registered.set(binding.environment, binding.instance);
      instances.set(token.key, registered);
    },
    resolve<TInstance>(
      token: RegistryToken<TInstance>,
      environment: RuntimeEnvironment = runtime,
    ): TInstance {
      const registered = instances.get(token.key);
      if (!registered?.has(environment)) {
        throw new Error(
          `No dependency is registered for ${environment} runtime.`,
        );
      }

      return registered.get(environment) as TInstance;
    },
  };

  for (const injector of injectors) {
    if (injector.environment === runtime) injector.inject(registry);
  }

  return registry;
};
