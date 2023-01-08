<script lang="ts">
  import { money } from '$lib/formatters'
  import { perk } from '$lib/stores'

  export let originals: { [id: string]: number } = {}
  export let discounts: { [id: string]: number } = {}
  export let inline = false

  let subTotal: number
  let discountTotal: number
  export let total: number = undefined

  $: {
    subTotal = Object.entries(originals).filter(([id, value]) => value).reduce((t, [id, value], i) => {
      return t + value
    }, 0)
    discountTotal = Object.entries(originals).filter(([id, value]) => value).reduce((t, [id, value], i) => {
      return t - discounts[id]
    }, 0)
    total = Object.entries(originals).filter(([id, value]) => value).reduce((t, [id, value], i) => {
      return t + value - discounts[id]
    }, 0)
  }
</script>

{#if total}
{#if inline}
{#if discountTotal}
<s>{money(subTotal)}</s><strong>{money(total)}</strong>
{:else}
<strong>{money(total)}</strong>
{/if}
{:else}
<h5>Totaux</h5>
<ol class="--nostyle">
  {#if discountTotal}
  <li><h6>Sous-total</h6> <strong>{money(subTotal)}</strong></li>
  {#if $perk}
  <li><h6>Code</h6> <strong>{$perk}</strong></li>
  {/if}
  <li><h6>Rabais</h6> <strong>{money(discountTotal)}</strong></li>
  {/if}

  <li><h6>Total</h6> <strong>{money(total)}</strong></li>
</ol>
{/if}
{:else}
...
{/if}

<style lang="scss">
  ol {
    li {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: var(--step--1);

      h6 {
        margin-bottom: 0;
      }
    }
  }
</style>