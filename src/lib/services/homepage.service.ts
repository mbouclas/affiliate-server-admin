import {BaseHttpService} from "./base-http.service";
import type {IHeroItem} from "../../shared/models/homepage";
import type {IProduct, IProductCategory} from "../../shared/models/product";

export class HomepageService extends BaseHttpService {
    async getHero() {
        return this.get('cms/hero');
    }

    async getFeaturedItems() {
        return this.get('cms/featured');
    }

    async getFeaturedCategories() {
        return this.get('cms/featured-categories');
    }

    async saveHero(data: IHeroItem) {
        return await this.post('cms/hero', data);

    }

    async saveFeaturedCategories(data: IProductCategory[]) {
        return await this.post('cms/featured-categories', { categories: data.map(item => item.id) });
    }

    async saveFeaturedItems(data: IProduct[]) {
        return await this.post('cms/featured-items', {items: data.map(item => item.id)});
    }
}
