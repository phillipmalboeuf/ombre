import type { PageServerLoad } from '.svelte-kit/types/src/routes/account/create/$types'
import { error, redirect } from '@sveltejs/kit'

import { query } from '$lib/clients/payload'
import type { Customer, Product } from '$lib/payload-types'

// export const load: PageLoad = async ({ }) => {
// }

import type { Action } from '@sveltejs/kit'
import { formData } from '$lib/form'
import { serialize } from 'cookie'
import { TOKEN_KEY } from '$env/static/private'
import { randomPassword } from '$lib/encryption'

export const POST: Action = async ({ request, setHeaders }) => {
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

  setHeaders({
    'set-cookie': serialize(TOKEN_KEY, login.data.loginCustomer.token, {
      httpOnly: true,
      path: '/',
      expires: new Date(login.data.loginCustomer.exp * 1000)
    })
  })

  return {
    location: '/account'
  }
}