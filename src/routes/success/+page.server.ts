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
  // console.log(me)

  return {
    // me: locals.customer
  }
}