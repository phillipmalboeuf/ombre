import { stripe } from '$lib/clients/stripe'
import { randomPassword } from '$lib/encryption'
import type { Action } from '@sveltejs/kit'

export const POST: Action = async ({ request, url }) => {

  const data = await request.formData()

  console.log(url)

  const stripeProduct = await stripe.products.retrieve('melisse-2022')
    .catch(e => stripe.products.create({
      id: 'melisse-2022',
      name: 'Mélisse'
    }))

  const today = new Date()
  const id = `${today.getFullYear()}_${today.getMonth()}_${randomPassword(3)}`

  const session = await stripe.checkout.sessions.create({
    client_reference_id: id,
    // mode: 'subscription',
    // line_items: [
    //   {
    //     price_data: {
    //       unit_amount: 1000,
    //       currency: 'CAD',
    //       recurring: {
    //         interval: 'month',
    //         interval_count: 1
    //       },
    //       product_data: {
    //         name: 'Support'
    //       }
    //     },
    //     quantity: 1,
    //   },
    // ],
    mode: 'payment',
    allow_promotion_codes: true,
    automatic_tax: {
      enabled: true
    },
    payment_intent_data: {
      metadata: {
        id
      },
    },
    // consent_collection: {
    //   promotions: 'auto'
    // },
    customer_creation: 'always',
    line_items: [
      {
        price_data: {
          unit_amount: 2000,
          currency: 'CAD',
          product: stripeProduct.id,
          tax_behavior: 'inclusive'
          // product_data: {
          //   name: 'Mélisse',
          // }
        },
        quantity: 1,
      },
    ],
    shipping_address_collection: {
      allowed_countries: ['CA']
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Shipping',
          type: 'fixed_amount',
          fixed_amount: {
            amount: 10,
            currency: 'CAD'
          },
          tax_behavior: 'inclusive'
        }
      },
      {
        shipping_rate_data: {
          display_name: 'Pick up',
          type: 'fixed_amount',
          fixed_amount: {
            amount: 10,
            currency: 'CAD'
          },
          tax_behavior: 'inclusive'
        }
      }
    ],
    success_url: `${url.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${url.origin}/`,
  })

  console.log(session)
 
  if (session.url) {
    return {
      location: session.url
    }
  }
}

