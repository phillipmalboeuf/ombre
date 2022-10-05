import { browser } from '$app/environment'
import { PUBLIC_API_URL } from '$env/static/public'
import { writable, readable } from 'svelte/store'
import { query } from './clients/payload'
import type { Customer, Kiosk, Perk } from './payload-types'

export let me = writable<Customer>(undefined, set => {
  if (browser) {
    fetch(`/account/me`, {
      credentials: 'include'
    }).then(async response => {
      set((await response.json()))
    })
  }

  return () => undefined
})

export let bar = writable<boolean>(false)
export let items = writable<({
  id: string
  product: string
  unit: string
  size: number
  quantity: number
} | {
  id: string
  bundle: string
  quantity: number
  products: {
    id: string
    product: string
    unit: string
    size: number
    quantity: number
  }[]
})[]>([])

export let interval = writable<string>('one-time')
export let kiosk = writable<Kiosk>()

export let perks = readable<Perk[]>(undefined, set => {
  fetch(`${PUBLIC_API_URL}/perks?where[status][equals]=published`).then(async response => {
    set((await response.json()).docs)
  })

  return () => undefined
})