import { error, redirect, type Actions } from '@sveltejs/kit'

import { query } from '$lib/clients/payload'
import type { Customer, Product } from '$lib/payload-types'
import type { PageServerLoad } from '.svelte-kit/types/src/routes/account/$types'
import { TOKEN_KEY } from '$env/static/private'
import { formData } from '$lib/form'
import { randomPassword } from '$lib/encryption'

export const load: PageServerLoad = async ({ url, locals, request }) => {
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

  // if (!locals.token) {
  //   throw redirect(307, '/account/login')
  // }

  // const me = JSON.parse(Buffer.from(locals.token.split('.')[1], 'base64').toString())
  // console.log(me)

  return {
    // me: locals.customer
  }
}

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const { kiosk, email, shipping_address } = await formData(request)

    const today = new Date()
    const id = `${today.getFullYear()}_${today.getMonth()}_${randomPassword(3)}`
    const password = randomPassword(6)

    const customer = await query<{ createCustomer: { email: string, password: string }}>(fetch, `
        mutation($id: String!, $email: String!, $password: String!, $kiosk: String!, $shipping_address: String!) {
          createCustomer(data: { id: $id, email: $email, password: $password, accepts_notices: true, kiosk: $kiosk, shipping_address: $shipping_address }) {
            id
            name
            email
          }
        }
      `, { id, email, password, kiosk, shipping_address })
      
    if (customer.errors) {
      throw error(403, customer.errors[0].message)
    }

    
    // return {
    //   location: '/account'
    // }
  },
}