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
  //   throw redirect(307, '/account')
  // }

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
  create: async ({ request, cookies }) => {

    const { email, password, name } = await formData(request)

    const today = new Date()
    const id = `${today.getFullYear()}_${today.getMonth()}_${randomPassword(3)}`

    const customer = await query<{ createCustomer: { email: string, password: string }}>(fetch, `
        mutation($id: String!, $name: String, $email: String!, $password: String!) {
          createCustomer(data: { id: $id, email: $email, password: $password, name: $name }) {
            id
            name
            email
          }
        }
      `, { id, name, email, password })
      
    if (customer.errors) {
      throw error(403, customer.errors[0].message)
    }

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

    cookies.set(TOKEN_KEY, login.data.loginCustomer.token, {
      path: '/',
      expires: new Date(login.data.loginCustomer.exp * 1000)
    })
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