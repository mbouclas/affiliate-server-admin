<script lang="ts">
    import type {IGenericObject} from "../../shared/models/general";
    import {Input, Textarea} from "flowbite-svelte";
    import type {ISeoFields} from "../../shared/models/product";

    export let model: ISeoFields;

    if (!model) {
        model = {} as ISeoFields;
    }
</script>

<div class="mb-4">
    <label for="title" class="block mb-2">Title:</label>
    <Input id="title" bind:value={model.title} class="w-full" />
</div>
<div class="mb-4">
    <label for="title" class="block mb-2">Title:</label>
    <Textarea id="title" bind:value={model.description} class="w-full"></Textarea>
</div>
