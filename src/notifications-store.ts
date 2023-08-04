import {writable} from "svelte/store";

export interface INotification {
    message: string;
    type: "success" | "error" | "warning" | "info";
    expiration?: number;
}

export const notificationsStore = writable<INotification[]>([]);

export function setNotificationAction(notification: INotification | null) {
    notificationsStore.update((arr) => {
        const newArr = [
            { ...notification, expiration: notification.expiration || 3000 },
            ...arr,
        ];
        return newArr;
    });
}
