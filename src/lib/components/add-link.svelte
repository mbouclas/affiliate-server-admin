<script lang="ts">
    import { Button, Modal, Textarea, Label, Select } from 'flowbite-svelte'
    import {createEventDispatcher} from "svelte";
    import AffiliateSelector from './affiliate-selector.svelte';
    import { ProductService} from "../services/product.service";
    import {
        setScraperStoreAction,
        triggerGetActiveJobsAction,
        triggerGetRepeatableJobsAction
    } from "../../scraper-store";
    import {setNotificationAction} from "../../notifications-store";
    const dispatch = createEventDispatcher();

    export let id = 'modal';
    export let open = false;
    export let size = 'xl';
    export let affiliate = 'amazon';
    let links = '';



    async function save() {
        const urls = links.split('\n').map((url: string) => url.trim());

        const jobs = await (new ProductService()).addMultiple([...new Set(urls)], affiliate);


        setScraperStoreAction(jobs);
        triggerGetActiveJobsAction();
        triggerGetRepeatableJobsAction();

        // res is an array of jobs
        dispatch('productsAdded', jobs);

        setNotificationAction({
            message: 'Added successfully',
            type: 'success',
        });

        open = false;
    }
</script>
<Modal {id} title="Add Products" bind:open={open} {size} autoclose={false}>
    <form on:submit|preventDefault={save}>
        <div class="my-4">
            <AffiliateSelector bind:model={affiliate} />
        </div>
        <div class="my-4">
            <Label class="mb-2">Add Links</Label>
            <Textarea id="textarea-id" bind:value={links} placeholder="Add some links here" rows="4" name="links"/>
        </div>
    </form>

    <svelte:fragment slot='footer'>
        <Button on:click={save}>Save</Button>
        <Button color="alternative">Decline</Button>
    </svelte:fragment>
</Modal>
