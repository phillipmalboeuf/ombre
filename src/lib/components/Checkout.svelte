<script lang="ts">
  import { money } from '$lib/formatters'
  import { items } from '$lib/stores'
  import { crossfade, fade, fly } from 'svelte/transition'
  import OrderItems from './OrderItems.svelte'

  export let checkout: boolean = true

  let subTotal: number
  let discountTotal: number
  let total: number

  let originals: { [id: string]: number } = {}
  let discounts: { [id: string]: number } = {}

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

<form action="/checkout" class="grid grid--halves" method="post" transition:fly={{ x: 100 }}>
  <div>
    <button on:click={() => checkout = false} type="button" class="button--none"><u>Retour</u></button>
    <OrderItems compact bind:originals bind:discounts />
    <hr>

    <nav class="flex flex--middle flex--tight">
      <button class="button--none" type="button">Profil</button>
      <button class="button--none" type="button" disabled>Adresse</button>
      <button class="button--none" type="button" disabled>Paiement</button>
    </nav>
  </div>

  <aside>
    

    <!-- <h5>Livraison</h5> -->
    

    <h5>Totaux</h5>
    <ol class="--nostyle">
      {#if discountTotal}
      <li><h6>Sous-total</h6> <strong>{money(subTotal)}</strong></li>
      <li><h6>Rabais</h6> <strong>{money(discountTotal)}</strong></li>
      {/if}

      <li><h6>Total</h6> <strong>{money(total)}</strong></li>
    </ol>
  </aside>
</form>

<style lang="scss">
  form {
    background-color: var(--light);
    border-left: 3px solid;
    font-size: var(--step-0);

    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    min-height: 100%;

    > div {
      position: relative;
      padding: var(--step-0);

      > button {
        position: absolute;
        top: var(--step-0);
        right: 0;
      }
    }
  }

  aside {
    padding: var(--step-0);
    min-height: 100%;
    background-color: var(--grey);

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
  }

  // fieldset {
  //   border: none;
  //   padding: var(--step-0) var(--step-2);
  // }
</style>