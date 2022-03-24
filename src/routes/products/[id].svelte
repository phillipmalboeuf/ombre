<script context="module" lang="ts">
	export const prerender = true


	import type { Load } from '@sveltejs/kit'
  export const load: Load = async ({ fetch, params }) => {
		return {
			props: await (await fetch(`/products/${params.id}.json`)).json()
		}
	}
</script>

<script lang="ts">
	import type { Product } from '@prisma/client'
	export let product: Product
</script>

<svelte:head>
	<title>Products</title>
</svelte:head>

<section class="padded">
	<h1>{product.name}</h1>
</section>

<style>
</style>
