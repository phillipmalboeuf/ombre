import { error, redirect, type Actions } from '@sveltejs/kit'

import { query } from '$lib/clients/payload'
import type { Customer, Product } from '$lib/payload-types'
import type { PageServerLoad } from '.svelte-kit/types/src/routes/account/$types'
import { TOKEN_KEY } from '$env/static/private'
import { formData } from '$lib/form'
import { randomPassword } from '$lib/encryption'
import { stripe } from '$lib/clients/stripe'

export const load: PageServerLoad = async ({ url, locals, request }) => {
  // if (!locals.token) {
  //   throw redirect(307, '/account/login')
  // }

  // const me = JSON.parse(Buffer.from(locals.token.split('.')[1], 'base64').toString())
  // console.log(me)

  return {
    // me: locals.customer
  }
}

// export const actions: Actions = {
//   default: async ({ request, cookies }) => {
//     const { customer, kiosk } = await formData(request)

//     const today = new Date()
//     const id = `${today.getFullYear()}_${today.getMonth()}_${randomPassword(3)}`


//     const order = await stripe.orders.create({
//       customer,
//       line_items: [
//         {
//           product_data: {id: 'trinket_club_hat', name: 'Trinket Club hat'},
//           price_data: {unit_amount: 1000},
//           quantity: 3,
//         },
//       ],
//       expand: ['line_items'],
//       currency: 'CAD',
//     })

      
//     // if (customer.errors) {
//     //   throw error(403, customer.errors[0].message)
//     // }

//     throw error(403, 'error')

//     // return {
//     //   location: '/account'
//     // }
//   },
// }