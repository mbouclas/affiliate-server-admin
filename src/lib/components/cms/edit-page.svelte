<script lang="ts">
import type {IPage} from "../../../shared/models/page";
import {Button, Modal, TabItem, Tabs} from "flowbite-svelte";
import General from './page-tabs/general.svelte';
import Gallery from './page-tabs/gallery.svelte';
import {pageStore, PageStoreAction, resetPageStoreAction, setPageStoreAction} from "../../../page.store";
import {PageService} from "../../services/page.service";
import {onDestroy, onMount} from "svelte";
import {setNotificationAction} from "../../../notifications-store";
export let model: IPage;
let item: IPage;

onMount(async () => {
    await get();
});

onDestroy(() => {
    resetPageStoreAction();
});


async function get() {
    const res = await new PageService().find({id: model.id});
    item = res.data[0];
    if (!Array.isArray(model.tags)) {
        model.tags = [];
    }

    if (!Array.isArray(model.categories)) {
        model.categories = [];
    }
}


async function save() {

    console.log('lets save')
    await new PageService().update(item.id, item);

    setNotificationAction({
        message: 'Saved successfully',
        type: 'success',
    });

    setPageStoreAction(PageStoreAction.UPDATE, item.id, item);

}

async function handleKeydown(e) {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        await save();
    }
}


</script>

<svelte:window on:keydown={handleKeydown}/>
{#if item}
<Modal id="edit-item-modal" title="Edit Item" bind:open={model} size="xl" autoclose={false}>
    <div slot="header">{item.title}</div>
    {#if item}
        <Tabs style="underline" divider={false}>
            <TabItem open  title="General">
                <General bind:model={item} on:save={save} />
            </TabItem>
            <TabItem title="Gallery">
                <Gallery bind:model={item.image}  itemId={item.id} on:save={save} />
            </TabItem>
            <TabItem title="Related">
                <Gallery bind:model={item.related}  itemId={item.id} on:save={save} />
            </TabItem>
        </Tabs>
    {/if}

    <svelte:fragment slot='footer'>
        <Button on:click={save}>Save</Button>
        <Button color="alternative" on:click={() => item = null}>Close</Button>
    </svelte:fragment>
</Modal>

    {/if}
