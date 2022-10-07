<script lang="ts">
  import type Stripe from 'stripe'
  import type { Stripe as StripeJS, StripeElements } from '@stripe/stripe-js'
  import { onMount } from 'svelte'
  import { DateTime } from 'luxon'
  import { enhance } from '$app/forms'
  import { PUBLIC_API_URL, PUBLIC_STRIPE_PK } from '$env/static/public'

  import { money } from '$lib/formatters'
  import { me, items, kiosk, interval, perk } from '$lib/stores'
  import { crossfade, fade, fly } from 'svelte/transition'
    
  import OrderItems from './OrderItems.svelte'
  import { browser } from '$app/environment'
  import Account from './Account.svelte'
  

  export let checkout: boolean = true

  export let step: "profile" | "address" | "payment" = "profile"

  let subTotal: number
  let discountTotal: number
  let total: number

  let intent: Stripe.Order | Stripe.Subscription
  let stripe: StripeJS
  let elements: StripeElements

  let originals: { [id: string]: number } = {}
  let discounts: { [id: string]: number } = {}

  let waiting = false

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

  $: {
    if (browser && form && total && !intent) {
      
      fetch('/checkout/intent', {
        method: 'POST',
        body: JSON.stringify({
          customer: $me.payment_provider_id,
          interval: $interval,
          items: $items.map(item => ({ ...item, total: originals[item.id] - discounts[item.id] })),
          kiosk: $kiosk
        }),
        headers: {
          'content-type': 'application/json'
        }
      }).then(async response => {
        intent = await response.json()

        const { loadStripe } = await import('@stripe/stripe-js/pure')
        stripe = await loadStripe(PUBLIC_STRIPE_PK, {
          betas: ['process_order_beta_1'],
          apiVersion: "2022-08-01; orders_beta=v4",
          stripeAccount: 'acct_1LpynD4IazTmFSzT'
        })

        elements = stripe.elements({
          clientSecret: 'client_secret' in intent ? intent.client_secret : ((intent.latest_invoice as Stripe.Invoice).payment_intent as Stripe.PaymentIntent).client_secret,
          appearance: {
            theme: 'flat'
          }
        })
        const paymentElement = elements.create('payment')
        paymentElement.mount(element)
      })
    }

    if (intent && step === 'profile') {
      intent = undefined
    }
  }

  let form: HTMLFormElement
  let element: HTMLDivElement
  let message: HTMLDivElement

  async function submit() {
    waiting = true

    const {error} = 'client_secret' in intent
      ? await stripe.processOrder({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: window.location.origin+'/success',
        },
      })
      : await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: window.location.origin+'/success',
        },
      })

    waiting = false

    if (error) {
      message.textContent = error.message
    } else {
      items.set([])
    }
  }
</script>

<section class="grid grid--halves" method="post" transition:fly={{ x: 100 }}>
  <main>
    <button on:click={() => checkout = false} class="button--none"><u>Retour</u></button>
    <OrderItems compact bind:originals bind:discounts />
    <hr>

    <nav class="flex flex--middle flex--tight">
      <button class="button--none" class:active={step === 'profile'} on:click={() => step = 'profile'}>Profil</button>
      <!-- <button class="button--none" class:active={step === 'address'}>Adresse</button> -->
      <button class="button--none" class:active={step === 'payment'} disabled={!$me} on:click={() => step = 'payment'}>Paiement</button>
    </nav>

    {#if step === 'profile'}
    <Account on:click={() => step = 'payment'} />
    {:else if step === 'payment'}
    <form bind:this={form} on:submit|preventDefault={submit} id="payment-form">
      <div id="payment-element" bind:this={element}>
        Un instant...
      </div><br>
      <button class="button--dark" id="submit" disabled={!elements || waiting}>{#if waiting}Un instant...{:else}Placer la commande{/if}</button>
      <div id="error-message" bind:this={message}>
      </div>
    </form>
    {/if}
  </main>

  <aside>
    <div>
      <h3>Détails</h3>
    </div>
    <div class="dark">
      <h6>Livraison</h6>
      {#if $kiosk}
      <h5>{$kiosk.name}</h5>
      <small>{DateTime.now().set({ weekday: 4 }).plus({ days: 14 }).setLocale('fr').toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' })}</small><br>
      <small><a href="https://www.google.ca/maps/place/{encodeURIComponent($kiosk.address)}" target="_blank"><u>{$kiosk.address}</u></a></small>
      {/if}
    </div>
    
    <div>
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
    </div>
  </aside>
</section>

<style lang="scss">
  section {
    background-color: var(--light);
    border-left: 3px solid;
    font-size: var(--step-0);

    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    min-height: 100%;

    @media (max-width: 888px) {
      // padding-top: var(--step-1);
      grid-template-columns: 1fr;
    }
  }

  main {
    position: relative;
    padding: var(--step-0);

    > button {
      position: absolute;
      top: var(--step-0);
      right: 0;

      @media (max-width: 888px) {
        right: var(--step-2);
      }
    }

    > nav {
      margin-bottom: var(--step-1);

      button {
        opacity: 0.5;

        &.active,
        &:hover,
        &:focus {
          opacity: 1;
        }
      }
    }

    form {
    }
  }

  aside {
    min-height: 100%;
    background-color: var(--grey);

    > div {
      padding: var(--step-0);

      h3:last-child {
        font-family: var(--logofont);
        margin-bottom: 0;
      }

      &.dark {
        color: var(--light);
        background-color: var(--dark);
      }
    }

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