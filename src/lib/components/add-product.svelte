<script lang="ts">
    import {Button, Modal, Label, Input, Heading} from 'flowbite-svelte'
    import {ProductService} from "../services/product.service";
    import {ProductStoreAction, setProductStoreAction} from "../../product-store";
    import {setNotificationAction} from "../../notifications-store";
    export let open = false;
    let model = {
        title: ''
    }

    async function onsubmit() {
        if (model.title.length === 0) {return}

        const product = await new ProductService().store(model);
        if (!product || !product.id) {
            setNotificationAction({
                message: 'Ooops, something went wrong. Please try again later.',
                type: 'error',
            });
            return;
        }
        setNotificationAction({
            message: 'Product added successfully',
            type: 'success',
        });
        setProductStoreAction(ProductStoreAction.ADD, product.id, product);
    }
</script>
<Modal id="add-product-modal" title="Add Product" {open} size="xl" autoclose={false}>
    <Heading tag="h5">Add a title to continue</Heading>
    <form on:submit|preventDefault={onsubmit}>
    <div class="mb-4">
        <label for="title" class="block mb-2">Title:</label>
        <Input id="title" bind:value={model.title} required class="w-full" />
    </div>

        <Button type="submit">Next</Button>
    </form>
</Modal>
