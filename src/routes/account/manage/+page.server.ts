import { error, redirect, type Action, type Actions } from '@sveltejs/kit'

import { api } from '$lib/clients/payload'
import type { Customer, Order, Product, Subscription } from '$lib/payload-types'
import type { PageServerLoad } from '.svelte-kit/types/src/routes/account/$types'
import { TOKEN_KEY } from '$env/static/private'
import { formData } from '$lib/form'
import { randomPassword } from '$lib/encryption'
import { PUBLIC_API_URL } from '$env/static/public'
import { stripe } from '$lib/clients/stripe'

export const load: PageServerLoad = async ({ url, locals, request }) => {

  if (!locals.token) {
    throw redirect(307, '/account')
  }

  const [orders, subscriptions] = await Promise.all([
    (await api<{docs: Order[]}>(`orders?where[placed_by.value][equals]=${locals.customer.id}`)).docs,
    (await api<{docs: Subscription[]}>(`subscriptions?where[placed_by.value][equals]=${locals.customer.id}&depth=2`)).docs,
  ])

  return {
    me: locals.customer,
    orders,
    subscriptions
  }
}

export const actions: Actions = {
  default: async ({ request: { url }, locals, cookies }) => {
    const session = await stripe.billingPortal.sessions.create({
      locale: 'fr-CA',
      customer: locals.customer.payment_provider_id,
      return_url: url,
    }, {
      stripeAccount: 'acct_1LpynD4IazTmFSzT'
    });
  
    if (session.url) {
      throw redirect(307, session.url)
    }
  }
}