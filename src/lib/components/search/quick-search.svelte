<script lang="ts">
    import type {IProduct} from "../../../shared/models/product";
    import {ProductService} from "../../services/product.service";
    import {createEventDispatcher, onMount} from "svelte";
    const dispatch = createEventDispatcher();

    export let loadOnStartup: boolean = false;

    let query = '';
    let timer;
    let results: IProduct[] = [];
    let loading = false;

    onMount(async () => {
        if (loadOnStartup) {
            await search();
        }
    })

    async function onInputChanged() {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            if (query.length === 0) {return;}
            await search();

        }, 250);

    }

    async function search() {
        const res = await new ProductService().quickSearch(query);
        results = res.data;
        dispatch('complete', results);
    }

    function onInput(e) {
        if (e.target.value.length === 0) {
            reset();
        }
    }

    function reset() {
        query = '';
        results = [];

        dispatch('reset');
    }
</script>

<label for="quick-search" class="sr-only">Search</label>
<div class="relative md:w-64 md:w-96">
    <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
    >
        <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
        >
            <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            ></path>
        </svg>
    </div>
    <input bind:value={query} on:keyup={onInputChanged} on:input={onInput}
            type="search"
            name="quick-search"
            id="quick-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Search"
    />
</div>
