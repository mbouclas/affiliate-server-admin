<script lang="ts">
    import {onMount} from "svelte";
    import {

        triggerGetFailedJobsAction
    } from "../../scraper-store";

    onMount(async () => {
        triggerGetFailedJobsAction();
    })
</script>

