<script lang="ts">
  import type Stripe from 'stripe'
  import type { Stripe as StripeJS, StripeElements } from '@stripe/stripe-js'
  import { onMount } from 'svelte'
  import { PUBLIC_API_URL, PUBLIC_STRIPE_PK } from '$env/static/public'

  import { money } from '$lib/formatters'
  import { me, items } from '$lib/stores'
  import { crossfade, fade, fly } from 'svelte/transition'
    
  import OrderItems from './OrderItems.svelte'
  import { browser } from '$app/environment'
  import Account from './Account.svelte'

  export let checkout: boolean = true

  export let step: "profile" | "address" | "payment" = "profile"

  let subTotal: number
  let discountTotal: number
  let total: number

  let intent: Stripe.PaymentIntent
  let stripe: StripeJS
  let elements: StripeElements

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

  $: {
    if (browser && form && total && !intent) {
      
      fetch('/stripe/intent', {
        method: 'POST',
        body: JSON.stringify({ total }),
        headers: {
          'content-type': 'application/json'
        }
      }).then(async response => {
        intent = await response.json()

        const { loadStripe } = await import('@stripe/stripe-js/pure')
        stripe = await loadStripe(PUBLIC_STRIPE_PK)

        elements = stripe.elements({
          clientSecret: intent.client_secret,
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
    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: window.location.origin+'/success',
      },
    })

    if (error) {
      message.textContent = error.message
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
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
      </div><br>
      <button class="button--dark" id="submit">Placer la commande</button>
      <div id="error-message" bind:this={message}>
      </div>
    </form>
    {/if}
  </main>

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
  }

  main {
    position: relative;
    padding: var(--step-0);

    > button {
      position: absolute;
      top: var(--step-0);
      right: 0;
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