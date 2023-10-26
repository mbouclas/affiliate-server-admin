import {BaseHttpService} from "./base-http.service";
import type {IGenericObject} from "../../shared/models/general";
import type {IBaseCategoryModel} from "./productCategory.service";

export class PageCategoryService extends BaseHttpService {
    async find(filters: IGenericObject = {}): Promise<IBaseCategoryModel[]> {

        return await this.get(`page-category`);
    }

    async findOne(id: string): Promise<IBaseCategoryModel> {
        return await this.get(`page-category/${id}`);
    }

    async update(id: string, data: Partial<IBaseCategoryModel>): Promise<IBaseCategoryModel> {
        return await this.patch(`page-category/${id}`, data);
    }

    async store(data: IBaseCategoryModel): Promise<IBaseCategoryModel> {
        return await this.post(`page-category`, data);
    }

    async remove(id: string): Promise<void> {
        return await this.delete(`page-category/${id}`);
    }

    async move(id: string, newParentId?: string): Promise<void> {
        const body = newParentId ? { newParentId } : {};
        return await this.patch(`page-category/${id}/move`, body);
    }
}
