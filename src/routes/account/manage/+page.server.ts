import { error, redirect, type Actions } from '@sveltejs/kit'

import { query } from '$lib/clients/payload'
import type { Customer, Order, Product, Subscription } from '$lib/payload-types'
import type { PageServerLoad } from '.svelte-kit/types/src/routes/account/$types'
import { TOKEN_KEY } from '$env/static/private'
import { formData } from '$lib/form'
import { randomPassword } from '$lib/encryption'
import { PUBLIC_API_URL } from '$env/static/public'

export const load: PageServerLoad = async ({ url, locals, request }) => {

  if (!locals.token) {
    throw redirect(307, '/account')
  }

  const [orders, subscriptions] = await Promise.all([
    (await (await fetch(`${PUBLIC_API_URL}/orders?where[placed_by.value][equals]=${locals.customer.id}`)).json()).docs as Order[],
    (await (await fetch(`${PUBLIC_API_URL}/subscriptions?where[placed_by.value][equals]=${locals.customer.id}`)).json()).docs as Subscription[],
  ])

  return {
    me: locals.customer,
    orders,
    subscriptions
  }
}

export const actions: Actions = {
}