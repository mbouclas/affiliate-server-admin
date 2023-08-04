import {writable} from "svelte/store";
import {TagService} from "./lib/services/tag.service";

export interface ITagActions {
    name: string;
    action: 'add' | 'added' | 'remove' | 'removed' | 'updateList';
}

export const tagsStore = writable<ITagActions>();

tagsStore.subscribe(async (val) => {
    if (!val) {return;}

    if (['added', 'removed', 'remove'].indexOf(val.action) !== -1) {
        return;
    }

    // write the new tag on the server
    if (val.action === 'add') {
        await new TagService().add(val.name);
        setTagsStoreAction({name: val.name, action: 'added'});
    }

});

export function setTagsStoreAction(data: ITagActions) {
    tagsStore.set(data);
}
