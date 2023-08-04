<script lang="ts">
import AuthorizedLayout from "./layouts/authorized.layout.svelte";
import UnauthorizedLayout from "./layouts/unauthorized.layout.svelte";

    import {userStore} from "./user-store";
    let authorized = false;

    userStore.subscribe((user) => {
        if (!user) {return;}

        authorized = true;
    });


</script>
{#if authorized}
    <AuthorizedLayout />
{:else}
    <UnauthorizedLayout />
{/if}
