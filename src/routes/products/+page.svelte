<script lang="ts">
	import Products from '$lib/components/Products.svelte'
  import type { PageData } from './$types'

	export let data: PageData
</script>

<svelte:head>
	<title>Produits</title>
</svelte:head>

<section class="padded">
	<h2>Produits</h2>
  <Products products={data.products.docs} />
</section>

<style>
</style>