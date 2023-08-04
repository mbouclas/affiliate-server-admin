import type {IGenericObject} from "../shared/models/general";

export function flattenTree(array: any[], level = 0) {
    let result: IGenericObject[] = [];

    array.forEach(function (a) {
        a.level = level;
        result.push(a);
        if (Array.isArray(a.children)) {
            result = result.concat(flattenTree(a.children, level + 1));
        }
    });
    return result;
}
