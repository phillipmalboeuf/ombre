<script lang="ts">
  import type { Product } from '$lib/payload-types'
  export let products: Product[]
  import { enhance } from '$lib/form'
</script>

{#each products as product}
  <a href="/products/{product.id}">{product.title} {product.id}</a>
  <form action="/stripe/checkout" method="post">
    <input type="hidden" name="id" value="{product.id}">

    {#each product.sizes as { id, size, title }}
    <input type="radio" name="size" id={product.id+id} value={size}>
    <label for={product.id+id}>{title} <small>{size} {product.unit}</small></label><br>
    {/each}

    <button type="submit">Add to Order</button>
  </form>
  <br>
{/each}