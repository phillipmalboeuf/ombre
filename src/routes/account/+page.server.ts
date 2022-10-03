import { error, redirect, type Actions } from '@sveltejs/kit'

import { query } from '$lib/clients/payload'
import type { Customer, Product } from '$lib/payload-types'
import type { PageServerLoad } from '.svelte-kit/types/src/routes/account/$types'
import { TOKEN_KEY } from '$env/static/private'
import { formData } from '$lib/form'

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

  if (!locals.token) {
    throw redirect(307, '/account/login')
  }

  // const me = JSON.parse(Buffer.from(locals.token.split('.')[1], 'base64').toString())
  // console.log(me)

  return {
    me: locals.customer
  }
}

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const { email, password } = await formData(request)

    const login = await query<{ loginCustomer: { user : Customer, token: string, exp: number }}>(fetch, `
        mutation($email: String!, $password: String!) {
          loginCustomer(email: $email, password: $password) {
            user {
              email
              name
            }
            exp
            token
          }
        }
      `, { email, password })
      
    if (login.errors) {
      throw error(403, login.errors[0].message)
    }

    cookies.set(TOKEN_KEY, login.data.loginCustomer.token, {
      path: '/',
      expires: new Date(login.data.loginCustomer.exp * 1000)
    })

    // setHeaders({
    //   'set-cookie': serialize(TOKEN_KEY, login.data.loginCustomer.token, {
    //     httpOnly: true,
    //     path: '/',
    //     expires: new Date(login.data.loginCustomer.exp * 1000)
    //   })
    // })

    // return {
    //   location: '/account'
    // }
  },
	logout: async ({ cookies, locals }) => {
    const res = (await query<{ meCustomer: { user : Customer }}>(fetch, `
      mutation {
        logoutCustomer
      }
    `, {}, locals.token))

		cookies.delete(TOKEN_KEY, {
      path: '/',
    })
	}
}