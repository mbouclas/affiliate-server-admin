<script lang="ts">
    import {activeJobsStore, repeatableJobsStore} from "../../scraper-store";
    import {Button, Dropdown, DropdownItem, DropdownHeader, Avatar, Modal} from 'flowbite-svelte'
    import {formatDate} from "../../helpers/dates";
    import {resetActiveSiteAction, setActiveSiteAction, userStore} from "../../user-store";
    import type {ISite} from "../services/auth.service";
    import QuickSearch from "./search/product-selector.svelte";
    import type {IEvent} from "../../shared/models/general";
    import type {IProduct} from "../../shared/models/product";
    import {Icon} from "flowbite-svelte-icons";
    import EditProductModal from "./edit-link.svelte";
    import RefreshDataButton from "../components/previews/preview.svelte";
    let repeatableJobs = [],
        activeSite: ISite = null,
        showQuickSearchModal = false,
        selectedQuickFindProduct: IProduct = null;

    repeatableJobsStore.subscribe(value => {
        if (!Array.isArray(value)) {
            return;
        }

        repeatableJobs = value.splice(0, 5);
    });
    userStore.subscribe((user) => {
        if (!user) {
            return;
        }

        if (user.activeSite) {
            activeSite = user.activeSite;
        }
    });

    function resetActiveSite() {
        activeSite = null;
        resetActiveSiteAction();
    }

    function updateResults(e: IEvent<IProduct[]>) {
        // show modal
    }

    async function onReset() {

    }

    function onQuickSearchItemClicked(item: IProduct) {
        showQuickSearchModal = false;
        selectedQuickFindProduct = item;
    }

    function handleEditComplete() {

    }
</script>
{#if selectedQuickFindProduct}
    <EditProductModal bind:product={selectedQuickFindProduct} on:update={handleEditComplete} closeOnSave={false}
    on:closed={() => selectedQuickFindProduct = null}/>
    {/if}
<Modal id="quickSearchModal" title="Find Products" bind:open={showQuickSearchModal} size="xl" autoclose={false}>
    <QuickSearch onClickItem={onQuickSearchItemClicked}>
        <div slot="button">

        </div>
    </QuickSearch>
</Modal>

<nav class=" bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-24 right-0 top-0 ">
    <div class="flex flex-wrap justify-between items-center">
        <div class="flex justify-start items-center">
            <button
                    data-drawer-target="drawer-navigation"
                    data-drawer-toggle="drawer-navigation"
                    aria-controls="drawer-navigation"
                    class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
                <svg
                        aria-hidden="true"
                        class="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                            fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"
                    ></path>
                </svg>
                <svg
                        aria-hidden="true"
                        class="hidden w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                    ></path>
                </svg>
                <span class="sr-only">Toggle sidebar</span>
            </button>

            <a href="https://flowbite.com" class="flex items-center justify-between mr-4">
                <img
                        src="https://flowbite.s3.amazonaws.com/logo.svg"
                        class="mr-3 h-8"
                        alt="Flowbite Logo"
                />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a>

        </div>
        <div class="flex items-center lg:order-2">
            <button
                    type="button"
                    data-drawer-toggle="drawer-navigation"
                    aria-controls="drawer-navigation"
                    class="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
                <span class="sr-only">Toggle search</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                </svg>
            </button>
            <span class="dark:text-gray-400">

            </span>
            {#if activeSite}
            <button on:click={resetActiveSite}
                    type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                {activeSite.name}
            </button>
                {/if}
            <RefreshDataButton mode="refresh" />
            <button type="button" on:click={() => showQuickSearchModal = !showQuickSearchModal }
                    id="search" class="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400">
                <Icon name="search-solid"></Icon>
                <div class="flex relative">
                    {#if $activeJobsStore.length > 0}
                        <div class="inline-flex relative -top-2 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    {/if}
                </div>
            </button>
            <!-- Notifications -->
            <button type="button" id="bell" class="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400">
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
                <div class="flex relative">
                    {#if $activeJobsStore.length > 0}
                    <div class="inline-flex relative -top-2 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                        {/if}
                </div>
            </button>
            <Dropdown triggeredBy="#bell" class="w-full max-w-sm rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700">
                <div slot="header" class="text-center py-2 font-bold">Notifications</div>
                {#each $activeJobsStore as item}
                <DropdownItem class="flex space-x-4">
                    <div class="pl-3 w-full">
                        <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">{item.data.url}</div>
                        <div class="text-xs text-primary-600 dark:text-primary-500">{formatDate(item.processedOn)}</div>
                    </div>
                </DropdownItem>
                    {/each}

            </Dropdown>
            <!-- Apps -->
            <button
                    type="button"
                    id="repeatable-jobs"
                    class="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
                <span class="sr-only">View notifications</span>
                <!-- Icon -->
                <svg
                        class="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                            d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    ></path>
                </svg>
            </button>
            <!-- Dropdown menu -->
            <Dropdown triggeredBy="#repeatable-jobs" class="w-full max-w-sm rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700">
                <div slot="header" class="text-center py-2 font-bold">Repeatable Jobs</div>
                {#each repeatableJobs as item}
                    <DropdownItem class="flex space-x-4">
                        <div class="pl-3 w-full">
                            <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">{item.data.url}</div>
                            <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400"> Next Run:
                            <span class="text-xs text-primary-600 dark:text-primary-500">{formatDate(item.timestamp + item.delay)}</span>
                                </div>
                        </div>
                    </DropdownItem>
                {/each}
                <a slot="footer" href="/jobs/repeatable" class="block py-2 -my-1 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                    <div class="inline-flex items-center">
                        <svg class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
                        View all
                    </div>
                </a>
            </Dropdown>
            <button
                    type="button"
                    class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="user-menu-button"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown"
            >
                <span class="sr-only">Open user menu</span>
                {#if $userStore.image}
                <img
                        class="w-8 h-8 rounded-full"
                        src={$userStore.image}
                        alt="user photo"
                />
                    {/if}
            </button>
            <!-- Dropdown menu -->
            <div
                    class="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
                    id="dropdown"
            >
                <div class="py-3 px-4">
              <span
                      class="block text-sm font-semibold text-gray-900 dark:text-white"
              >Neil Sims</span
              >
                    <span
                            class="block text-sm text-gray-900 truncate dark:text-white"
                    >name@flowbite.com</span
                    >
                </div>
                <ul
                        class="py-1 text-gray-700 dark:text-gray-300"
                        aria-labelledby="dropdown"
                >
                    <li>
                        <a
                                href="#"
                                class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                        >My profile</a
                        >
                    </li>
                    <li>
                        <a
                                href="#"
                                class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                        >Account settings</a
                        >
                    </li>
                </ul>
                <ul
                        class="py-1 text-gray-700 dark:text-gray-300"
                        aria-labelledby="dropdown"
                >
                    <li>
                        <a
                                href="#"
                                class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        ><svg
                                class="mr-2 w-5 h-5 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                    fill-rule="evenodd"
                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                    clip-rule="evenodd"
                            ></path>
                        </svg>
                            My likes</a
                        >
                    </li>
                    <li>
                        <a
                                href="#"
                                class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        ><svg
                                class="mr-2 w-5 h-5 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                    d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                            ></path>
                        </svg>
                            Collections</a
                        >
                    </li>
                    <li>
                        <a
                                href="#"
                                class="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                  <span class="flex items-center">
                    <svg
                            aria-hidden="true"
                            class="mr-2 w-5 h-5 text-primary-600 dark:text-primary-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                              fill-rule="evenodd"
                              d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                              clip-rule="evenodd"
                      ></path>
                    </svg>
                    Pro version
                  </span>
                            <svg
                                    aria-hidden="true"
                                    class="w-5 h-5 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                        fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd"
                                ></path>
                            </svg>
                        </a>
                    </li>
                </ul>
                <ul
                        class="py-1 text-gray-700 dark:text-gray-300"
                        aria-labelledby="dropdown"
                >
                    <li>
                        <a
                                href="#"
                                class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >Sign out</a
                        >
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>
