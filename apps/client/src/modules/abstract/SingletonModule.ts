export abstract class SingletonModule {
    private static instance: SingletonModule;

    protected constructor() {
        if (SingletonModule.instance) {
            throw new Error(`Instance of ${this.constructor.name} already exists. Use getInstance() instead.`);
        }
        SingletonModule.instance = this;
    }

    // static getInstance<T extends SingletonModule>(this: new () => T): T {
    //     !this.instance && this.instance = new this();
    //     return this.instance as T;
    // }
}
