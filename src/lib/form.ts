export async function formData<T = { [k: string]: any }>(request: Request) {
	const formData = await request.formData()
	const data = {} as T
  formData.forEach((d: any, k: string) => data[k] = d )
  return data
}