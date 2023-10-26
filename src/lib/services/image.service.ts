import {BaseHttpService} from "./base-http.service";
import type {IBaseImageModel, IGenericObject} from "../../shared/models/general";
import type {IPagination} from "../../shared/models/general";
import queryString from "query-string";

export class ImageService extends BaseHttpService {

    async find(filters: IGenericObject = {}, limit = 100): Promise<IPagination<IBaseImageModel>> {
        let qs;

        filters.limit = limit;

        if (Object.keys(filters).length > 0) {
            qs = queryString.stringify(filters);
        }



        return await this.get(`image${qs ? `?${qs}` : ''}`);
    }

    async deleteImage(imageId: string) {
        const res = await super.delete(`image/${imageId}`);
        return res.data;
    }

    async updateImageDetails(imageId: string, details: IGenericObject, model: string, modelId: string) {
        const res = await super.patch(`image/${imageId}/details`, {details, model, modelId});
        return res.data;
    }

    async setImageAsMain(imageId: string, model: string, modelId: string) {
        const res = await super.post(`image/${imageId}/set-main`, {
            model,
            modelId,
        });
        return res.data;
    }

    async updateImagesOrder(images: IGenericObject[], model: string, modelId: string) {
        const res = await super.post(`image/update-order`, {
            images: images.map((image, idx) => ({
                uuid: image.uuid,
                order: idx,
            })),
            model,
            modelId,
        });

        return res.data;
    }
}
