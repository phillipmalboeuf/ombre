import { prisma } from '$lib/clients/prisma'
import { stripe } from '$lib/clients/stripe'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler<{ id: string }, {}> = async ({ params, url }) => {

  const session = await stripe.checkout.sessions.retrieve(params.id)

  console.log(session)
 
  return {
    body: {
      session
    }
  }
}