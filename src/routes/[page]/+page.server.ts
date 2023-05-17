import type { PageServerLoad } from '.svelte-kit/types/src/routes/[page]/$types'
import { error } from '@sveltejs/kit'
import { PUBLIC_API_URL } from '$env/static/public'

export const load: PageServerLoad = async ({ locals, url, params }) => {
  const page = await (await fetch(`${PUBLIC_API_URL}/content_pages/${params.page}?locale=fr`)).json() as ContentPage
  // console.log(JSON.stringify(page, null, 2))
  let pages: ContentPage[] = [] 

  // for (let index = 0; index < page.content.length; index++) {
  //   const section = page.content[index]
    
  //   if (section.blockType === 'PagesList') {
  //     pages = [...pages, ...(await (await fetch(`${PUBLIC_API_URL}/content_pages/?depth=0&locale=fr`)).json() as {docs: ContentPage[]}).docs]
  //     console.log(pages)
  //   }
  // }

  if (page.errors) {
    throw error(404, page.errors.map(e => e.message).join(' \n '))
  }

  return {
    page,
    pages
  }  
}