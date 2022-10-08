import { error, redirect, type Actions } from '@sveltejs/kit'

import { query } from '$lib/clients/payload'
import type { Customer, Kiosk, Product } from '$lib/payload-types'
import type { PageServerLoad } from '.svelte-kit/types/src/routes/account/$types'
import { TOKEN_KEY } from '$env/static/private'
import { formData } from '$lib/form'
import { randomPassword } from '$lib/encryption'
import { stripe } from '$lib/clients/stripe'
import type Stripe from 'stripe'
import { PUBLIC_API_URL } from '$env/static/public'

export const load: PageServerLoad = async ({ url, locals, request }) => {

  return {
  }
}

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    // const { id, payment_provider_id, customer, total, items, kiosk, payment_method } = await formData(request) as { id: string, payment_provider_id: string, customer: string, kiosk: Kiosk, total: number, payment_method: string, items: {
    //   product: string
    //   size: number
    //   quantity: number
    // }[] }

    // const submit = await stripe.orders.submit(payment_provider_id, {
    //   expected_total: total
    // })

    // const intent = await stripe.paymentIntents.confirm(
    //   (submit.payment.payment_intent as Stripe.PaymentIntent).id,
    //   { payment_method }
    // )

    // const order = await fetch(`${PUBLIC_API_URL}/orders`, {
    //   method: 'post',
    //   body: JSON.stringify({
    //     id,
    //     payment_provider_id: submit.id,
    //     placed_by: customer,
    //     line_items: items.map(({ product, size, quantity }) => ({ product, size, quantity })),
    //     kiosk
    //   }),
    //   headers: {
    //     'content-type': 'application/json'
    //   }
    // })

    // console.log(order)

    throw redirect(307, '/success')
  },
}