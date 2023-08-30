<script lang="ts">
import ProductCategorySelector from "../../product-tabs/product-category-tree.svelte";
import type {IEvent} from "../../../../shared/models/general";
import {HomepageService} from "../../../services/homepage.service";
import {setNotificationAction} from "../../../../notifications-store";
import {onMount} from "svelte";
let categories = [];
let productId = null;

onMount(async () => {
   const res = await new HomepageService().getFeaturedCategories();
   if (!res || res.length === 0) {
       return;
   }

   categories = res;
});

async function onCategorySelected(e: IEvent<any>) {

    try {
        await new HomepageService().saveFeaturedCategories(e.detail);
    }
    catch (e) {
        setNotificationAction({
            message: 'Ooops, something went wrong. Did you fill all the fields.',
            type: 'error',
        });
    }

    setNotificationAction({
        message: 'Saved successfully.',
        type: 'success',
    });
}

</script>
<ProductCategorySelector bind:model={categories}  label="Categories" {productId}
                         on:selection={onCategorySelected}/>
