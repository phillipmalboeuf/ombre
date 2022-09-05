import { error, redirect } from '@sveltejs/kit'

import { query } from '$lib/clients/payload'
import type { Customer, Product } from '$lib/payload-types'
import type { PageServerLoad } from '.svelte-kit/types/src/routes/account/$types'

export const load: PageServerLoad = async ({ url, locals }) => {
  console.log(locals)
  // const me = (await query<{ meCustomer: { user : Customer }}>(fetch, `
  //     query {
  //       meCustomer {
  //         user {
  //           email
  //           name
  //         }
  //         exp
  //       }
  //     }
  //   `, {}, locals.token)).data.meCustomer

  if (!locals.token) {
    throw redirect(307, '/account/login')
  }

  // const me = JSON.parse(Buffer.from(locals.token.split('.')[1], 'base64').toString())
  // console.log(me)

  return {
    me: locals.customer
  }
}