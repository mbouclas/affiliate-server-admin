<script lang="ts">
    import {onMount} from "svelte";
    import {PageCategoryService} from "../../services/pageCategory.service";
    import SimpleTreeSelector from "../../../shared/SimpleTreeSelector.svelte";
    import {setNotificationAction} from "../../../notifications-store";

    export let model = [];

    const service = new PageCategoryService();

    let tree = [];
    let movingNode = null;

    onMount(async () => {
        tree = await service.find();
    });

    function handleEdit(node) {
        console.log(node.uuid);
    }

    const handleMove = async (node, parentNode = null) => {
        await service.move(node.id, parentNode?.id || null);
        return service.find();
    };

    const handleDelete = async (node, deleteType: string) => {
        await service.remove(node.uuid);
        tree = await service.find();
        return null;
    };

    const handleCreate = async (data) => {
        await service.store(data);
        tree = await service.find();
        return null;
    };

    const handleUpdate = async (uuid, data) => {
        await service.update(uuid, data);
        tree = await service.find();
        setNotificationAction({
            message: 'Saved successfully',
            type: 'success',
        });
        return null;
    };

    function handleNewAfter(node) {
        console.log(node.uuid);
    }

    function handleNewBefore(node) {
        console.log(node.uuid);
    }

    function handleNewSubCategory(node) {
        console.log(node.uuid);
    }

    function handleOnTreeViewChangeEvent(e) {
        const { type, node } = e.detail;
    }
    onMount(async () => {
        const res = await new PageCategoryService().find();
        tree = res;

    });
</script>
<SimpleTreeSelector
        bind:tree
        on:selection={handleOnTreeViewChangeEvent}
        on:handleMove={async (e) => {
    const { node, parent } = e.detail;
    const newTree = await handleMove(node, parent);
    tree = newTree;
    movingNode = null;
  }}
        {handleCreate}
        {handleUpdate}
        {handleDelete}
        bind:movingNode
/>
