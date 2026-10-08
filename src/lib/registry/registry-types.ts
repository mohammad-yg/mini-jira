export type Prettify<T> = {
  [K in keyof T]: T[K];
} & object;

export type RuntimeEnvironment = "client" | "server";

export type RuntimeImplementations<
  TDependencies extends object,
  TValue,
> = Record<
  RuntimeEnvironment,
  (dependencies: Readonly<Prettify<TDependencies>>) => TValue
>;

export interface Container<TInstances extends object> {
  readonly runtime: RuntimeEnvironment;
  readonly instances: Prettify<TInstances>;
  get<K extends keyof TInstances>(key: K): TInstances[K];
}

export type RegistryStep = (
  dependencies: Readonly<Record<PropertyKey, unknown>>,
  runtime: RuntimeEnvironment,
) => object;

export interface RegistryBuilder<
  TInstances extends object = Record<never, never>,
> {
  /**
   * Registers a factory for a dependency. The factory runs when `build()` is
   * called and receives the dependencies registered earlier in the chain.
   * Register providers in dependency order so each factory can access the keys
   * it needs. Use `provideForRuntime` when client and server need different
   * implementations.
   *
   * @example
   * ```ts
   * const builder = createRegistry()
   *   .provide("config", () => config)
   *   .provide("apiClient", ({ config }) => createApiClient(config.apiUrl));
   *
   * const apiClient = builder.build().get("apiClient");
   * ```
   */
  provide<K extends PropertyKey, V>(
    key: K extends keyof TInstances ? never : K,
    factory: (dependencies: Readonly<Prettify<TInstances>>) => V,
  ): RegistryBuilder<TInstances & Record<K, V>>;

  provideForRuntime<K extends PropertyKey, V>(
    key: K extends keyof TInstances ? never : K,
    implementations: RuntimeImplementations<TInstances, V>,
  ): RegistryBuilder<TInstances & Record<K, V>>;

  /**
   * Registers a module factory and adds every dependency it returns to the
   * registry. The factory runs during `build()` and can use dependencies
   * registered earlier in the chain. Use it to keep a module's related
   * dependencies together; its returned keys are available to later providers.
   *
   * @example
   * ```ts
   * const builder = createRegistry()
   *   .provide("apiClient", () => apiClient)
   *   .includeModule(({ apiClient }) => ({
   *     getProjects: createGetProjectsQuery({ apiClient }),
   *   }));
   *
   * const getProjects = builder.build().get("getProjects");
   * ```
   */
  includeModule<TModule extends object>(
    moduleFactory: (dependencies: Readonly<Prettify<TInstances>>) => TModule,
  ): RegistryBuilder<TInstances & TModule>;

  build(): Container<TInstances>;
}
