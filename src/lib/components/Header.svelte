<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import Icon from './Icon.svelte'
  import { wip } from './WIP.svelte'

  import { getContext } from 'svelte'
  let content = getContext<any>('content')

  let menu: boolean
</script>

<header class="padded flex flex--spaced flex--middle">
  <button class="button--none" on:click={() => menu = true}><Icon k='menu' /> Menu</button>
  {#if menu}
  <nav class="menu padded" transition:fly={{ x: -111 }}>
    <div class="grid grid--full">
      <button class="button--none" on:click={() => menu = false}><Icon k='close' /> {content.close}</button>
      {#each content.links as { href, label }, i}
      <a {href} class="h1"
        on:click={() => menu = false}
        transition:fly={{ x: -40, delay: 50 * (i+1) }}>{label}</a>
      {/each}
      <!-- <a href="#intro" class="h1" on:click={() => menu = false} transition:fly={{ x: -40, delay: 50 }}>Intro</a>
      <a href="#products" class="h1" on:click={() => menu = false} transition:fly={{ x: -40, delay: 100 }}>Products</a>
      <a href="#support" class="h1" on:click={() => menu = false} transition:fly={{ x: -40, delay: 150 }}>Support</a> -->
    </div> 
  </nav>
  {/if}
  <nav class="flex flex--middle flex--tight">
    <a href="https://rigoleombree.com">Fr</a>
    <a href="/" aria-label="Account" on:click|preventDefault={() => wip.set(true)}><Icon k='account' /></a>
    <a href="/" on:click|preventDefault={() => wip.set(true)}><Icon k='cart' /></a>
  </nav>
</header>

<style lang="scss">
  header {
    position: fixed;
    inset: 0;
    bottom: auto;

    > button,
    > nav {
      font-size: var(--step-1);
    }
  }

  .menu {
    position: fixed;
    inset: 0;
    right: auto;
    width: 95vw;
    max-width: var(--step-6);

    color: var(--light);
    background-color: var(--highlight);
  }
</style>