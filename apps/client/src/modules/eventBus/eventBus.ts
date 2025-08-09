
let eventInstance: EventBus|null;

export function useEventBus() {
    if(!eventInstance) eventInstance = new EventBus()
    return eventInstance;
}

export function resetEventBus(): void {
    eventInstance = null;
}

class EventBus {
    private events: Record<string, Function[]> = {};

    // Nasłuchuj na zdarzenie
    on(event: string, callback: Function): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    // Usuń nasłuchiwacz
    off(event: string, callback: Function): void {
        if (!this.events[event]) return;
        
        this.events[event] = this.events[event].filter(cb => cb !== callback);
        
        // Usuń event jeśli nie ma callbacków
        if (this.events[event].length === 0) {
            delete this.events[event];
        }
    }

    // Wyemituj zdarzenie
    emit(event: string, ...args: any[]): void {
        if (!this.events[event]) return;
        
        this.events[event].forEach(callback => {
            try {
                callback(...args);
            } catch (error) {
                console.error(`Error in event handler for '${event}':`, error);
            }
        });
    }

    // Nasłuchuj raz (automatycznie usuwa po pierwszym wywołaniu)
    once(event: string, callback: Function): void {
        const onceCallback = (...args: any[]) => {
            callback(...args);
            this.off(event, onceCallback);
        };
        this.on(event, onceCallback);
    }

    // Usuń wszystkie nasłuchiwacze dla zdarzenia
    removeAllListeners(event?: string): void {
        if (event) {
            delete this.events[event];
        } else {
            this.events = {};
        }
    }
}