<script lang="ts">
    import {Label, Input, Button, Helper, Modal} from "flowbite-svelte";
import {createEventDispatcher, onMount} from "svelte";
import {ProductService} from "./services/product.service";
import type {IAffiliate} from "./services/product.service";
import type {IRepeatableJob} from "../shared/models/jobs";
import {formatDate} from "../helpers/dates";
    import AffiliateSelector from "./components/affiliate-selector.svelte";
    import type {IEvent} from "../shared/models/general";
    import {setNotificationAction} from "../notifications-store";
export let model: string;
let affiliate: string;
let disabled = false;
export let productId: string;
const dispatch = createEventDispatcher();
let repeatableJob: IRepeatableJob;
let modalOpen = false;

onMount(async () => {
    if (productId) {
        repeatableJob = await new ProductService().getRepeatableJob(productId);
        if (!repeatableJob || !repeatableJob.next) {
            repeatableJob = null;
        }
    }
    if (model && model.length > 0) {
        disabled = true;
    }

})
function toggleLock() {
    disabled = !disabled
    dispatch('lock', disabled)
}

async function cancelRepeatableJob() {
    const r = confirm('Are you sure you want to cancel this job?');
    if (!r) {
        return;
    }

    await new ProductService().cancelRepeatableJob(productId);

    setNotificationAction({
        message: 'Job deleted successfully',
        type: 'success',
    });
}

async function addRepeatableJob() {
    if (!affiliate){
        modalOpen = true;
        return;
    }

    const r = confirm('Are you sure you want to create a new Job?');
    if (!r) {
        return;
    }

    await new ProductService().addSingle(model, affiliate)

    setNotificationAction({
        message: 'Job added successfully',
        type: 'success',
    });
}

function onAffiliateSet(e: IEvent<string>) {
    addRepeatableJob();
    modalOpen = false;
}

</script>
<Modal id="select-affiliate" title="Select Affiliate" bind:open={modalOpen}  autoclose={false}>
    <AffiliateSelector bind:model={affiliate} on:change={onAffiliateSet} />
</Modal>
<div class="grid grid-cols-10 gap-4">
    <div class:col-span-9={!repeatableJob && !productId}
         class:col-span-8={repeatableJob || (productId && !repeatableJob)}
    >
        <Label for="price" class="mb-2">Affiliate Link</Label>
        <Input bind:value={model} {disabled} />
        {#if repeatableJob}
            <Helper class="text-sm mt-2">
                Next Run on: {formatDate(new Date(repeatableJob.next))}
            </Helper>

        {/if}
    </div>
    <div class="items-center justify-end  flex"
         class:col-span-1={!repeatableJob && !productId}
         class:pt-7={!repeatableJob}
         class:col-span-2={repeatableJob || (productId && !repeatableJob)}
    >
        <Button class={`!p-2`}
                type="button" title={disabled ? 'unlock' : 'lock'} on:click={toggleLock}
        color={disabled ? 'blue' : 'green'}>
            {#if disabled}

                <svg class="w-5 h-5" width="512" height="512" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2z"/>
                </svg>
            {:else}
                <svg class="w-5 h-5" width="512" height="512" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"/>
                </svg>
            {/if}
        </Button>
        {#if repeatableJob}
            <Button class="!p-2 ml-2" type="button" color="red" on:click={cancelRepeatableJob}>
                <svg class="w-5 h-5" width="512" height="512" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2ZM4 18a13.93 13.93 0 0 1 3.43-9.15l19.72 19.72A14 14 0 0 1 4 18Zm24.57 9.15L8.85 7.43a14 14 0 0 1 19.72 19.72Z" class="clr-i-outline clr-i-outline-path-1"/>
                    <path fill="none" d="M0 0h36v36H0z"/>
                </svg>
            </Button>
            {/if}

        {#if productId && !repeatableJob}
            <Button class="!p-2 ml-2" type="button" color="green" on:click={addRepeatableJob} title="Add a repeatable job">
                <svg class="w-5 h-5" width="512" height="512" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M28.5 32a3.476 3.476 0 0 1-2.475-1.025l-4.128-4.128a6.496 6.496 0 0 1-7.348-8.956l.588-1.34l4.156 4.156a1.023 1.023 0 0 0 1.413 0a.999.999 0 0 0 .001-1.414l-4.156-4.157l1.34-.588a6.497 6.497 0 0 1 8.956 7.349l4.128 4.128A3.5 3.5 0 0 1 28.5 32Zm-6.03-7.409l4.97 4.97a1.535 1.535 0 0 0 2.12 0a1.498 1.498 0 0 0 0-2.121l-4.969-4.97l.188-.583A4.496 4.496 0 0 0 20.5 16q-.126 0-.25.007l1.872 1.872a3 3 0 0 1 0 4.242a3.072 3.072 0 0 1-4.243 0l-1.872-1.872Q16 20.374 16 20.5a4.497 4.497 0 0 0 5.888 4.28Z"/>
                    <path fill="currentColor" d="M25 5h-3V4a2.006 2.006 0 0 0-2-2h-8a2.006 2.006 0 0 0-2 2v1H7a2.006 2.006 0 0 0-2 2v21a2.006 2.006 0 0 0 2 2h7v-2H7V7h3v3h12V7h3v5h2V7a2.006 2.006 0 0 0-2-2Zm-5 3h-8V4h8Z"/>
                </svg>

            </Button>
            {/if}
    </div>
</div>

