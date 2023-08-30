<script lang="ts">
    import { Tabs, TabItem } from 'flowbite-svelte';
    import FeaturedCategories from './tabs/featured-categories.svelte';
    import Hero from './tabs/hero.svelte';
    import FeaturedItems from './tabs/featured-items.svelte';
</script>

<Tabs style="underline" divider={false}>
    <TabItem open title="Hero Section">
        <div class="text-sm text-gray-500 dark:text-gray-400">
            <Hero />
        </div>
    </TabItem>

    <TabItem title="Featured Categories">
        <div class="text-sm text-gray-500 dark:text-gray-400">
            <FeaturedCategories />
        </div>
    </TabItem>


    <TabItem title="Featured Items">
        <div class="text-sm text-gray-500 dark:text-gray-400">
            <FeaturedItems />
        </div>
    </TabItem>
</Tabs>
