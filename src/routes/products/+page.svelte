<script lang="ts">
  import Plans from '$lib/components/Plans.svelte'
	import Products from '$lib/components/Products.svelte'
  import type { PageData } from './$types'

	export let data: PageData
</script>

<svelte:head>
	<title>Produits</title>
</svelte:head>

<section class="padded">
	<Plans /><br>
	{#each data.collections.docs as collection}
	<h2>{collection.title}</h2>
  <Products products={collection.products.map(product => typeof product.value === 'string'
		? (data.products[product.value] || data.bundles[product.value])
		: product.value)} />
	{/each}
</section>

<style>
</style>