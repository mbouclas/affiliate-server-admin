<script lang="ts">
import AuthorizedLayout from "./layouts/authorized.layout.svelte";
import UnauthorizedLayout from "./layouts/unauthorized.layout.svelte";
import {userStore} from "./user-store";
import SiteSelector from "./lib/components/site-selector.svelte";
let authorized = false,
selectedSite = null;
let siteTitle = "Affiliate System";
userStore.subscribe((user) => {
    if (!user) {return;}

    authorized = true;
    selectedSite = user.activeSite ? user.activeSite : null;

    siteTitle = user.activeSite && user.activeSite.name ? user.activeSite.name : 'Select site';
});


</script>
<svelte:head>
    <title>{siteTitle}</title>
</svelte:head>
{#if authorized}
    {#if selectedSite}
        <AuthorizedLayout />
    {:else}
        <SiteSelector bind:model={selectedSite} />
    {/if}

{:else}
    <UnauthorizedLayout />
{/if}
