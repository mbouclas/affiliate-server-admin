<script lang="ts">
    import {onMount} from "svelte";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Button, Input } from 'flowbite-svelte';
    import {ImageService} from "../../services/image.service";
    import type {IBaseImageModel} from "../../../shared/models/general";
    import {Icon} from "flowbite-svelte-icons";
    import {formatDate} from "../../../helpers/dates.js";
    import {truncateString} from "../../../helpers/strings";
    let images = [],
    total = 0;
    export let onSelect: Function;

    onMount(async () => {
        await search()
    });

    async function search() {
        const res = await new ImageService().find()
        images = res.data.map(item => ({
            ...item,
            ...{src: item.url}
        }));
        total = res.total;
    }

    async function deleteImage(image: IBaseImageModel) {
        console.log(image)
    }

    function getBaseName(url: string) {
        return new URL(url).pathname.split("/").pop();
    }
</script>
<h3>{total} Images</h3>
<button on:click={search}>Reload</button>
{#if images.length > 0}
    <Table>
        <TableHead defaultRow={false}>
            <tr>
                <TableHeadCell colspan="5">
                    <Input type="search" placeholder="Filter"></Input>
                </TableHeadCell>
            </tr>
            <tr>
                <TableHeadCell></TableHeadCell>
                <TableHeadCell>File Name</TableHeadCell>
                <TableHeadCell>Usage</TableHeadCell>
                <TableHeadCell>Added At</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
            </tr>
        </TableHead>
        <TableBody class="divide-y">
            {#each images as item}
            <TableBodyRow>
                <TableBodyCell>
                    <a href={item.src} target="_blank">
                    <img src={item.src} class="object-contain w-24 h-24" />
                    </a>
                </TableBodyCell>
                <TableBodyCell>{truncateString(getBaseName(item.originalUrl || item.src), 50)}</TableBodyCell>
                <TableBodyCell>{item.usageCount}</TableBodyCell>
                <TableBodyCell>{formatDate(item.createdAt)}</TableBodyCell>
                <TableBodyCell class="flex gap-6">
                    {#if onSelect}
                        <Button on:click={onSelect.bind(this, item)}>
                            <Icon name="arrow-right-outline" />
                        </Button>
                        {/if}
                    <Button color="red" on:click={deleteImage.bind(this, item)}>
                        <Icon name="trash-bin-outline" />
                    </Button>
                </TableBodyCell>
            </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
{/if}
