<script lang="ts">
    import {onMount} from "svelte";
    import {repeatableJobsStopRequestsStore, triggerGetRepeatableJobsAction, setRepeatableJobsStopRequestsAction} from "../../scraper-store";
    let timer: number;

    onMount(async () => {
        triggerGetRepeatableJobsAction();
    });

    timer = setInterval(() => {
        if ($repeatableJobsStopRequestsStore) {
            clearInterval(timer);
            return
        }
        triggerGetRepeatableJobsAction();
    }, 60000);


</script>

