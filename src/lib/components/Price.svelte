<script lang="ts">
  import { money } from '$lib/formatters'
  import type { Product, Season } from '$lib/payload-types'
  import { perks, perk, interval, items } from '$lib/stores'

  export let product: Product
  export let size: number

  export const original = product.price * size * product.sizes.find(s => size === s.size).adjustment
  export let discount: number = undefined

  $ : {
    const _items = $items.flatMap<{
      product: string
      unit: string
      size: number
      quantity: number
    }>(item => 'products' in item ? item.products : item)

    if ($perks) {
      discount = 0
      if ($interval !== 'one-time') {
        $perks.filter(perk => (product.seasons as Season[]).find(s => s == perk.season) && perk.type === 'subscription').forEach(perk => perk.discount.percentage
        ? discount += original * (perk.discount.amount/100)
        : discount += perk.discount.amount)
      }

      $perks.filter(perk => (product.seasons as Season[]).find(s => s == perk.season) && perk.type === 'order_units' && perk.unit.unit === product.unit).forEach(perk => {
        if (_items.filter(item => item.unit === perk.unit.unit).reduce((total, item) => {
          return total += item.size * item.quantity
        }, 0) >= perk.unit.unit_number) {
          perk.discount.percentage
            ? discount += original * (perk.discount.amount/100)
            : discount += perk.discount.amount
        }
      })

      $perks.filter(p => p.type === 'code' && $perk === p.id).forEach(p => {
        p.discount.percentage
          ? discount += original * (p.discount.amount/100)
          : discount += p.discount.amount
      })
    }
  }
</script>

{#if discount}
<s>{money(original)}</s><strong>{money(original - discount)}</strong>
{:else}
<strong>{money(original)}</strong>
{/if}