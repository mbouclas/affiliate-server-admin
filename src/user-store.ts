import {writable} from "svelte/store";
export interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    clientId: string;
    token: string;
    sessionId: string;
}

export const userStore = writable<IUser>();

export const setUserStore = (user: IUser) => {
    userStore.set(user);

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('sessionId', user.sessionId);
};

let existingUser = localStorage.getItem('user');
if (existingUser) {
    setUserStore(JSON.parse(existingUser));
}
