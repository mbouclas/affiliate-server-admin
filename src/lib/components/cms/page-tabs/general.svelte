<script lang="ts">
    import type {IPage} from "../../../../shared/models/page";
    import {Heading, Hr, Input, Label} from "flowbite-svelte";
    import MarkdownEditor from "../../../../shared/MarkdownEditor.svelte";
    import Tags from "../../../../shared/Tag.svelte";
    import {PageService} from "../../../services/page.service";
    import {onMount} from "svelte";
    import {tagsStore} from "../../../../tags.store";
    import {TagService} from "../../../services/tag.service";
    import type {IEvent, IUploadImageResult} from "../../../../shared/models/general";
    import Image from "../../../../shared/image.svelte";
    import type {IBaseImageModel} from "../../../../shared/models/general";
    import SeoFields from "../../seo-fields.svelte";
    import PageCategorySelector from '../page-category-selector.svelte';

    export let model: IPage;
    let tagList = [],
        categoriesTree = [],
        saveOnAction = true;

    onMount(async () => {
        await refreshTags();
    })

    async function save() {

    }

    function onMarkdownUpdate(field, value) {
        model[field] = value;
    }

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

    async function onTagRemove(tags, tag) {
        model.tags = tags;

        if (!saveOnAction) {
            return
        }

        // go save
    }

    async function onTagAdd(tags, tag) {
        model.tags = tags;

        if (!saveOnAction) {
            return
        }
        // go save

        await new PageService().update(model.id, {tags: model.tags});
    }

    async function onUploadComplete(e: IEvent<IUploadImageResult>) {
        model.thumb = e.detail;
        await save();
    }

    async function onImageDetailsChanged(e: IEvent<IBaseImageModel>) {
        model.thumb = e.detail;
        await save();
    }

    async function onCategorySelected(e: IEvent<any>) {
        // console.log(e.detail)
    }
</script>
<form on:submit|preventDefault={save}>
    <div class="mb-6">
        <Label for="title" class="mb-2">Title</Label>
        <Input type="text" id="title" placeholder="Title" bind:value={model.title} />
    </div>

    <div class="mb-6">
        <Label class="mb-2">Excerpt</Label>
        <MarkdownEditor model={model.excerpt} id="excerpt-md" on:update={(e) => onMarkdownUpdate('excerpt', e.detail)} />
    </div>

    <div class="mb-6">
        <Label class="mb-2">Description</Label>
        <MarkdownEditor model={model.description} id="description-md" on:update={(e) => onMarkdownUpdate('description', e.detail)} />
    </div>

    <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <Label  class="mb-2">Tags</Label>
            <Tags
                    bind:tags={model.tags}
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
            <PageCategorySelector bind:model={model.categories}  label="Categories" productId={model.id} saveOnSelect={true}
                                     on:selection={onCategorySelected}/>
        </div>
        <div>
            <Image
                    model={model.thumb || {}}
                    title="Page thumbnail"
                    maxNumberOfFiles={1}
                    module="Page"
                    itemId={model.id}
                    type="main"
                    on:imageDetailsChanged={onImageDetailsChanged}
                    on:allUploadsComplete={onUploadComplete}
            />
        </div>
    </div>

    <div class="my-4">
        <Heading tag="h4">SEO</Heading>
        <Hr class="my-8" />

        <SeoFields bind:model="{model.seo}" />
    </div>
</form>
