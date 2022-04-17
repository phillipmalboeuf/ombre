<script lang="ts">
  import { onMount } from 'svelte'
  import { fade, fly } from 'svelte/transition'
  import Icon from './Icon.svelte'

  export let open = false
</script>

{#if open}
<aside>
  <button class="back" transition:fade on:click={() => open = false} area-label="Close" />
  <button class="close" transition:fade on:click={() => open = false} aria-label="Close">
    <Icon k="close" />
  </button>
  <slot />
</aside>
{/if}

<style lang="scss">
  aside {
    position: fixed;
    inset: 0;
    z-index: 15;
    overflow-y: auto;
    
    > button.back {
      position: fixed;
      inset: 0;
      z-index: -1;
      background-color: rgba(251, 251, 251, 0.88);
      -webkit-backdrop-filter: blur(8px);
      backdrop-filter: blur(8px);

      border: none;
      border-radius: 0;
    }

    > button.close {
      position: fixed;
      z-index: 1;
      top: var(--step--1);
      right: var(--step--1);

      background: transparent;
      border: none;
    }
  }
</style>