import { PUBLIC_API_URL } from '$env/static/public'
import { writable, readable } from 'svelte/store'
import { query } from './clients/payload'
import type { Perk } from './payload-types'

export let bar = writable<boolean>(false)
export let items = writable<{
  id: string
  product: string
  unit: string
  size: number
  quantity: number
}[]>([])

export let interval = writable<string>('one-time')

export let perks = readable<Perk[]>(undefined, set => {
  fetch(`${PUBLIC_API_URL}/perks`).then(async response => {
    set((await response.json()).docs)
  })

  return () => undefined
})