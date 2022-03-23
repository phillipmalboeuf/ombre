<script context="module" lang="ts">
	export const prerender = true


	import type { Load } from '@sveltejs/kit'
  export const load: Load = async ({ fetch, params }) => {
		return {
			props: await (await fetch(`/ps/${params.id}.json`)).json()
		}
	}
</script>

<script lang="ts">
	import type { furniture } from '@prisma/client'
	export let product: furniture
</script>

<svelte:head>
	<title>Products</title>
</svelte:head>

<section class="padded">
	<h1>{product.id}</h1>
</section>

<style>
</style>
