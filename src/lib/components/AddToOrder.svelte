<script lang="ts">
  import type { Bundle, Product } from '$lib/payload-types'
  import { bar, items } from '$lib/stores'
  import { money } from '$lib/formatters'
  
  import Price from './Price.svelte'
  import Icon from './Icon.svelte'
  import Totals from './Totals.svelte'

  export let product: Product | Bundle
  export let hideBundleProducts = false

  let selected: number = 'sizes' in product && product.sizes[0].size
  
  let originals: { [id: string]: number } = {}
  let discounts: { [id: string]: number } = {}
</script>

<form action="/stripe/checkout" method="post" on:submit|preventDefault={e => {
  items.set([
    ...$items,
    ... 'products' in product
      ? [{
        id: Math.random().toString(),
        bundle: product.id,
        quantity: 1,
        products: product.products.map(bundleProduct => ({
          id: Math.random().toString(),
          product: typeof bundleProduct.product !== 'string' && bundleProduct.product.id,
          unit: typeof bundleProduct.product !== 'string' && bundleProduct.product.unit,
          quantity: bundleProduct.quantity,
          size: bundleProduct.size
        }))
      }]
      : [{
        id: Math.random().toString(),
        product: product.id,
        unit: product.unit,
        quantity: 1,
        size: selected
      }]
  ])
  bar.set(true)
}}>
  <input type="hidden" name="id" value="{product.id}">
  {#if 'sizes' in product}
  {#each product.sizes as { id, size, adjustment, title }, i}
  <input class:lonely={product.sizes.length === 1} type="radio" name="size" bind:group={selected} id={product.id+id} value={size}>
  <label for={product.id+id}>
    {#if selected === size}<Icon k="hand" />{/if}
    {#if title}{title} <small>{size} {product.unit}</small>{:else}{size} {product.unit}{/if}
    <Price {product} {size} />
  </label>
  {/each}
  {:else if 'products' in product}
  <ul class="--nostyle">
  {#each product.products as bundleProduct, i}
    {#if typeof bundleProduct.product !== 'string'}
    {#if !hideBundleProducts}
    <li>{#if bundleProduct.quantity > 1} fois {bundleProduct.quantity}{/if} {bundleProduct.product.title} <small>{bundleProduct.size} {bundleProduct.product.unit}</small></li>
    {/if}
    <Price hide product={bundleProduct.product} size={bundleProduct.size} startingQuantity={4} adjustment={product.adjustment} bind:discount={discounts[bundleProduct.id]} bind:original={originals[bundleProduct.id]} />
    {/if}
  {/each}
  </ul>
  <Totals {originals} {discounts} inline />
  <br>
  {/if}

  <button type="submit" disabled={'products' in product ? product.products.reduce((total, product) => {
    return total += (product).inventory
  }, 0) === 0 : product.inventory === 0}>
  {#if 'products' in product ? product.products.reduce((total, product) => {
    return total += (product).inventory
  }, 0) === 0 : product.inventory === 0}
  Non-disponible
  {:else}
  Ajouter
  {/if}</button>
</form>

<style lang="scss">
  button {
    margin-top: var(--step--1);
  }

  ul {
    li {
      margin-bottom: 0;
    }
  }
</style>