import { prisma } from '$lib/clients/prisma'
import { stripe } from '$lib/clients/stripe'
import type { RequestHandler } from '@sveltejs/kit'

export const post: RequestHandler<{}, {}> = async ({ request, url }) => {

  const data = await request.formData()

  const session = await stripe.billingPortal.sessions.create({
    customer: 'cus_LNnGbjdscKHU4n',
    return_url: `${url.origin}/account`,
  });

  console.log(session)
 
  return {
    status: 301,
    headers: {
      location: session.url
    }
  }
}