import { error, redirect, type RequestHandler } from '@sveltejs/kit'

import { query } from '$lib/clients/payload'
import type { Customer, Product } from '$lib/payload-types'

// export const load: PageLoad = async ({ }) => {
// }

import type { Action } from '@sveltejs/kit'
import { formData } from '$lib/form'
import { serialize } from 'cookie'
import { TOKEN_KEY } from '$env/static/private'

export const POST: Action = async ({ request, setHeaders }) => {
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