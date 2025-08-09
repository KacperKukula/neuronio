/* TESTING PURPOSES */

export function resetClickInterceptor(): void {
    ciInstance = null;
}

/* CORE OF THE MODULE */
let ciInstance: ClickInterceptor|null;

export function useClickInterceptor() {
    if(!ciInstance) {
        ciInstance = new ClickInterceptor()

        //@ts-ignore
        window.clickInterceptor = ciInstance;
    }
        
    return ciInstance;
}

export { Interception };

class ClickInterceptor {
    interceptors: Interception[] = [];

    constructor() {
        document.addEventListener('click', event => this.throughInterceptor(event))
    }

    intercept(interc: Interception) {
        this.interceptors.push(interc);
    }

    interceptOnce(interc: Interception) {
        queueMicrotask(() => {
            interc.setOnce(true);
            this.interceptors.push(interc);
        })
    }

    throughInterceptor(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!target) return;

        this.interceptors.forEach(interc => {
            if(!interc.target || (target.matches(interc.target) || target.closest(interc.target))) {
                try { interc.callback() }
                catch(error) { console.error('Error in click interceptor:', error) }

                // Delete interceptors that are one-use
                if(interc.getOnce())
                    this.interceptors = this.interceptors.filter(item => item != interc)
            }
        })
    }
}

class Interception {
    callback: Function;
    target?: string;
    private once: boolean = false;

    constructor(callback: Function, target?: string) {
        this.callback = callback;
        this.target = target;
    }

    setOnce(val: boolean) {
        this.once = val;
    }

    getOnce() {
        return this.once;
    }
}