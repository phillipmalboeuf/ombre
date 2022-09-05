<script context="module" lang="ts">
	import { query } from '$lib/clients/payload'
	import type { Load } from '@sveltejs/kit'
  export const load: Load = async ({ fetch, params }) => {
		return {
			props: {
				products: (await query(fetch, `
					query {
						Products {
							docs {
								id
								title
								price
								unit
								sizes {
									id
									size
									title
								}
							}
						}
					}
				`)).data.Products
			}
		}
	}
</script>

<script lang="ts">
	import Products from '$lib/components/Products.svelte'
	import type { Product } from 'src/payload-types'

	export let products: { docs: Product[] }
	console.log(JSON.stringify(products, null, 2))
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
