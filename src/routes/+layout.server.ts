import type { LayoutServerLoad } from '.svelte-kit/types/src/routes/$types'
import { error } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const content = url.hostname === 'gloomycreek.com'
    ? (await import("$lib/content/en.json")).default
    : url.hostname === 'rigoleombree.com'
    ?(await import("$lib/content/fr.json")).default
    : (await import("$lib/content/pousse-fr.json")).default

  return {
    content
  }
}