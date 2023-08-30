<script lang="ts">
    import {createEventDispatcher, onMount} from "svelte";
    import {ProductCategoryService} from "../../services/productCategory.service";
    import { Select, MultiSelect, Badge } from 'flowbite-svelte';
    import Loading from "../../../shared/Loading.svelte";

    import {flattenTree} from "../../../helpers/data";
    import {ProductService} from "../../services/product.service";
    const dispatch = createEventDispatcher();

    let items = [],
        loading = false,
    selected = [];
    export let model = [];
    export let label = 'Categories';
    export let saveOnSelect = false;
    export let productId;



    onMount(async () => {
        loading = true;
        const res = await new ProductCategoryService().find();
        items = flattenTree(res).map(i => ({...i, ...{
                name: `${Array(i.level).fill('-').join('')} ${i.title}`, value: i.id
            }}));
        loading = false;
        selected = model.map(m => {
            if (typeof m === 'string') {
                return m;
            }

            return m.id
        });
    });

    async function onCategorySelection(e) {
        const found = [];
        e.detail.forEach(s => {

            const f = items.find(i => i.id === s.id);
            if (f) {
                found.push({
                    id: f.id,
                    title: f.title,
                    slug: f.slug,
                    parentId: f.parentId,
                });
            }
        });

        model = found;

        dispatch('selection', model);
        if (!saveOnSelect) {
            return;
        }

        await new ProductService().update(productId, {categories: model});
    }



</script>

<div
        class="w-full h-[400px] overflow-y-auto bg-white dark:bg-gray-800 dark:border-gray-700"
>
    {#if loading}
        <Loading />
    {:else}
        <div class="pt-4 items-center text-center mb-4">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{label} ( {selected.length} selected )</h5>
        </div>

        <MultiSelect items={items} bind:value={selected} size='lg' let:clear let:item
        on:selected={onCategorySelection}>
            <Badge color="green" dismissable params={{ duration: 100 }} on:dismiss={clear}>
                {item.title}
            </Badge>
        </MultiSelect>
    {/if}
</div>
