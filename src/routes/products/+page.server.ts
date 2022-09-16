import type { PageServerLoad } from '.svelte-kit/types/src/routes/products/$types'
import { error } from '@sveltejs/kit'

import { query } from '$lib/clients/payload'
import type { Product } from '$lib/payload-types'

export const load: PageServerLoad = async ({ locals, url }) => {
  const products = (await query<{ Products : { docs: Product[] } }>(fetch, `
      query {
        Products {
          docs {
            id
            title
            price
            unit
            thumbnail {
              title
              caption 
              url
              mimeType
            }
            sizes {
              id
              size
              adjustment
              title
            }
          }
        }
      }
    `)).data.Products

  return {
    products
  }
}