import {BaseHttpService} from "./base-http.service";
import type {IGenericObject, IPagination} from "../../shared/models/general";
import queryString from "query-string";
import type {IPage} from "../../shared/models/page";

export class PageService extends BaseHttpService {
    async quickSearch(query: string): Promise<IPagination<IPage>> {
        return await this.get(`page/quick?q=${query}`);
    }

    async find(filters: IGenericObject = {}, relationships: string[] = []): Promise<IPagination<IPage>> {
        let qs;
        if (Object.keys(filters).length > 0) {
            qs = queryString.stringify(filters);
        }

        if (relationships.length > 0) {
            qs = qs ? `${qs}&${relationships.map(r => `with[]=${r}`).join('&')}` : relationships.map(r => `with[]=${r}`).join('&');
        }

        return await this.get(`page${qs ? `?${qs}` : ''}`);
    }

    async update(id: string, data: IGenericObject): Promise<IPage> {
        try {
            return  await this.patch(`page/${id}`, data);
        } catch (err) {
            throw err;
        }
    }


    async store(data: Partial<IPage>) {
        try {
            return await this.post(`page`, data);
        } catch (err) {
            throw err;
        }
    }


    async deleteProduct(id: string): Promise<boolean> {
        try {
            const res = await this.delete(`page/${id}`);
            return res;
        }
        catch (err) {
            throw err;
        }
    }

    async changeThumb(id: string, imageId: string) {
        return await this.patch(`page/${id}/change-thumb`, {imageId});
    }
}
