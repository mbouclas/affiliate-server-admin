<script>
  import { Toast } from "flowbite-svelte";
  import { fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";
  import { Check, InformationCircle, XMark } from "svelte-heros-v2";

  // export let duration;
  export let message;
  export let type = 'success';
  export let show = false;
  export let align = true;
  export let position = 'top-right';
  export let color = 'green';
  export let simple = true;
  let colors = {
    success: "#3f83f8",
  };

  let positionClass;

  switch (position) {
    case 'top':
      positionClass = 'top-7 left-1/2 transform -translate-x-1/2';
      break;
    case 'bottom':
      positionClass = 'bottom-7 left-1/2 transform -translate-x-1/2';
      break;
    case 'top-right':
      positionClass = 'top-7 right-7';
      break;
    case 'top-left':
      positionClass = 'top-7 left-7';
      break;
    case 'bottom-left':
      positionClass = 'bottom-7 left-7';
      break;
    case 'bottom-right':
      positionClass = 'bottom-7 right-7';
      break;
  }

</script>
<div  class={`fixed  ${positionClass} w-full h-auto z-50`} role="alert"
      >
  <div class=" relative h-64">
  <Toast
          simple
          {align}
          open={show}
          {color}
          {position}
          contentClass="flex space-x-4 divide-x divide-gray-200 dark:divide-gray-700 "
          divClass={`w-full max-w-xs p-4 text-gray-500 bg-white shadow dark:text-gray-400 dark:bg-gray-700 gap-3 z-50`}
  >

    <svelte:fragment slot="icon">
      {#if type === "success"}
        <Check class="w-5 h-5" />

      {:else if type === "error"}
        <XMark />
      {:else}
        <InformationCircle />
      {/if}
    </svelte:fragment>
    {message}
    <slot></slot>
  </Toast>
  </div>
</div>


<style land="scss" global>
  .toast {
    color: white !important;
    font-weight: 600 !important;
    border: none !important;
  }
  .toast.success {
    background-color: green !important;
  }
  .toast.error {
    background-color: red !important;
  }
  .toast.info {
    background-color: blue !important;
  }
</style>
