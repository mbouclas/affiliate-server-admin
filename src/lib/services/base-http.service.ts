import {AuthService} from "./auth.service";
import type {IGenericObject} from "../../shared/models/general";

export class BaseHttpService {
    protected apiUrl = import.meta.env.VITE_API_URL;

    setBaseUrl(url: string) {
        this.apiUrl = import.meta.env.VITE_BASE_URL +  url + '/';
        return this;
    }

    getAuthHeaders() {
        const headers = new Headers();
        const token = AuthService.token();
        const sessionId = AuthService.getSessionId();
        if (token) {
            headers.append('Authorization', `Bearer ${AuthService.token()}`);
        }

        if (sessionId) {
            headers.append('x-sess-id', sessionId);
        }

        headers.append('x-app-name', localStorage.getItem('appName'));

        return headers;
    }

    async get(url: string, queryParams?: IGenericObject) {
        const headers = this.getAuthHeaders();

        const query = queryParams && Object.keys(queryParams).length > 0 ? `?${this.objectToQueryParams(queryParams)}` : '';
        const res = await fetch(`${this.apiUrl}${url}${query}`, {
            mode: "cors",
            credentials: "include",
            headers
        });
        return await res.json();
    }

    async post(url: string, body: IGenericObject = {}, extraHeaders: IGenericObject = {}) {
        try {
            const headers = this.getAuthHeaders();

            Object.keys(extraHeaders).forEach((header) => {
                headers.append(header, extraHeaders[header]);
            });

            const contentType = headers.get('Content-Type');
            if (!contentType) {
                headers.append('Content-Type', 'application/json');
            }

            const rawResponse = await fetch(`${this.apiUrl}${url}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(body),
            });
            if (!rawResponse.ok) {
                throw new Error('Bad request');
            }
            const res = await rawResponse.json();
            if (typeof res.success !== 'undefined' && !res.success) {
                throw res;
            }
            return res;
        } catch (err) {
            throw err;
        }
    }

    async patch(url: string, body: IGenericObject = {}, extraHeaders: IGenericObject = {}) {
        try {
            const headers = this.getAuthHeaders();

            Object.keys(extraHeaders).forEach((header) => {
                headers.append(header, extraHeaders[header]);
            });

            const contentType = headers.get('Content-Type');
            if (!contentType) {
                headers.append('Content-Type', 'application/json');
            }

            const rawResponse = await fetch(`${this.apiUrl}${url}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify(body),
            });
            if (!rawResponse.ok) {
                throw new Error('Bad request');
            }
            const res = await rawResponse.json();
            if (typeof res.success !== 'undefined' && !res.success) {
                throw res;
            }
            return res;
        } catch (err) {
            throw err;
        }
    }

    async delete(url: string) {
        try {
            const headers = this.getAuthHeaders();

            const contentType = headers.get('Content-Type');
            if (!contentType) {
                headers.append('Content-Type', 'application/json');
            }

            const rawResponse = await fetch(`${this.apiUrl}${url}`, {
                method: 'DELETE',
                headers,
            });
            if (!rawResponse.ok) {
                throw new Error('Bad request');
            }
            const res = await rawResponse.json();
            if (typeof res.success !== 'undefined' && !res.success) {
                throw res;
            }
            return res;
        } catch (err) {
            throw err;
        }
    }

    private objectToQueryParams(obj: IGenericObject) {
        return Object.entries(obj)
            .map(([k, v]) => `${k}=${encodeURIComponent(typeof v === 'object' ? JSON.stringify(v) : v)}`)
            .join('&');
    }
}
