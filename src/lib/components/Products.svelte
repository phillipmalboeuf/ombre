<script lang="ts">
  export let products: any[]
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