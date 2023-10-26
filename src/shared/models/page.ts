import type {IBaseImageModel} from "./general";
import type {IProductCategory, IProductVariant, ISeoFields, ITagModel} from "./product";

export interface IPage {
    title: string;
    price: number;
    rating: number;
    ratings: number;
    excerpt?: string | null;
    description?: string | null;
    images?: (string)[] | null;
    categories?: (IProductCategory)[] | null;
    slug: string;
    id: string;
    clientId: string;
    tags: ITagModel[];
    thumb?: IBaseImageModel;
    gallery?: IBaseImageModel[];
    seo?: ISeoFields;
}
