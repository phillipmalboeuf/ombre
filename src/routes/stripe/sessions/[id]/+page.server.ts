import { stripe } from '$lib/clients/stripe'
import type { PageServerLoad } from '.svelte-kit/types/src/routes/stripe/sessions/[id]/$types'
import { error } from '@sveltejs/kit'


export const load: PageServerLoad = async ({ locals, params, url }) => {
  const session = await stripe.checkout.sessions.retrieve(params.id)

  return {
    session
  }
}