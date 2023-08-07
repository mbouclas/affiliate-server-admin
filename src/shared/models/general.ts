export interface IGenericObject<T = any> {
    [key: string]: T;
}

export interface IEvent<T> extends Event {
    detail: T;
}

export interface IPagination<T> {
    total:number;
    limit:number; // num of items to display
    skip?: number; // offset
    page?: number;
    pages?: number;
    data:T[];
}

export interface IBaseImageModel {
    id?: string;
    uuid?: string;
    url: string;
    caption?: string;
    alt?: string;
    title?: string;
}

export interface IUploadImageResult {
    url: string;
    id: string;
    metaData: IGenericObject;
}
