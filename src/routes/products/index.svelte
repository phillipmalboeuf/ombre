<script context="module" lang="ts">
	export const prerender = true


	import type { Load } from '@sveltejs/kit'
  export const load: Load = async ({ fetch, params }) => {
		return {
			props: await (await fetch('/ps.json')).json()
		}
	}
</script>

<script lang="ts">
	import Products from '$lib/components/Products.svelte'
  import type { Product } from '@prisma/client'
	export let products: Product[]
</script>

<svelte:head>
	<title>Products</title>
</svelte:head>

<section class="padded">
	<h1>Products</h1>
  <Products {products} />
</section>

<style>
</style>
