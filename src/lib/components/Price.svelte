<script lang="ts">
  import { money } from '$lib/formatters'
  import type { Product } from '$lib/payload-types'

  export let product: Product
  export let size: number
</script>

<strong>{money(product.price * size * product.sizes.find(s => size === s.size).adjustment)}</strong>