<script lang="ts">
  import { PUBLIC_API_URL } from '$env/static/public'
  import { crossfade, fade, fly } from 'svelte/transition'
  import { items, bar, interval } from '$lib/stores'
  import { query } from '$lib/clients/payload'
  import type { Product } from '$lib/payload-types'

  import Media from './Media.svelte'
  import Price from './Price.svelte'

  export let compact = false

  export let products: { [id: string]: Product } = {}
  export let originals: { [id: string]: number } = {}
  export let discounts: { [id: string]: number } = {}

  async function product(id: string) {
    if (!products[id]) {
      products[id] = await (await fetch(`${PUBLIC_API_URL}/products/${id}`)).json()
    }
    return products[id]
  }

  items.subscribe(async items => {
    items.forEach(item => product(item.product))
  })
</script>

<h5>{#if $interval === 'one-time'}Votre commande{:else}Votre abonnement{/if}</h5>
<ul class:compact class="--nostyle grid grid--halves grid--tight">
  {#each $items as item, i (item.id)}
  <li class="flex flex--middle" transition:fly={{ y: 33 }}>
    <figure>
      {#if products[item.product]}
      <Media media={products[item.product].thumbnail} ar={1} small eager noDescription />
      {/if}
    </figure>
    <article>
      {#if products[item.product]}
      <strong>{products[item.product].title}{#if item.quantity > 1} fois {item.quantity}{/if}</strong><br>
      <small>{item.size} {products[item.product].unit}<br><Price bind:discount={discounts[item.id]} bind:original={originals[item.id]} product={products[item.product]} size={item.size} /></small><br>
      {:else}
      <strong>...{#if item.quantity > 1} fois {item.quantity}{/if}</strong><br>
      <small>{item.size} ...</small><br>
      {/if}
      {#if !compact}
      <button class="button--none" type="button" on:click={() => {
        $items.splice(i, 1)
        originals[item.id] = undefined
        discounts[item.id] = undefined
        items.set($items)
      }}><u>–</u></button>
      <button class="button--none" type="button" on:click={() => {
        $items.splice(i + 1, 0, {
          ...item,
          id: Math.random().toString()
        })
        items.set($items)
      }}><u>+</u></button>
      {/if}
    </article>
  </li>
  {:else}
  <li><em>Votre commande est vide à l'instant.</em></li>
  {/each}
</ul>

<style lang="scss">
  figure {
    width: var(--step-2);
  }

  ul {
    li {
      font-size: var(--step--1);
      margin-bottom: var(--step--1);
    }

    &.compact {
      li {
        margin-bottom: var(--step--1);
      }
    }
  }
</style>