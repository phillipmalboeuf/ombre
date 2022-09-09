import { stripe } from '$lib/clients/stripe'
// import { randomPassword } from '$lib/encryption'
import type { Action } from '@sveltejs/kit'

export const POST: Action = async ({ request, url, locals }) => {

  // const data = await request.formData()

  const session = await stripe.billingPortal.sessions.create({
    customer: locals.customer.payment_provider_id,
    return_url: `${url.origin}/account`,
  });

  console.log(session)
 
  if (session.url) {
    return {
      location: session.url
    }
  }
}

