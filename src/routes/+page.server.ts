import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { PUBLIC_API_URL } from '$env/static/public'

export const load: PageServerLoad = async ({ locals, url, params }) => {
  const page = await (await fetch(`${PUBLIC_API_URL}/content_pages/pousse-poulin`)).json()

  if (page.errors) {
    throw error(404, page.errors.map(e => e.message).join(' \n '))
  }

  return {
    page
  }  
}