<script lang="ts">
	import Products from '$lib/components/Products.svelte'
  import type { PageData } from './$types'

	export let data: PageData
	console.log(JSON.stringify(data.products, null, 2))
</script>

<svelte:head>
	<title>Products</title>
</svelte:head>

<section class="padded">
	<h1>Products</h1>
  <Products products={data.products.docs} />
</section>

<style>
</style>