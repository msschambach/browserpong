export interface Position {
    x?: number,
    y?: number
}

export class GameObject {

    observerHandlers: Array<Function>;

    constructor() {
        this.observerHandlers = [];
    }

    subscribe(fn) {
        if (typeof fn == 'function') {
            this.observerHandlers.push(fn);
        }
    }

    unsubscribe(fn) {
        if (typeof fn == 'function') {
            this.observerHandlers = this.observerHandlers.filter(
                function (item) {
                    if (item !== fn) {
                        return item;
                    }
                }
            );
        }
    }

    updateObservers(scope) {
        this.observerHandlers.forEach(fn => {
            fn(scope);
        });
    }
}