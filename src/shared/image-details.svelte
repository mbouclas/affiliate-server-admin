<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {Modal, Input, Textarea} from "flowbite-svelte";

    const dispatch = createEventDispatcher();
    export let hideModal: boolean = true;
    export let showModal: boolean = false;
    export let onSave: Function;
    export let model;

    function toggle() {
        showModal = !showModal;

        dispatch('close');
    }

    function getField(name: string) {
        // return fields.find((field) => field.varName === name);
    }
</script>
<Modal id="image-details-modal" title="Image Details" bind:open={showModal} size="md" autoclose={false}>

            <h1 class="title">Image Details</h1>
            <form action="" on:submit|preventDefault={onSave.bind(this, model)}>
                <div class="mb-4">
                <Input  bind:value={model.title} placeholder="Title" label="Title"  />
                </div>
                <div class="mb-4">
                <Input  bind:value={model.alt} placeholder="Alt" label="Alt"   />
                </div>
                <div class="mb-4">
                <Textarea  bind:value={model.description} placeholder="Description" label="Description"   />
                </div>
                <div class="mb-4">
                <Textarea  bind:value={model.caption} placeholder="Caption" label="Caption"  />
                </div>

                <button class="save-btn" type="submit">Save</button>
            </form>


</Modal>
