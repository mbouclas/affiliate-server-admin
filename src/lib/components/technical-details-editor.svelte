<script lang="ts">
    import type {ITechnicalDetail} from "../../shared/models/product";
    import {Input, Label, Button} from "flowbite-svelte";

    export let model: ITechnicalDetail[] = [];
    export let productId: string;

    function addRow() {
        model = [...model, {title: "", value: ""}];
    }
</script>
<div class="flex flex-wrap items-center justify-end gap-2 my-4">
    <Button class="!p-2" on:click={addRow}>
        <svg class="w-5 h-5" width="512" height="512" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z"/>
        </svg>
    </Button>
</div>
<div class="grid grid-cols-2 gap-4">
    {#each model as item}
    <div class="mb-6">
        <Label for="title" class="mb-2">Title</Label>
        <Input type="text" id="title" placeholder="Title" bind:value={item.title} />
    </div>

    <div class="mb-6">
        <Label for="value" class="mb-2">Value</Label>
        <Input type="text" id="value" placeholder="Value" bind:value={item.value} />
    </div>
        {/each}
</div>
<div class="flex flex-wrap items-center justify-end gap-2 my-4">
    <Button class="!p-2" on:click={addRow}>
        <svg class="w-5 h-5" width="512" height="512" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z"/>
        </svg>
    </Button>
</div>
