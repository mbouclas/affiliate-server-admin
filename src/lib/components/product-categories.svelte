<script lang="ts">
    import {onMount} from "svelte";
    import {ProductCategoryService} from "../services/productCategory.service";
    import ProductCategoriesList from "./ProductCategoriesList.svelte";
    let tree = [];

    onMount(async () => {
        const res = await new ProductCategoryService().find();
        tree = res;

    });
</script>
<ProductCategoriesList />
