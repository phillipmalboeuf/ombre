<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit'
  export const load: Load = async ({ fetch, params }) => {
		return {
			props: await (await fetch('/products.json')).json()
		}
	}
</script>

<script lang="ts">
	import Products from '$lib/components/Products.svelte'
	import type { Product } from 'src/payload-types';
	export let products: { docs: Product[] }

	console.log(products)
</script>

<svelte:head>
	<title>Products</title>
</svelte:head>

<section class="padded">
	<h1>Products</h1>
  <Products products={products.docs} />
</section>

<style>
</style>
