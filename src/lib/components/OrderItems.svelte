<script lang="ts">
  import { PUBLIC_API_URL } from '$env/static/public'
  import { crossfade, fade, fly } from 'svelte/transition'
  import { items, bar, interval } from '$lib/stores'
  import { api, query } from '$lib/clients/payload'
  import type { Bundle, Product } from '$lib/payload-types'

  import Media from './Media.svelte'
  import Price from './Price.svelte'

  export let compact = false

  export let products: { [id: string]: Product } = {}
  export let bundles: { [id: string]: Bundle } = {}
  export let originals: { [id: string]: number } = {}
  export let discounts: { [id: string]: number } = {}

  async function product(id: string) {
    if (!products[id]) {
      products[id] = await api<Product>(`products/${id}`)
    }
    return products[id]
  }

  async function bundle(id: string) {
    if (!bundles[id]) {
      bundles[id] = await api<Bundle>(`bundles/${id}`)
    }
    return bundles[id]
  }

  items.subscribe(async items => {
    items.forEach(item => {
      if ('products' in item) {
        bundle(item.bundle)
        item.products.forEach(p => product(p.product))
      } else {
        product(item.product)
      } 
    })
  })
</script>

<h5>{#if $interval === 'one-time'}Votre commande{:else}Votre abonnement{/if}</h5>
<ul class:compact class="--nostyle grid grid--tight" class:grid--halves={$items.length} class:grid--full={!$items.length}>
  {#each $items as item, i (item.id)}
  <li class="flex flex--middle" class:span__2={'bundle' in item} transition:fly={{ y: 33 }}>
    <figure>
      {#if 'product' in item && products[item.product]}
      <Media media={products[item.product].thumbnail} ar={1} small eager noDescription />
      {:else if 'bundle' in item && bundles[item.bundle]}
      <Media media={bundles[item.bundle].thumbnail} ar={1} small eager noDescription />
      {/if}
    </figure>
    <article>
      {#if 'product' in item && products[item.product]}
      <strong>{products[item.product].title}{#if item.quantity > 1} fois {item.quantity}{/if}</strong><br>
      <small>{item.size} {products[item.product].unit}<br><Price bind:discount={discounts[item.id]} bind:original={originals[item.id]} product={products[item.product]} size={item.size} /></small><br>
      
      {:else if 'bundle' in item && bundles[item.bundle]}
      <strong class="h5">{bundles[item.bundle].title}{#if item.quantity > 1} fois {item.quantity}{/if}</strong><br>
      {#each item.products as p, i}
      {#if products[p.product]}
      <small><strong>{products[p.product].title}{#if p.quantity > 1} fois {p.quantity}{/if}</strong>
      {p.size} {p.unit} <Price bind:discount={discounts[p.id]} bind:original={originals[p.id]} product={products[p.product]} size={p.size} adjustment={bundles[item.bundle].adjustment} /></small>
      <br>
      {:else}
      <strong>...{#if item.quantity > 1} fois {item.quantity}{/if}</strong>
      <small>...</small><br>
      {/if}
      {/each}

      {:else}
      <strong>...{#if item.quantity > 1} fois {item.quantity}{/if}</strong><br>
      <small>...</small><br>
      {/if}
      {#if !compact}
      <button class="button--tight" type="button" on:click={() => {
        $items.splice(i, 1)
        originals[item.id] = undefined
        discounts[item.id] = undefined
        items.set($items)
      }}>–</button>
      <button class="button--tight" type="button" on:click={() => {
        $items.splice(i + 1, 0, {
          ...item,
          id: Math.random().toString(),
          ...'products' in item && { products: item.products.map(p => ({ ...p, id: Math.random().toString() })) }
        })
        items.set($items)
      }}>+</button>
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

      @media (max-width: 888px) {
        grid-column: span 2;
      }
    }

    &.compact {
      li {
        margin-bottom: var(--step--1);
      }
    }
  }
</style>