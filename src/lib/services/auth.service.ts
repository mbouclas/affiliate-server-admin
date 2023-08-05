import {BaseHttpService} from "./base-http.service";

export interface IStoredUser {
    accessToken: string;
    accessTokenExpiresAt: string;
    refreshToken: string;
    refreshTokenExpiresAt: string;
    client: IClient;
    user: IUser;
}
export interface IClient {
    id: string;
    grants?: (string)[] | null;
}
export interface IUser {
    lastName: string;
    firstName: string;
    createdAt: string;
    active: boolean;
    uuid: string;
    email: string;
    updatedAt: string;
    role?: (IRole)[] | null;
    gates?: (IGates)[] | null;
}
export interface IRole {
    createdAt: string;
    level: number;
    displayName: string;
    name: string;
    description: string;
    uuid: string;
    updatedAt: string;
}
export interface IGates {
    uuid: string;
    gate: string;
    level: string;
    name: string;
    provider: string;
}

export interface ISite {
    id: string;
    name: string;
    url: string;
    description: string;
}


export class AuthService  {
    static currentUser() {
        let storedUser;
        const storedUserString = localStorage.getItem('user');
        if (!storedUserString) {return null;}

        return storedUser = JSON.parse(storedUserString) as IStoredUser;
    }

    static token() {
        if (!AuthService.currentUser()) {return null;}
        return AuthService.currentUser().accessToken;
    }

    static getSessionId() {
        return localStorage.getItem('sessionId');
    }

    async login(email: string, password: string) {
        const res = await (new BaseHttpService())
            .setBaseUrl('auth')
            .post('login', {email, password});

        if (typeof res.success === 'string' && res.success === false && res.message) {
            throw new Error(res.message);
        }

        return res;
    }
}
