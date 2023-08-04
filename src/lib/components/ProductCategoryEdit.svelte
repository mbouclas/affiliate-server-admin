<script lang="ts">
    import {Heading, Hr, Input, Label, Textarea} from 'flowbite-svelte';
    import {createEventDispatcher, onMount} from "svelte";
    import { ProductCategoryService} from "../services/productCategory.service";
    import type { IBaseCategoryModel } from "../services/productCategory.service";
    import Image from '../../shared/image.svelte'
    import Loading from '../../shared/Loading.svelte'
    import type {IBaseImageModel, IEvent, IUploadImageResult} from "../../shared/models/general";
    import SeoFields from './seo-fields.svelte';

    const dispatch = createEventDispatcher();
    const service = new ProductCategoryService();
    export let id: string|undefined;
    export let parentCategory: IBaseCategoryModel|undefined;
    let category: IBaseCategoryModel;
    let parentCategoryName = 'Root';

    onMount(async () => {

        if (id) {
            category = await service.findOne(id);
        } else {
            category = {
                parentId: parentCategory ? parentCategory.id : null,
            } as IBaseCategoryModel;
        }

        if (!category.metaData) {
            category.metaData = {}
        }

        if (!category.metaData.seo) {
            category.metaData.seo = {}
        }

        if (!category.thumb) {
            category.thumb = {} as IBaseImageModel;
        }

    });

    async function onUploadComplete(e: IEvent<IUploadImageResult>) {
        category.thumb = {...category.thumb, ...{
            url: e.detail.url,
                cloudinaryUrl: e.detail.id
            }};

        if (!category.id) {
            return;
        }

        await (new ProductCategoryService()).update(category.id, {thumb: category.thumb} as IBaseCategoryModel);
    }

    async function onImageDetailsChanged(e: IEvent<IBaseImageModel>) {
        category.thumb = e.detail;
        if (!category.id) {
            return;
        }

        await (new ProductCategoryService()).update(category.id, {thumb: category.thumb} as IBaseCategoryModel);
    }

    $: {
        dispatch('change', category);
    }
</script>

{#if !category}
    <Loading />
    {:else }
<div class="p-4">
    <h2 class="flowbite-modal-title mb-4 text-xl font-bold">Update Category</h2>
    <p class="mb-4"><span>Parent Category: </span><span class="font-semibold">{parentCategoryName}</span></p>

    <div class="mb-4">
        <label for="title" class="block mb-2">Title:</label>
        <Input id="title" bind:value={category.title} required class="w-full" />
    </div>

    <div class="mb-4">
        <label for="description" class="block mb-2">Description:</label>
        <Textarea id="description" bind:value={category.description} class="w-full"></Textarea>
    </div>

    <div class="mb-4">
        <Image
                model={category?.thumb || ''}
                title="Category thumbnail"
                maxNumberOfFiles={1}
                module="ProductCategory"
                itemId={category.id}
                type="main"
                on:imageDetailsChanged={onImageDetailsChanged}
                on:allUploadsComplete={onUploadComplete}
        />
    </div>

    <Heading tag="h4">SEO</Heading>
    <Hr class="my-8" />
    <SeoFields bind:model="{category.metaData.seo}" />

</div>
    {/if}
