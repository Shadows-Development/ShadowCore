import {ShadowEvent} from "./ShadowEvent";
import {EventPriority} from "./EventPriority";

export type ShadowEventListener<T extends ShadowEvent> = (event: T) => void | Promise<void>;

export class ShadowEventBus {
    private listeners: Map<string, Map<EventPriority, Set<ShadowEventListener<any>>>> = new Map();

    subscribe<T extends ShadowEvent>(eventName: string, listener: ShadowEventListener<T>, priority: EventPriority = EventPriority.NORMAL) {
        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, new Map());
        }
        const priorityMap = this.listeners.get(eventName);

        if (!priorityMap!.has(priority)) {
            priorityMap!.set(priority, new Set());
        }
        priorityMap!.get(priority)!.add(listener);
    }

    async dispatch<T extends ShadowEvent>(eventName: string, event: T) {
        const priorityMap = this.listeners.get(eventName);
        if (!priorityMap) return;

        const order = [
            EventPriority.HIGH,
            EventPriority.NORMAL,
            EventPriority.LOW
        ]

        for (const priority of order) {
            const handlers = priorityMap.get(priority);
            if (!handlers) continue;
            for (const handler of handlers) {
                try {
                    await handler(event);
                } catch (err) {
                    console.error(
                        `[EventBus] Error handling ${eventName} @ ${EventPriority[priority]}`,
                        err
                    );
                }
                if (event.cancelled) return;
            }
        }
    }

}
