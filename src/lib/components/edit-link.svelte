<script lang="ts">
    import { Button, Modal,  Tabs, TabItem } from 'flowbite-svelte'
    import General from './product-tabs/general.svelte';
    import Gallery from './product-tabs/gallery.svelte';
    import Related from './product-tabs/related.svelte';
    import {createEventDispatcher, onMount} from "svelte";
    import type {IProduct} from "../../shared/models/product";
    import {ProductService} from "../services/product.service";
    import {setNotificationAction} from "../../notifications-store";
    import Preview from "./previews/preview.svelte";
    const dispatch = createEventDispatcher();
    export let id = 'modal';
    export let product: IProduct = null;
    export let size = 'xl';
    export let closeOnSave = false;
    let showModal = false,
    isCalled = false;
    let item: IProduct = null;

    $: {
        if (product) {
            // need the timeout to wait for the modal to open otherwise the close button does not bind to the showModal variable
            setTimeout(async () => {
                // when called from the main component this triggers twice
                if (isCalled) return;

                isCalled = true;
                await get();
            })
        }



    }

    async function get() {
        const res = await (new ProductService()).find({id: product.id});
        item = res.data[0];

        if (item && !item.seo) {
            item.seo = {
                title: '',
                description: '',
                keywords: '',
            }
        }
        showModal = true;
    }

    async function save() {
        await (new ProductService()).update(item.id, item);

        setNotificationAction({
            message: 'Saved successfully',
            type: 'success',
        });

        dispatch('update', item);

        if (closeOnSave) {
            product = null;
        }

    }

    function onModalClosed() {
        product = null;
        isCalled = false;
        dispatch('closed')
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

<Modal {id} title={item.title || 'Edit Product'} bind:open={showModal} {size} autoclose={false} on:hide={onModalClosed}
       on:open={() => showModal = false}>
    <Preview module="Product" itemId={item.id} />
    <Tabs style="underline" divider={false}>
        <TabItem open  title="General">
            <General bind:product={item} on:save={save} />
        </TabItem>
        <TabItem  title="Gallery">
            <Gallery model={item.images} itemId={item.id} on:save={save} />
        </TabItem>
        <TabItem title="Related">
            <Related bind:product={item} on:save={save} />
        </TabItem>

    </Tabs>
    <svelte:fragment slot='footer'>
        <Button on:click={save}>Save</Button>
        <Button color="alternative">Close</Button>
    </svelte:fragment>
</Modal>
    {/if}
