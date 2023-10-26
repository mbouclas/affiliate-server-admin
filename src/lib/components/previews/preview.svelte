<script lang="ts">
    import {Button, Dropdown, DropdownItem, Spinner } from "flowbite-svelte";
    import {PreviewService} from "../../services/preview.service";
    import {setNotificationAction} from "../../../notifications-store";
    import {Icon} from "flowbite-svelte-icons";

    export let module: string = null;
    export let itemId: string = null;
    export let mode: 'preview' | 'refresh' = 'preview';
    let loading = false;

    async function getPreviewUrl() {
        const res = await new PreviewService().generatePreviewUrl(module, itemId);
        window.open(res.url, '_blank');
    }

    async function previewWithRefresh() {
        await dumpData();
        await getPreviewUrl();
    }

    async function dumpData() {
        loading = true;
        const data = await new PreviewService().dumpData();

        loading = false;

        setNotificationAction({
            message: 'Data refreshed successfully',
            type: 'success'
        })
    }

</script>
{#if mode === 'refresh'}
    <Button on:click={dumpData} color={mode === 'preview' ? 'alternative' : 'default'}>
        {#if loading}
            <div class="text-white">
            <Spinner class="mr-3" size="4" />Loading ...
            </div>
            {:else}
            <svg class="w-3 h-63 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
            </svg>
            {/if}
    </Button>
{:else}
    <Button id="previewButton">
        {#if loading}
            <Spinner class="mr-3" size="4" />Loading ...
        {:else}
            Preview
        {/if}
    </Button>
    <Dropdown triggeredBy="#previewButton">
        <DropdownItem on:click={getPreviewUrl}>Preview</DropdownItem>
        <DropdownItem on:click={previewWithRefresh}>Preview with refresh</DropdownItem>
    </Dropdown>
{/if}
