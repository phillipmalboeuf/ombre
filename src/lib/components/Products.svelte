<script lang="ts">
  import type { Product } from '@prisma/client'
  export let products: Product[]
  import { enhance } from '$lib/form'
</script>

{#each products as product}
  <a href="/products/{product.id_}">{product.name} {product.id_}</a>
  <form action="/checkout" method="post">
    <input type="hidden" name="id" value="{product.id_}">
    <button type="submit">Checkout</button>
  </form>
  <br>
{/each}