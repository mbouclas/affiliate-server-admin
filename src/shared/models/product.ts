import type {IBaseImageModel} from "./general";

export interface ITagModel {
    name: string;
    slug: string;
    uuid?: string;
    model: string;
}

export interface IProduct {
    title: string;
    price: number;
    rating: number;
    ratings: number;
    variants?: (IProductVariant)[] | null;
    about?: string | null;
    description?: string | null;
    details?: any[] | null;
    images?: (string)[] | null;
    categories?: (IProductCategory)[] | null;
    affiliateUrl: string;
    slug: string;
    id: string;
    clientId: string;
    tags: ITagModel[];
    thumb?: IBaseImageModel;
    gallery?: IBaseImageModel[];
    affiliate?: string;
    seo?: ISeoFields;
    technicalDetails?: ITechnicalDetail[];
}
export interface IProductVariant {
    title: string;
    slug: string;
}
export interface IProductCategory {
    slug: string;
    title: string;
}


export interface ISeoFields {
    title: string;
    description: string;
    keywords: string;
    image?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogUrl?: string;
    ogType?: string;
    ogSiteName?: string;
    ogLocale?: string;
}

export interface ITechnicalDetail {
    title: string;
    value: string;
    slug: string;
}
