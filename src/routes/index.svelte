<script context="module" lang="ts">
	export const prerender = true


	import type { Load } from '@sveltejs/kit'
  export const load: Load = async ({ fetch, params }) => {
		return {
			props: await (await fetch('/products.json')).json()
		}
	}
</script>

<script lang="ts">
	import Products from '$lib/components/Products.svelte'
	import type { Product } from '@prisma/client'
	export let products: Product[]
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section class="padded">
	<h1>Title</h1>
	<Products {products} />
</section>

<style>
</style>
