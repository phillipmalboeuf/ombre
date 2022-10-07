import { browser } from '$app/environment'
import { PUBLIC_API_URL } from '$env/static/public'
import { writable, readable } from 'svelte/store'
import type { Customer, Kiosk, Perk } from './payload-types'

let params = browser && new URLSearchParams(window.location.search)

export let me = writable<Customer>(undefined, set => {
  if (browser) {
    if (params.has('email') && params.has('password')) {
      const body = new FormData()
      body.set('email', params.get('email').replace(' ', '+'))
      body.set('password', params.get('password').replaceAll(' ', '+'))
      fetch(`/account?/login`, {
        credentials: 'include',
        method: 'POST',
        body,
        headers: {
          'x-sveltekit-action': 'true'
        }
      }).then(async response => {
        fetch(`/account/me`, {
          credentials: 'include'
        }).then(async response => {
          set((await response.json()))
        })
      })
    } else {
      fetch(`/account/me`, {
        credentials: 'include'
      }).then(async response => {
        set((await response.json()))
      })
    }
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
export let perk = writable<string>(browser && params.get('perk'))

export let perks = readable<Perk[]>(undefined, set => {
  fetch(`${PUBLIC_API_URL}/perks?where[status][equals]=published`).then(async response => {
    set((await response.json()).docs)
  })

  return () => undefined
})