<script lang="ts">
import type {IProduct} from "../../../shared/models/product";
import {createEventDispatcher} from "svelte";
const dispatch = createEventDispatcher();

export let product: IProduct;

async function save() {
    dispatch('save', product);
}
</script>

related
