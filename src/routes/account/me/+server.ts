import { json, type Action, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ request, url, locals }) => {
  return json(locals.customer)
}