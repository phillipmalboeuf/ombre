// import { notion } from '$lib/clients/notion';
import { prisma } from '$lib/clients/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<{ id: string }, {}> = async ({ request, params: { id } }) => {

  const products = await prisma.furniture.findMany({
  })
 
  return {
    body: {
      products
    }
  }
}