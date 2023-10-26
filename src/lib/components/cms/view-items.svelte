<script lang="ts">
    import {
        Button,
        Heading,
        Input, Modal,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell
    } from 'flowbite-svelte';
    import {onMount} from "svelte";
    import {pageStore, PageStoreAction, setPageStoreAction} from "../../../page.store";
    import {PageService} from "../../services/page.service";
    import {setNotificationAction} from "../../../notifications-store";
    import {Icon} from "flowbite-svelte-icons";
    import {truncateString} from "../../../helpers/strings";
    import type {IPage} from "../../../shared/models/page";
    import {formatDate} from "../../../helpers/dates";
    import AddPage from "./add-page.svelte";
    import EditPage from "./edit-page.svelte";

    const defaultFilters = {
        limit: 40,
        page: 1,
        orderBy: 'updatedAt',
        way: 'desc'
    };

    let items = [],
        loading = false,
        showAddPageModal = false,
        filters: typeof defaultFilters,
        appliedFilters = [],
        selectedItem: IPage = null,
        newItems = [],
        res = {
            data: []
        };
    reset();

    onMount(async () => {

    });


    pageStore.subscribe(async (state) => {
        if (!state) {return;}

        if (state.action === PageStoreAction.ADD) {
            await reset();
            selectedItem = state.payload
            showAddPageModal = false;
            return;
        }

        if (state.action === PageStoreAction.UPDATE) {
            await reset();
            return;
        }

        if (state.action === PageStoreAction.DELETE) {
            await reset();
            return;
        }
    });

    async function search() {
        res.data = [];

        loading = true;
        res = await (new PageService()).find(filters);

        loading = false;

        items = res.data
    }

    async function reset() {
        filters = Object.assign({}, defaultFilters);
        await search();
    }

    async function setFilter(name: string, value: any) {
        filters.page = 1;
        filters[name] = value;
        appliedFilters = [...appliedFilters, {name, value}]
        await search();
    }


    async function changeOrderBy(order: string, way: string) {

        if (filters.orderBy === order) {
            filters.way = filters.way === 'asc' ? 'desc' : 'asc';
        }

        filters.orderBy = order;

        await search();
    }

    async function toggleStatus(id: string) {
        const foundIndex = items.findIndex(i => i.id === id);

        items[foundIndex].active = !items[foundIndex].active;

        setNotificationAction({
            message: 'Saved successfully',
            type: 'success',
        });

        await (new PageService()).update(items[foundIndex].id, {
            active: items[foundIndex].active
        });


    }

    async function handlePageChange(e) {
        filters.page = e.detail;
        await search();
    }

    async function onReset() {
        await reset();
    }

    function editItem(item: IPage) {
        selectedItem = item;
    }

    async function deleteItem(item: IPage) {

    }

    async function triggerSave() {
        console.log('****')
        setPageStoreAction(PageStoreAction.TRIGGER_SAVE, selectedItem.id, selectedItem);
        setPageStoreAction(null, null, null);
    }
</script>

<Modal id="add-item-modal" title="Add Item" bind:open={showAddPageModal} size="xl" autoclose={false}>
<AddPage />
</Modal>
{#if selectedItem}
    <EditPage bind:model={selectedItem} />
{/if}


<div class="my-4">
    <Heading tag="h3">{res.total || 0} Items</Heading>
</div>

<Table>
    <TableHead defaultRow={false}>
        <tr>
            <TableHeadCell colspan="5">
                <Input type="search" placeholder="Filter"></Input>
            </TableHeadCell>
            <TableHeadCell colspan="1">
                <Button title="Add new item" on:click={() => showAddPageModal = true}>
                    <Icon name="plus-outline"></Icon>
                </Button>
            </TableHeadCell>
        </tr>
        <tr>
            <TableHeadCell></TableHeadCell>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Categories</TableHeadCell>
            <TableHeadCell>Active</TableHeadCell>
            <TableHeadCell>Added At</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
        </tr>
    </TableHead>
    <TableBody class="divide-y">
    {#each items as item}
        <TableBodyRow>
            <TableBodyCell>
                {#if item.thumb}
                <a href={item.thumb.url} target="_blank">
                    <img src={item.thumb.url} class="object-contain w-24 h-24" />
                </a>
                    {:else}
                    <Button><Icon name="upload-outline" /></Button>
                    {/if}
            </TableBodyCell>
            <TableBodyCell>
                <a href="#" on:click|preventDefault={editItem.bind(this, item)}>{truncateString(item.title)}</a>
            </TableBodyCell>
            <TableBodyCell>
                {#if Array.isArray(item.categories)}
                    {#each item.categories as category}
                            <span class="inline-flex mr-2  items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {category.title}
                            </span>
                    {/each}
                {/if}
            </TableBodyCell>
            <TableBodyCell>
                <button title="Toggle Status" on:click={toggleStatus.bind(this, item.id)}
                        type="button"
                        class="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
                >
                    {#if !item.active}
                        <svg class="text-red-500"
                             xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M17 7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h10c2.76 0 5-2.24 5-5s-2.24-5-5-5zM7 15c-1.66 0-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3s-1.34 3-3 3z"/></svg>
                    {:else}
                        <svg class="text-green-500"
                             xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M17 7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h10c2.76 0 5-2.24 5-5s-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3s-1.34 3-3 3z"/></svg>
                    {/if}
                </button>
            </TableBodyCell>
            <TableBodyCell>{formatDate(item.createdAt)}</TableBodyCell>
            <TableBodyCell class="flex gap-6">
                <Button color="red" on:click={deleteItem.bind(this, item)}>
                    <Icon name="trash-bin-outline" />
                </Button>
            </TableBodyCell>
        </TableBodyRow>
    {/each}
    </TableBody>
</Table>
