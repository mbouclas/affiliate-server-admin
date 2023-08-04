<script lang="ts">
    import type {IAffiliate} from "../services/product.service";
    import {ProductService} from "../services/product.service";
    import {createEventDispatcher, onMount} from "svelte";
    import {Label, Select} from "flowbite-svelte";

    const dispatch = createEventDispatcher();
    let affiliates: IAffiliate[] = [];
    export let model: string;

    onMount(async () => {
        affiliates = await (new ProductService()).getAffiliates();
    });

    function onChange(event: any) {
        dispatch('change', event.target.value)
    }

</script>

<Label class="mb-2">Affiliate</Label>
<Select bind:value={model} on:change={onChange}>
    {#each affiliates as affiliate}
        <option value={affiliate.slug}>{affiliate.name}</option>
    {/each}
</Select>
