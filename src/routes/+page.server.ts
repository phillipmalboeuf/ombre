import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { PUBLIC_API_URL } from '$env/static/public'
import { api } from '$lib/clients/payload'
import type { ContentPage } from '$lib/payload-types'

export const load: PageServerLoad = async ({ locals, url, params }) => {
  const page = await api<ContentPage>(`content_pages/pousse-poulin`)

  if (page.errors) {
    throw error(404, page.errors.map(e => e.message).join(' \n '))
  }

  return {
    page
  }  
}