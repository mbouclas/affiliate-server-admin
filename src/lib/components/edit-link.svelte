<script lang="ts">
    import { Button, Modal,  Tabs, TabItem } from 'flowbite-svelte'
    import General from './product-tabs/general.svelte';
    import Gallery from './product-tabs/gallery.svelte';
    import Related from './product-tabs/related.svelte';
    import {createEventDispatcher} from "svelte";
    import type {IProduct} from "../../shared/models/product";
    import {ProductService} from "../services/product.service";
    import {setNotificationAction} from "../../notifications-store";
    const dispatch = createEventDispatcher();
    export let id = 'modal';
    export let product: IProduct = null;
    export let size = 'xl';
    export let closeOnSave = false;

    if (product && !product.seo) {
        product.seo = {
            title: '',
            description: '',
            keywords: '',
        }
    }

    async function save() {


        await (new ProductService()).update(product.id, product);

        setNotificationAction({
            message: 'Saved successfully',
            type: 'success',
        });

        dispatch('update', product);

        if (closeOnSave) {
            product = null;
        }

    }

</script>
{#if product}
<Modal {id} title={product.title || 'Edit Product'} bind:open={product} {size} autoclose={false}>
    <Tabs style="underline" divider={false}>
        <TabItem open  title="General">
            <General {product} on:save={save} />
        </TabItem>
        <TabItem  title="Gallery">
            <Gallery model={product.images} itemId={product.id} on:save={save} />
        </TabItem>
        <TabItem title="Related">
            <Related {product} on:save={save} />
        </TabItem>

    </Tabs>
    <svelte:fragment slot='footer'>
        <Button on:click={save}>Save</Button>
        <Button color="alternative">Close</Button>
    </svelte:fragment>
</Modal>
    {/if}
