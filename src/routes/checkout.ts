import { prisma } from '$lib/clients/prisma'
import { stripe } from '$lib/clients/stripe'
import type { RequestHandler } from '@sveltejs/kit'

export const post: RequestHandler<{}, {}> = async ({ request, url }) => {

  const data = await request.formData()

  const product = await prisma.product.findFirst({
    where: {
      id_: data.get('id') as string
    }
  })

  console.log(url)

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [
      {
        price_data: {
          unit_amount: 1000,
          currency: 'CAD',
          recurring: {
            interval: 'month',
            interval_count: 1
          },
          product_data: {
            name: 'Support'
          }
        },
        quantity: 1,
      },
    ],
    success_url: `${url.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${url.origin}/canceled`,
  })

  console.log(session)
 
  return {
    body: {
      product,
      session
    }
  }
}