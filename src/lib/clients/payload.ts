export async function query<T = any>(fetch: Function, query: string, variables: {[key:string]: any} = {}): Promise<{ data: T, errors: { message: string }[] }> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/graphql`, {
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