import type { PageServerLoad } from '.svelte-kit/types/src/routes/products/$types'
import { error } from '@sveltejs/kit'

import { query } from '$lib/clients/payload'
import type { Bundle, Collection, Product } from '$lib/payload-types'
import { PUBLIC_API_URL } from '$env/static/public'

export const load: PageServerLoad = async ({ locals, url }) => {
  const [collections, products, bundles] = await Promise.all([
    await (await fetch(`${PUBLIC_API_URL}/collections?depth=0&sort=createdAt`)).json() as { docs: Collection[] },
    await (await fetch(`${PUBLIC_API_URL}/products`)).json() as { docs: Product[] },
    await (await fetch(`${PUBLIC_API_URL}/bundles`)).json() as { docs: Bundle[] }
  ])

  return {
    collections,
    products: products.docs.reduce((c, product) => {
      return {
        ...c,
        [product.id]: product
      }
    }, {}),
    bundles: bundles.docs.reduce((c, bundle) => {
      return {
        ...c,
        [bundle.id]: bundle
      }
    }, {})
  }
}