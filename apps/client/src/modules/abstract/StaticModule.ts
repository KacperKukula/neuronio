export abstract class StaticModule {
    constructor() {
        console.error(`This is StaticModule. Instance of ${this.constructor.name}} should not be created`)
    }
}