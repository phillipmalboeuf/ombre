<script lang="ts">
  import type { Product } from '$lib/payload-types';
  import { enhance } from '$lib/form'
  import { bar, items } from '$lib/stores'
  
  import Price from './Price.svelte'
  import Icon from './Icon.svelte'

  export let product: Product

  let selected: number = product.sizes[0].size
</script>

<form action="/stripe/checkout" method="post" on:submit|preventDefault={e => {
  items.set([
    ...$items,
    {
      id: Math.random().toString(),
      product: product.id,
      unit: product.unit,
      quantity: 1,
      size: selected
    }
  ])
  bar.set(true)
}}>
  <input type="hidden" name="id" value="{product.id}">

  {#each product.sizes as { id, size, adjustment, title }, i}
  <input class:lonely={product.sizes.length === 1} type="radio" name="size" bind:group={selected} id={product.id+id} value={size}>
  <label for={product.id+id}>
    {#if selected === size}<Icon k="hand" />{/if}
    {#if title}{title} <small>{size} {product.unit}</small>{:else}{size} {product.unit}{/if}
    <Price {product} {size} />
  </label>
  {/each}

  <button type="submit">Ajouter</button>
</form>

<style lang="scss">
  button {
    margin-top: var(--step--1);
  }
</style>