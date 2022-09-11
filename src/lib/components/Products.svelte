<script lang="ts">
  import type { Product } from '$lib/payload-types'
  export let products: Product[]
  
  import { enhance } from '$lib/form'
  import { bar, items } from '$lib/stores'

  import Icon from './Icon.svelte'
  import Media from './Media.svelte'

  let group: { [id: string]: number | undefined } = {}
  products.forEach(product => group[product.id] = product.sizes[0].size)
</script>

<ul class="--nostyle grid grid--halves">
{#each products as product}
  <li>
    <a href="/products/{product.id}">
      <figure>
        <Media media={product.thumbnail} ar={1} noDescription />
      </figure>
      <h4>{product.title}</h4>
    </a>
    <form action="/stripe/checkout" method="post" on:submit|preventDefault={e => {
      items.set([
        ...$items,
        {
          id: Math.random().toString(),
          product: product.id,
          quantity: 1,
          size: group[product.id]
        }
      ])
      bar.set(true)
    }}>
      <input type="hidden" name="id" value="{product.id}">

      {#each product.sizes as { id, size, title }, i}
      <input type="radio" name="size" bind:group={group[product.id]} id={product.id+id} value={size}>
      <label for={product.id+id}>{#if group[product.id] === size}<Icon k="hand" />{/if} {title} <small>{size} {product.unit}</small></label>
      {/each}

      <button type="submit">Ajouter à votre commande</button>
    </form>
  </li>
{/each}
</ul>

<style lang="scss">
  figure {
    max-width: var(--step-4);
  }

  h4 {
    margin-bottom: var(--step--2);
  }

  button {
    margin-top: var(--step--1);
  }
</style>