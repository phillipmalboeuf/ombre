import { writable } from 'svelte/store'

export let bar = writable<boolean>(false)
export let items = writable<{
  id: string
  product: string
  size: number
  quantity: number
}[]>([])

export let interval = writable<string>('one-time')