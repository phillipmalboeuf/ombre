import type { PageServerLoad } from '.svelte-kit/types/src/routes/recettes/$types'
import { error } from '@sveltejs/kit'
import { PUBLIC_API_URL } from '$env/static/public'
import type { ContentPage } from '$lib/payload-types'

export const load: PageServerLoad = async ({ locals, url, params }) => {
  const page = await (await fetch(`${PUBLIC_API_URL}/content_pages/${params.sub}?locale=fr`)).json() as ContentPage
  // const recettes = await (await fetch(`${PUBLIC_API_URL}/content_pages?where[seasons.id][equals]=recettes&locale=fr`)).json() as { docs: ContentPage[] }
  // console.log(page)

  if (page.errors) {
    throw error(404, page.errors.map(e => e.message).join(' \n '))
  }

  return {
    page,
    // recettes
  }
}