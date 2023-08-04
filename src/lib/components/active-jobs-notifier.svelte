<script lang="ts">
    import {onMount} from "svelte";
    import {getActiveJobs, setActiveJobsStoreAction, triggerGetActiveJobsAction} from "../../scraper-store";

    onMount(async () => {
        triggerGetActiveJobsAction();
    })
</script>

