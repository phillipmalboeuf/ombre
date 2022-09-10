import { writable } from 'svelte/store'

export let bar = writable<boolean>(false) 
export let items = writable<{
  product: string
  size: number
  quantity: number
}[]>([])