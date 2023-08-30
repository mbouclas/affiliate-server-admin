import type {IBaseImageModel} from "./general";

export interface IHeroItem {
    title: string;
    subtitle: string;
    caption: string;
    image: IBaseImageModel;
    slug: string;
}
