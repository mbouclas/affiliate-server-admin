import {BaseHttpService} from "./base-http.service";
import type {IBaseImageModel, IGenericObject, IPagination} from "../../shared/models/general";
import type {IProduct} from "../../shared/models/product";
import queryString from 'query-string';
import type {IJob, IRepeatableJob} from "../../shared/models/jobs";

export interface INewProductJob {
    url: string;
    id: string;
    jobId: number;
}

export interface IAffiliate {
    name: string;
    slug: string;
}


export class ProductService extends BaseHttpService {
    static affiliates: IAffiliate[] = [
        {
            name: 'Amazon',
            slug: 'amazon',
        },

    ];

    async getAffiliates(): Promise<IAffiliate[]> {
        return ProductService.affiliates;
    }

    async find(filters: IGenericObject = {}, relationships: string[] = []): Promise<IPagination<IProduct>> {
        let qs;
        if (Object.keys(filters).length > 0) {
            qs = queryString.stringify(filters);
        }

        if (relationships.length > 0) {
            qs = qs ? `${qs}&${relationships.map(r => `with[]=${r}`).join('&')}` : relationships.map(r => `with[]=${r}`).join('&');
        }

        return await this.get(`product${qs ? `?${qs}` : ''}`);
    }

    async update(id: string, data: IGenericObject): Promise<IProduct> {
        try {
            const res = await this.patch(`product/${id}`, data);
            return res;
        } catch (err) {
            throw err;
        }
    }


    async deleteProduct(id: string): Promise<boolean> {
        try {
            const res = await this.delete(`product/${id}`);
            return res;
        }
        catch (err) {
            throw err;
        }
    }


    async addMultiple(urls: string[], affiliate: string): Promise<INewProductJob[]> {
        try {
            const res = await this.post(`scrapers/add-entries`, {urls, affiliate}) ;
            return res as Promise<INewProductJob[]>;
        } catch (err) {
            throw err;
        }
    }

    async addSingle(url: string, affiliate: string) {
        try {
            const res = await this.post(`scrapers/add-entry`, {url, affiliate}) ;
            return res as Promise<INewProductJob[]>;
        } catch (err) {
            throw err;
        }
    }

    async checkScraperStatus(id: number): Promise<{status: string, error?: string}> {
        return await this.get(`scrapers/${id}/status`);
    }

    async getActiveJobs(): Promise<IJob[]> {
        return await this.get(`scrapers/active-jobs`);
    }

    async getRepeatableJobs(): Promise<IRepeatableJob[]> {
        return await this.get(`scrapers/repeatable-jobs`);
    }

    async getRepeatableJob(id: string): Promise<IRepeatableJob> {
        return await this.get(`scrapers/repeatable-job/${id}`);
    }

    async getFailedJobs(): Promise<IJob[]> {
        return await this.get(`scrapers/failed-jobs`);
    }

    async changeThumb(id: string, imageId: string) {
        return await this.patch(`product/${id}/change-thumb`, {imageId});
    }

    async cancelRepeatableJob(id: string) {
        return await this.delete(`scrapers/repeatable-job/${id}`);
    }
}
