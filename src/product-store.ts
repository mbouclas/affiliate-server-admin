import {writable} from "svelte/store";
import type {IProduct} from "./shared/models/product";
import type {IGenericObject} from "./shared/models/general";
export enum ProductStoreAction {
    ADD = 'add',
    UPDATE = 'update',
    DELETE = 'delete',
    THUMB_SET = 'thumb-set',
    GALLERY_ADD = 'gallery-add',
    GALLERY_REMOVE = 'gallery-remove',
    GALLERY_SET = 'gallery-set',
    TAG_ADD = 'tag-add',
    TAG_REMOVE = 'tag-remove',
    TAG_SET = 'tag-set',
    VARIANT_ADD = 'variant-add',
    VARIANT_REMOVE = 'variant-remove',
    VARIANT_SET = 'variant-set',
    CATEGORY_ADD = 'category-add',
    CATEGORY_REMOVE = 'category-remove',
    CATEGORY_SET = 'category-set',
    DETAILS_ADD = 'details-add',
    DETAILS_REMOVE = 'details-remove',
}
export interface IProductStore {
    id: string;
    payload: IGenericObject;
    action: ProductStoreAction;
}
export const productStore = writable<IProductStore>();

export const setProductStoreAction = (action: ProductStoreAction, id: string, payload: IGenericObject) => {
    productStore.set({ action, payload, id: id });
}

export const resetProductStoreAction = () => {
    productStore.set({ action: null, payload: null, id: null });
};
