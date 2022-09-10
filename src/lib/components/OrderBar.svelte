<script lang="ts">
  import { PUBLIC_API_URL } from '$env/static/public'
  import { fade, fly } from 'svelte/transition'
  import { items, bar } from '$lib/stores'
  import { query } from '$lib/clients/payload'
  import type { Product } from '$lib/payload-types'

  import Icon from './Icon.svelte'
  import Overlay from './Overlay.svelte'

  let products = {}

  async function product(id: string) {
    if (!products[id]) {
      products[id] = await (await fetch(`${PUBLIC_API_URL}/products/${id}`)).json()
    }
    return products[id]
  }

  let interval: string = 'one-time'
</script>

<a href="/order" on:click|preventDefault={() => bar.set(!$bar)}><Icon k='cart' /></a>

<Overlay side bind:open={$bar}>
  <form class="flex flex--col flex--spaced" action="" transition:fly={{ x: 100 }}>
    <div>
      <h5>Votre commande</h5>
      <ul class="--nostyle">
        {#each $items as item, i}
        <li transition:fly={{ x: -33 }}>
        {#await product(item.product) then product}
          <strong>{product.title}{#if item.quantity > 1} fois {item.quantity}{/if}</strong><br>
          <small>{item.size} {product.unit}</small><br>
          <button class="button--none" type="button" on:click={() => {
            $items.splice(i, 1)
            items.set($items)
          }}><u>Enlever</u></button>
          <button class="button--none" type="button" on:click={() => {
            items.set([
              ...$items,
              item
            ])
          }}><u>Ajouter un de plus</u></button>
        {/await}
        </li>
        {:else}
        <li><em>Votre commande est vide à l'instant.</em></li>
        {/each}
      </ul>
    </div>
    
    <div>
      <div class="padded">
        <input type="radio" name="interval" bind:group={interval} value="one-time" id="one-time">
        <label for="one-time">{#if interval === "one-time"}<Icon k="hand" />{/if} Commande une fois</label>
        <input type="radio" name="interval" bind:group={interval} value="week" id="week">
        <label for="week">{#if interval === "week"}<Icon k="hand" />{/if} Abonnement hebdomadaire</label>
        <input type="radio" name="interval" bind:group={interval} value="month" id="month">
        <label for="month">{#if interval === "month"}<Icon k="hand" />{/if} Abonnement mensuel</label>
      </div>
      <button class="button--full" type="submit">Procéder au paiement</button>
    </div>
    
  </form>
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
    height: 100%;
  }

  ul {
    li {
      font-size: var(--step--1);
    }
  }
</style>