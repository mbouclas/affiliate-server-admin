<script lang="ts">
import type {ISite} from "../services/auth.service";
import {setActiveSiteAction, userStore} from "../../user-store";


export let model: ISite;
let sites: ISite[] = [];
userStore.subscribe((user) => {
    if (!user) {return;}

    if (user.allowedSites.length === 1) {
        setActiveSiteAction(user.allowedSites[0]);
        return;
    }

    sites = user.allowedSites;
});

function setActiveSite(site: ISite) {
    setActiveSiteAction(site);
    model = site;
}

</script>


<div class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <h3 class="p-1 text-center text-xl font-medium text-gray-900 dark:text-white">Select Site</h3>
    {#each sites as site}
    <button  on:click={setActiveSite.bind(this, site)} type="button" class="w-full px-4 py-2 font-medium text-left text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600">
        {site.name}
    </button>
        {/each}
</div>
