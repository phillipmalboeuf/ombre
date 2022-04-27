import { prisma } from '$lib/clients/prisma'
import { stripe } from '$lib/clients/stripe'
import { randomPassword } from '$lib/encryption'
import { v4 as uuid } from '@lukeed/uuid'
import type { RequestHandler } from '@sveltejs/kit'

export const post: RequestHandler<{}, {}> = async ({ request, url }) => {

  const formData = await request.formData()

  let data: any = {}
  formData.forEach((d, k) => data[k] = d)
  const { amount, interval, email, consent } = data

  const stripeProduct = await stripe.products.retrieve('support').catch(e => stripe.products.create({
    id: 'support',
    name: 'Support'
  }))

  const today = new Date()
  const id = `support_${today.getFullYear()}_${today.getMonth()}_${randomPassword(3)}`

  const session = await stripe.checkout.sessions.create({
    client_reference_id: id,
    customer_email: email,
    ...interval === 'one-time'
      ? {
        mode: 'payment',
        customer_creation: 'always',
        payment_intent_data: {
          metadata: {
            id,
            consent
          },
        },
      }
      : {
        mode: 'subscription',
        subscription_data: {
          metadata: {
            id,
            consent
          },
        },
      },
    line_items: [
      {
        price_data: {
          unit_amount: amount * 100,
          currency: 'CAD',
          product: stripeProduct.id,
          ...interval !== 'one-time' && {
            recurring: {
              interval,
              interval_count: 1
            }
          }
        },
        quantity: 1,
      },
    ],
    success_url: `${url.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${url.origin}/`,
    locale: url.hostname === 'gloomycreek.com' ? 'en' : 'fr-CA'
  })

  console.log(session)
 
  return {
    status: 301,
    headers: {
      location: session.url
    }
  }
}