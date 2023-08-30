<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import QuickSearch from "../search/quick-search.svelte";
    import {moneyFormat, truncateString} from "../../../helpers/strings";
    import {formatDate} from "../../../helpers/dates";
    import {Badge, Checkbox, Modal, Button} from "flowbite-svelte";
    import type {IEvent} from "../../../shared/models/general";
    import type {IProduct} from "../../../shared/models/product";
    const dispatch = createEventDispatcher();
    import { Icon } from 'flowbite-svelte-icons';

    export let allowMultiple = false;
    export let model: IProduct[] = [];
    export let onClickItem: (item: IProduct) => void;

    let items = [],
    selection = [];

    function updateResults(e: IEvent<IProduct[]>) {
        items = e.detail;

    }

    async function onReset() {
        items = [];
    }

    function onCheckboxChange(item) {
        const idx = selection.findIndex(i => i.id === item.id);
        if (idx === -1) {
            selection.push(item);
        } else {
            selection.splice(idx, 1);
        }

        dispatch('selection', selection)
        model = selection
    }

    function onSelection(item) {
        model = [item];
        dispatch('selection', model[0])
    }

    function onItemClick(item: IProduct) {
        if (onClickItem) {
            onClickItem(item);
        }
    }

</script>

<QuickSearch on:complete={updateResults} on:reset={onReset} loadOnStartup={true} />


{#if items.length > 0}
    <div class="overflow-x-auto mt-4">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <div class="flex items-center gap-x-3">
                        {#if allowMultiple}
                        <input
                                type="checkbox"
                                class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                        />
                            {/if}
                    </div>
                </th>
                <th scope="col" class="px-4 py-4">Product name</th>
                <th scope="col" class="px-4 py-3">Price</th>
                <th scope="col" class="px-4 py-3">Status</th>
                <th scope="col" class="px-4 py-3">Last Update</th>
            </tr>
            </thead>
            <tbody>
            {#each items as item}
                <tr class="border-b dark:border-gray-700">
                    <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div class="inline-flex items-center gap-x-3">
                            {#if allowMultiple}
                            <Checkbox
                                    value={item}
                                    on:change={onCheckboxChange.bind(this, item)}
                            />
                                {:else}
                                <slot name="button"></slot>
                                {#if !$$slots.button}
                                <Button on:click={onSelection.bind(this, item)}>
                                    <Icon name="plus-solid" class="w-3.5 h-3.5 mr-2" />
                                </Button>
                                    {/if}
                                {/if}
                            {#if item.thumb}
                                <a href="#" on:click|preventDefault={onItemClick.bind(this, item)} class="h-24 w-24">
                                    <img class=" object-contain w-24 h-24" src={item.thumb.url} />
                                </a>
                            {/if}
                        </div>
                    </td>
                    <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white" title={item.title}>
                        <a href="#" on:click|preventDefault={onItemClick.bind(this, item)}>{truncateString(item.title)}</a>
                    </td>
                    <td class="px-4 py-3">{moneyFormat(item.price)}</td>

                    <td class="px-4 py-3">
                        <Badge color={item.active ? 'green' : 'red'}>{item.active ? 'Active' : 'Inactive'}</Badge>
                    </td>
                    <td class="px-4 py-3">{formatDate(item.updatedAt)}</td>
                </tr>
            {/each}
            </tbody>

        </table>
    </div>
{/if}
