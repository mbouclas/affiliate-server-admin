import type {IGenericObject} from "./shared/models/general";
import {writable} from "svelte/store";

export enum PageStoreAction {
    ADD = 'add',
    UPDATE = 'update',
    SAVE = 'save',
    TRIGGER_SAVE = 'trigger-save',
    DELETE = 'delete',
    THUMB_SET = 'thumb-set',
    GALLERY_ADD = 'gallery-add',
    GALLERY_REMOVE = 'gallery-remove',
    GALLERY_SET = 'gallery-set',
    TAG_ADD = 'tag-add',
    TAG_REMOVE = 'tag-remove',
    TAG_SET = 'tag-set',
    CATEGORY_ADD = 'category-add',
    CATEGORY_REMOVE = 'category-remove',
    CATEGORY_SET = 'category-set',
    DETAILS_ADD = 'details-add',
    DETAILS_REMOVE = 'details-remove',
}

export interface IPageStore {
    id: string;
    payload: IGenericObject;
    action: PageStoreAction;
}

export const pageStore = writable<IPageStore>({action: null, payload: null, id: null});

export const setPageStoreAction = (action: PageStoreAction, id: string, payload: IGenericObject) => {
    pageStore.set({ action, payload, id: id });
}

export const resetPageStoreAction = () => {
    pageStore.set({ action: null, payload: null, id: null });
};
