import type { PageServerLoad } from '.svelte-kit/types/src/routes/account/logout/$types'
import { error, redirect } from '@sveltejs/kit'

import { query } from '$lib/clients/payload'
import type { Customer, Product } from '$lib/payload-types'

import { serialize } from 'cookie'
import { TOKEN_KEY } from '$env/static/private'

export const load: PageServerLoad = async ({ locals, setHeaders }) => {
  const logout = (await query<{ meCustomer: { user : Customer }}>(fetch, `
      mutation {
        logoutCustomer
      }
    `, {}, locals.token))
  
  setHeaders({
    'set-cookie': serialize(TOKEN_KEY, '', {
      httpOnly: true,
      path: '/',
      expires: new Date()
    })
  })

  if (!logout.errors) {
    throw redirect(307, '/account/login')
  }
}