export type RuntimeEnvironment = "client" | "server";

export interface RegistryToken<TInstance> {
  readonly key: symbol;
  /** Type-only marker that keeps the token coupled to its instance type. */
  readonly __instanceType?: TInstance;
}

export interface RegistryBinding<TInstance> {
  readonly environment: RuntimeEnvironment;
  readonly instance: TInstance;
}

/** Decorates an instance with the runtime where it may be resolved. */
export type RegistryDecorator = <TInstance>(
  instance: TInstance,
) => RegistryBinding<TInstance>;

export type Registry = {
  provide<TInstance>(
    token: RegistryToken<TInstance>,
    binding: RegistryBinding<TInstance>,
  ): void;
  resolve<TInstance>(
    token: RegistryToken<TInstance>,
    environment?: RuntimeEnvironment,
  ): TInstance;
};
