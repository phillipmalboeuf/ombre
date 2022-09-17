<script lang="ts">
  import { onMount } from 'svelte'
  import { PUBLIC_API_URL } from '$env/static/public'
  import { crossfade, fade, fly } from 'svelte/transition'
  import { items, bar, interval } from '$lib/stores'
  import { query } from '$lib/clients/payload'
  import type { Kiosk, Product } from '$lib/payload-types'

  import Icon from './Icon.svelte'
  import Overlay from './Overlay.svelte'
  import Plans from './Plans.svelte'
  import OrderItems from './OrderItems.svelte'
  import Checkout from './Checkout.svelte'

  let kiosks: {docs: Kiosk[]}
  let checkout = false

  onMount(async () => {
    kiosks = await (await fetch(`${PUBLIC_API_URL}/kiosks`)).json()
  })
</script>

<a href="/order" on:click|preventDefault={() => bar.set(!$bar)}><Icon k='cart' /></a>

<Overlay side full={checkout} bind:open={$bar}>
  {#if !checkout}
  <form class="flex flex--col flex--spaced" action="" on:submit|preventDefault={() => {
    checkout = true
  }} transition:fly={{ x: 100 }}>
    <div>
      <OrderItems />
    </div>
    
    <div>
      <fieldset>
        <Plans />
      </fieldset>
      <label for="kiosk">Disponible chez</label>
      <select name="kiosk" id="kiosk">
      {#each kiosks?.docs as kiosk}
      <!-- <option value={kiosk.id}>{kiosk.name} {DateTime.now().plus({ days: kiosk.minimum_order_days + 1 }).toRelative({ locale: 'fr' })}</option> -->
      <option value={kiosk.id}>{kiosk.name}</option>
      {/each}
      </select>
      <button class="button--full button--dark" type="submit">Procéder au paiement</button>
    </div>
    
  </form>
  {:else}
  <Checkout bind:checkout />
  {/if}
</Overlay>

<style lang="scss">
  form {
    padding: var(--step-0);
    background-color: var(--light);
    border-left: 3px solid;
    font-size: var(--step-0);

    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    min-height: 100%;
  }

  fieldset {
    border: none;
    padding: var(--step-0) var(--step-2);
  }
</style>