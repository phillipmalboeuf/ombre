import { stripe } from '$lib/clients/stripe'
import { randomPassword } from '$lib/encryption'
import { json, type Action, type RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, url }) => {

  const data = await request.json()
  console.log(data)

  const today = new Date()
  const id = `${today.getFullYear()}_${today.getMonth()}_${randomPassword(3)}`

  const session = await stripe.paymentIntents.create({
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
    amount: data.total * 100,
    currency: 'CAD',
    payment_method_types: ['card', 'acss_debit'],
    payment_method_options: {
      acss_debit: {
        mandate_options: {
          payment_schedule: 'combined',
          interval_description: 'when any invoice becomes due',
          transaction_type: 'personal',
        },
      },
    },
    metadata: {
      id
    },
  })

  console.log(session)
 
  if (session) {
    return json(session)
  }
}

