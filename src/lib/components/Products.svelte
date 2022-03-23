<script lang="ts">
  import type { furniture } from '@prisma/client'
  export let products: furniture[]
</script>

{#each products as product}
  <a href="/ps/{product.id}">{product.name} {product.notes}</a><br>
{/each}