import { PUBLIC_API_URL } from '$env/static/public'

export async function query<T = any>(fetch: Function, query: string, variables: {[key:string]: any} = {}): Promise<{ data: T, errors: { message: string }[] }> {
  const res = await fetch(
    `${PUBLIC_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
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
  return json
}