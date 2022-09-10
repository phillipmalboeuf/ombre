<script lang="ts">
  import type { Product } from '$lib/payload-types'
  export let products: Product[]
  import { enhance } from '$lib/form'
  import Icon from './Icon.svelte'
  
  import { items } from '$lib/stores'

  let group: { [id: string]: number | undefined } = {}
  products.forEach(product => group[product.id] = product.sizes[0].size)
</script>

{#each products as product}
  <a href="/products/{product.id}">{product.title}</a>
  <form action="/stripe/checkout" method="post" on:submit|preventDefault={e => {
    items.set([
      ...$items,
      {
        product: product.id,
        quantity: 1,
        size: group[product.id]
      }
    ])
  }}>
    <input type="hidden" name="id" value="{product.id}">

    {#each product.sizes as { id, size, title }, i}
    <input type="radio" name="size" bind:group={group[product.id]} id={product.id+id} value={size}>
    <label for={product.id+id}>{#if group[product.id] === size}<Icon k="hand" />{/if} {title} <small>{size} {product.unit}</small></label>
    {/each}

    <button type="submit">Ajouter à votre commande</button>
  </form>
  <br>
{/each}