import {BaseHttpService} from "./base-http.service";
import type {IGenericObject, IPagination} from "../../shared/models/general";
import type {IProduct} from "../../shared/models/product";
import queryString from "query-string";

export class TagService extends BaseHttpService {
    async find(filters: IGenericObject = {}, limit = 100): Promise<IPagination<IProduct>> {
        let qs;

        filters.limit = limit;

        if (Object.keys(filters).length > 0) {
            qs = queryString.stringify(filters);
        }



        return await this.get(`tag${qs ? `?${qs}` : ''}`);
    }

    async add(name: string) {
        return await this.post(`tag`, {name});
    }
}
