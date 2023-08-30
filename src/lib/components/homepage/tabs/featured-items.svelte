<script lang="ts">
    import type {IEvent} from "../../../../shared/models/general";
    import type {IProduct} from "../../../../shared/models/product";
    import ProductSelector from "../../search/product-selector.svelte";
    import {moneyFormat, truncateString} from "../../../../helpers/strings";
    import {formatDate} from "../../../../helpers/dates";
    import {Badge, Modal, Button} from "flowbite-svelte";
    import {setNotificationAction} from "../../../../notifications-store";
    import {HomepageService} from "../../../services/homepage.service";

    let selectedItems: IProduct[] = [],
        searchModalOpen = false;

    async function removeItem(item) {

        const foundIdx = selectedItems.findIndex(i => i.id === item.id);
        selectedItems.splice(foundIdx, 1);
        selectedItems = [...selectedItems];// update reactivity

        await save();
    }

    async function onSelection(e: IEvent<IProduct>[]) {
        // the timeout is to avoid the race between the bound model and the emitted event
        setTimeout(async () => {
            await save();
        })
    }

    async function save() {
        await new HomepageService().saveFeaturedItems(selectedItems)
        setNotificationAction({
            type: 'success',
            message: 'Products saved'
        });
    }

</script>

<Button on:click={() => searchModalOpen = !searchModalOpen}>Add products</Button>

<div class="overflow-x-auto mt-4" >
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <div class="flex items-center gap-x-3">
                    <input
                            type="checkbox"
                            class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                    />

                </div>
            </th>
            <th scope="col" class="px-4 py-4">Product name</th>
            <th scope="col" class="px-4 py-3">Price</th>
            <th scope="col" class="px-4 py-3">Status</th>
            <th scope="col" class="px-4 py-3">Last Update</th>
            <th scope="col" class="px-4 py-3"></th>
        </tr>
        </thead>
        <tbody>
        {#each selectedItems as item}
            <tr class="border-b dark:border-gray-700">
                <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div class="inline-flex items-center gap-x-3">

                        {#if item.thumb}
                            <a href="#" on:click|preventDefault={() => toAdd = item} class="h-24 w-24">
                                <img class=" object-contain w-24 h-24" src={item.thumb.url} />
                            </a>
                        {/if}
                    </div>
                </td>
                <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white" title={item.title}>
                    <a href="#" on:click|preventDefault={() => toAdd = item}>{truncateString(item.title)}</a>
                </td>
                <td class="px-4 py-3">{moneyFormat(item.price)}</td>

                <td class="px-4 py-3">
                    <Badge color={item.active ? 'green' : 'red'}>{item.active ? 'Active' : 'Inactive'}</Badge>
                </td>
                <td class="px-4 py-3">{formatDate(item.updatedAt)}</td>
                <td class="px-4 py-3">
                    <Button on:click={removeItem.bind(this, item)}>Remove</Button>
                </td>
            </tr>
        {/each}
        </tbody>

    </table>
</div>

<Modal id="quickSearchModal" title="Find Products" bind:open={searchModalOpen} size="xl" autoclose={false}>

    <ProductSelector allowMultiple={true} bind:model={selectedItems} on:selection={onSelection} />
</Modal>

