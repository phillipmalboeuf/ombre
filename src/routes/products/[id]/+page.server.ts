import type { PageServerLoad } from '.svelte-kit/types/src/routes/products/[id]/$types'
import { error } from '@sveltejs/kit'

import { query } from '$lib/clients/payload'
import type { Bundle, Product } from '$lib/payload-types'
import { PUBLIC_API_URL } from '$env/static/public'

export const load: PageServerLoad = async ({ locals, url, params: { id } }) => {
  let product: Product | Bundle = await (await fetch(`${PUBLIC_API_URL}/products/${id}`)).json() as Product
  
  if (!product?.id) {
    product = await (await fetch(`${PUBLIC_API_URL}/bundles/${id}`)).json() as Bundle
  }

  return {
    product
  }
}