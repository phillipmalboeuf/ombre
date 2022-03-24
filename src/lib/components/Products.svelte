<script lang="ts">
  import type { Product } from '@prisma/client'
  export let products: Product[]
</script>

{#each products as product}
  <a href="/products/{product.id_}">{product.name} {product.id_}</a><br>
{/each}