<script lang="ts">
    import { Spinner } from 'flowbite-svelte';
    export let size = '8';
    export let color: 'primary' | 'blue' | 'gray' | 'green' | 'red' | 'yellow' | 'pink' | 'purple' | 'white' | 'custom' | undefined = 'primary';
</script>
<Spinner size={size} color={color} />
