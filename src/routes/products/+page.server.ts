import type { PageServerLoad } from '.svelte-kit/types/src/routes/products/$types'
import { error } from '@sveltejs/kit'

import { query } from '$lib/clients/payload'
import type { Bundle, Collection, Product } from '$lib/payload-types'
import { PUBLIC_API_URL } from '$env/static/public'
import { api } from '$lib/clients/payload'

export const load: PageServerLoad = async ({ locals, url }) => {
  const [collections, products, bundles] = await Promise.all([
    await api<{ docs: Collection[] }>(`collections?depth=0&sort=createdAt`),
    await api<{ docs: Product[] }>(`products?limit=100`),
    await api<{ docs: Bundle[] }>(`bundles?limit=100`)
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