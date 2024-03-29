import { PUBLIC_API_URL } from '$env/static/public'

export async function query<T = any>(f: typeof fetch, query: string, variables: {[key:string]: any} = {}, token: string = undefined): Promise<{ data: T, errors: { message: string }[] }> {
  const res = await f(
    `${PUBLIC_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...token && { 'Authorization': `JWT ${token}` }
    },
    body: JSON.stringify({
      query,
      variables: {
        // preview,
        ...variables
      }
    })
  })

  const json = await res.json()
  console.log(json)
  return json
}