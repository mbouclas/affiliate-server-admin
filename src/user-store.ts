import {writable} from "svelte/store";
import type {ISite} from "./lib/services/auth.service";
export interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    clientId: string;
    token: string;
    sessionId: string;
    allowedSites?: ISite[];
    activeSite?: ISite;
}

export const userStore = writable<IUser>();

export const setUserStore = (user: IUser) => {
    userStore.set(user);

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('sessionId', user.sessionId);
};

export const setActiveSiteAction = (site: ISite) => {
    if (!site || !site.id) {return;}

    localStorage.setItem('appName', site.id);
    userStore.update((user) => {
        user.activeSite = site;
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    });

}

export const resetActiveSiteAction = () => {
    localStorage.removeItem('appName');
    userStore.update((user) => {
        user.activeSite = null;
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    });
}

let existingUser = localStorage.getItem('user');

if (existingUser) {
    const u = JSON.parse(existingUser);
    setUserStore(u);
    setActiveSiteAction(u.activeSite)
}


