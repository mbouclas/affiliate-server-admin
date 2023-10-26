<script lang="ts">
    import {PageStoreAction, setPageStoreAction} from "../../../page.store";
    import type {IPage} from "../../../shared/models/page";
    import {Button, Heading, Input} from "flowbite-svelte";
    import {setNotificationAction} from "../../../notifications-store";
    import {PageService} from "../../services/page.service";
    let model: IPage = {
        seo: {

        },
    } as IPage;
    async function save() {
        setPageStoreAction(PageStoreAction.ADD, model.id, model)
    }

    async function onsubmit() {
        if (model.title.length === 0) {return}

        const item = await new PageService().store(model);
        if (!item || !item.id) {
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
        setPageStoreAction(PageStoreAction.ADD, item.id, item);
    }
</script>
<Heading tag="h5">Add a title to continue</Heading>
<form on:submit|preventDefault={onsubmit}>
    <div class="mb-4">
        <label for="title" class="block mb-2">Title:</label>
        <Input id="title" bind:value={model.title} required class="w-full" />
    </div>

    <Button type="submit">Next</Button>
</form>
