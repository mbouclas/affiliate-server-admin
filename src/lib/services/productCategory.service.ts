import {BaseHttpService} from "./base-http.service";
import type {IBaseImageModel, IGenericObject} from "../../shared/models/general";
export interface IBaseCategoryModel {
    id: string;
    slug: string;
    title: string;
    parentId?: string;
    children: IBaseCategoryModel[];
    description?: string;
    thumb?: IBaseImageModel;
    metaData?: IGenericObject;
    order?: number;
}
export class ProductCategoryService extends BaseHttpService {
    async find(filters: IGenericObject = {}): Promise<IBaseCategoryModel[]> {

        return await this.get(`product-category`);
    }

    async findOne(id: string): Promise<IBaseCategoryModel> {
        return await this.get(`product-category/${id}`);
    }

    async update(id: string, data: Partial<IBaseCategoryModel>): Promise<IBaseCategoryModel> {
        return await this.patch(`product-category/${id}`, data);
    }

    async store(data: IBaseCategoryModel): Promise<IBaseCategoryModel> {
        return await this.post(`product-category`, data);
    }

    async remove(id: string): Promise<void> {
        return await this.delete(`product-category/${id}`);
    }

    async move(id: string, newParentId?: string): Promise<void> {
        const body = newParentId ? { newParentId } : {};
        return await this.patch(`product-category/${id}/move`, body);
    }
}
