<script lang="ts">
  import type { Product } from 'src/payload-types'
  export let products: Product[]
  import { enhance } from '$lib/form'
</script>

{#each products as product}
  <a href="/products/{product.id}">{product.title} {product.id}</a>
  <form action="/checkout" method="post">
    <input type="hidden" name="id" value="{product.id}">

    {#each product.sizes as { id, size, title }}
    <input type="radio" name="size" {id} value={size}>
    <label for={id}>{title} <small>{size} {product.unit}</small></label><br>
    {/each}

    <button type="submit">Add to Order</button>
  </form>
  <br>
{/each}