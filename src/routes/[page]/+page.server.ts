import type { PageServerLoad } from '.svelte-kit/types/src/routes/[page]/$types'
import { error } from '@sveltejs/kit'
import { PUBLIC_API_URL } from '$env/static/public'

export const load: PageServerLoad = async ({ locals, url, params }) => {
  const page = await (await fetch(`${PUBLIC_API_URL}/content_pages/${params.page}?locale=fr`)).json()  

  return {
    page
  }
}