<script lang="ts">
    import {Input, Label, Button, Textarea, Toggle} from "flowbite-svelte";
    import type {IHeroItem} from "../../../../shared/models/homepage";
    import Image from "../../../../shared/image.svelte";
    import type {IBaseImageModel, IEvent, IUploadImageResult} from "../../../../shared/models/general";
    import {onMount} from "svelte";
    import {HomepageService} from "../../../services/homepage.service";
    import {setNotificationAction} from "../../../../notifications-store";

    let hero: IHeroItem = {} as IHeroItem,
    useProductImage = true,
    useProductSlug = true;
    const homepageService = new HomepageService();

    onMount(async () => {
        const res = await homepageService.getHero();
        if (res.total === 0) {return;}
        hero = res.data[0];
    });

    async function save() {
        try {
            const res = await homepageService.saveHero(hero);
            hero.id = res.id;

        } catch (e) {
            // console.log(e);
            setNotificationAction({
                message: 'Ooops, something went wrong. Did you fill all the fields.',
                type: 'error',
            });
        }

        setNotificationAction({
            message: 'Saved successfully.',
            type: 'success',
        });
    }

    async function onUploadComplete(e: IEvent<IUploadImageResult>) {
        hero.image = e.detail;
        // await save();
    }
    async function onImageDetailsChanged(e: IEvent<IBaseImageModel>) {
        hero.image = e.detail;
        // await save();
    }
</script>

<form on:submit|preventDefault={save}>
    <div class="mb-6">
        <Label for="title" class="mb-2">Title</Label>
        <Input type="text" id="title" placeholder="Title" bind:value={hero.title} />
    </div>
    <div class="mb-6">
        <Label for="title" class="mb-2">Subtitle</Label>
        <Input type="text" id="title" placeholder="Subtitle" bind:value={hero.subtitle} />
    </div>

    <div class="mb-6">
        <Label for="title" class="mb-2">Caption</Label>
        <Textarea type="text" id="title" placeholder="Caption" bind:value={hero.caption} />
    </div>

    <div class="mb-6">
        <Toggle on:change={() => useProductSlug = !useProductSlug} checked={useProductSlug}>Use Product Slug</Toggle>
        {#if !useProductSlug}
        <Label for="title" class="mb-2">Slug</Label>
        <Input type="text" id="title" placeholder="Slug" bind:value={hero.slug} />
            {/if}
    </div>

    <div class="mb-6">

        <Toggle on:change={() => useProductImage = !useProductImage} checked={useProductImage}>Use Product Image</Toggle>
        {#if !useProductImage}
        <Image
                model={hero.image || {}}
                title="Image"
                maxNumberOfFiles={1}
                module="Hero"
                itemId={null}
                type="main"
                on:imageDetailsChanged={onImageDetailsChanged}
                on:allUploadsComplete={onUploadComplete}
        />
            {/if}
    </div>

    <Button type="submit" class="w-full">Save</Button>
</form>
