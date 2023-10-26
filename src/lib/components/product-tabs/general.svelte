<script lang="ts">
    import {Heading, Input, Label, Hr} from 'flowbite-svelte';
    import type {IProduct, ISeoFields} from "../../../shared/models/product";
    import Tags from "../../../shared/Tag.svelte";
    import {createEventDispatcher, onMount} from "svelte";
    import MarkdownEditor from "../../../shared/MarkdownEditor.svelte";
    import {TagService} from "../../services/tag.service";
    import {tagsStore} from "../../../tags.store";
    import ProductCategorySelector from './product-category-tree.svelte';
    import type {IBaseImageModel, IEvent, IUploadImageResult} from "../../../shared/models/general";
    import Image from "../../../shared/image.svelte";
    import {productStore, ProductStoreAction} from "../../../product-store";
    import AffiliateUrlEditor from '../../affiliate-url-editor.svelte';
    import SeoFields from '../seo-fields.svelte';
    import TechnicalDetailsEditor from '../technical-details-editor.svelte';
    import {ProductService} from "../../services/product.service";

    const dispatch = createEventDispatcher();
    export let product: IProduct;

    let tagList = [],
        categoriesTree = [],
        saveOnAction = true;

    onMount(async () => {
        if (!product.seo) {
            product.seo = {} as ISeoFields;
        }

        await refreshTags();
    });

    productStore.subscribe(async (store) => {
        if (!store) {
            return;
        }

        if (store.action === ProductStoreAction.THUMB_SET) {
            product.thumb = store.payload as IBaseImageModel;
            return;
        }


    });

    tagsStore.subscribe(async (store) => {
        if (!store || store.action !== 'added') {
            return;
        }

        await refreshTags();
    });

    async function refreshTags() {
        const res = await (new TagService()).find();
        tagList = res.data;
    }

    $: {
        if (!Array.isArray(product.tags)) {
            product.tags = [];
        }
    }
    async function save() {
        dispatch('save', product);
    }

    async function onTagRemove(tags, tag) {
        product.tags = tags;

        if (!saveOnAction) {
            return
        }

        // go save
    }

    async function onTagAdd(tags, tag) {
        product.tags = tags;

        if (!saveOnAction) {
            return
        }
        // go save

        await new ProductService().update(product.id, {tags: product.tags});
    }

    function onMarkdownUpdate(field, value) {
        product[field] = value;
    }

    async function onCategorySelected(e: IEvent<any>) {
        // console.log(e.detail)
    }

    async function onUploadComplete(e: IEvent<IUploadImageResult>) {
        product.thumb = e.detail;
        await save();
    }
    async function onImageDetailsChanged(e: IEvent<IBaseImageModel>) {
        product.thumb = e.detail;
        await save();
    }

</script>


<form on:submit|preventDefault={save}>

    <div class="mb-6">
        <Label for="title" class="mb-2">Title</Label>
        <Input type="text" id="title" placeholder="Title" bind:value={product.title} />
    </div>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
    <div class="mb-6">
        <Label for="price" class="mb-2">Price</Label>
        <Input type="text" id="price" placeholder="Price" bind:value={product.price} />
    </div>
        <div class="mb-6">
            <Label for="sku" class="mb-2">SKU</Label>
            <Input type="text" id="sku" placeholder="SKU" bind:value={product.sku} />
        </div>
    </div>
    <div class="mb-6">
        <Label class="mb-2">About</Label>

    <MarkdownEditor model={product.about} id="details"  on:update={(e) => onMarkdownUpdate('about', e.detail)} />
    </div>
    <div class="mb-6">
        <Label class="mb-2">Description</Label>
        <MarkdownEditor model={product.description} id="about-md" on:update={(e) => onMarkdownUpdate('description', e.detail)} />
    </div>


    <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>

            <AffiliateUrlEditor bind:model={product.affiliateUrl} productId={product.id}
                                on:update={(e) => onMarkdownUpdate('affiliateUrl', e.detail)} />
        </div>
        <div>
            <Label  class="mb-2">Tags</Label>
            <Tags
                    bind:tags={product.tags}
                    autoComplete={tagList}
                    autoCompleteKey={"name"}
                    addKeys={[9, 13]}
                    allowBlur={true}
                    onlyUnique={true}
                    onTagRemove={(tags, tag) => onTagRemove(tags, tag)}
                    onTagAdd={(tags, tag) => onTagAdd(tags, tag)}
            />
        </div>
    </div>
    <div class="grid gap-6 mb-6 md:grid-cols-2">

        <div>
            <ProductCategorySelector bind:model={product.categories}  label="Categories" productId={product.id} saveOnSelect={true}
                                     on:selection={onCategorySelected}/>
        </div>
        <div>
            <Image
                    model={product.thumb || {}}
                    title="Product thumbnail"
                    maxNumberOfFiles={1}
                    module="Product"
                    itemId={product.id}
                    type="main"
                    on:imageDetailsChanged={onImageDetailsChanged}
                    on:allUploadsComplete={onUploadComplete}
            />
        </div>


    </div>

    <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div class="mb-6">
            <Label for="rating" class="mb-2">Rating</Label>
            <Input type="number" id="rating" placeholder="Rating" bind:value={product.rating} />
        </div>

        <div class="mb-6">
            <Label for="ratings" class="mb-2">Ratings</Label>
            <Input type="number" id="ratings" placeholder="Ratings" bind:value={product.ratings} />
        </div>
    </div>

    <div class="my-4">
        <Heading tag="h4">SEO</Heading>
        <Hr class="my-8" />

        <SeoFields bind:model="{product.seo}" />
    </div>

    <div class="my-4">
        <Heading tag="h4">Technical details</Heading>
        <Hr class="my-8" />
        <TechnicalDetailsEditor bind:model="{product.technicalDetails}" productId={product.id} />
    </div>
</form>
