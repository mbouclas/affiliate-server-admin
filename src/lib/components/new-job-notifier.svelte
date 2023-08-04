<script lang="ts">

    import {scraperStore, setRefreshProductListAction, triggerGetFailedJobsAction} from "../../scraper-store";
import {truncateString} from "../../helpers/strings";
import Loading from '../../shared/Loading.svelte';
import type {INewProductJob} from "../services/product.service";
import {ProductService} from "../services/product.service";
let newItems: INewProductJob[] = [],
    itemsBeingProcessed: number[] = [];
scraperStore.subscribe(async state => {
    newItems = state.filter(item => item);
    for (let idx = 0; idx < newItems.length; idx++) {
        await monitor(newItems[idx], idx);
    }
});

async function monitor(item: INewProductJob, idx: number) {
/*
    if (!itemsBeingProcessed[idx]) {
        return;
    }
*/

    itemsBeingProcessed.push(idx);
    const res = await new ProductService().checkScraperStatus(item.jobId);
    if (res.error) {
        console.log(res.error);
        itemsBeingProcessed.splice(itemsBeingProcessed.indexOf(idx), 1);
        scraperStore.update(state => {
            state.splice(state.indexOf(item), 1);
            return state;
        });
        triggerGetFailedJobsAction()
        return;
    }

    if (res.status === 'completed') {
        itemsBeingProcessed.splice(itemsBeingProcessed.indexOf(idx), 1);
        scraperStore.update(state => {
            state.splice(state.indexOf(item), 1);
            return state;
        });

        setRefreshProductListAction(true);
        return;
    }

    if (res.status === 'active') {
        console.log(`Setting timer form ${item.url}`)
        setTimeout(async () => await monitor(item, idx), 1000);
    }
}
</script>
{#if newItems.length > 0}
<div class="fixed right-2 bg-gray-700 p-2  bottom-2 z-50 max-h-[300px] overflow-y-auto">
{#each newItems as item, idx}
<div class="flex items-center shadow-2xl w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-900" role="alert">
    <Loading color="green" />
    <div class="ml-3 text-sm font-normal">{truncateString(item.url)} is been processed.</div>
    <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
</div>

{/each}
</div>
    {/if}
