import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<{ id: string }, {}> = async ({ request, params: { id } }) => {

  const products = await fetch(`${import.meta.env.VITE_API_URL}/products`)
 
  return {
    body: {
      products: await products.json()
    }
  }
}