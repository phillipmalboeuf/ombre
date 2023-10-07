<script lang="ts">
  import Plans from '$lib/components/Plans.svelte'
	import Products from '$lib/components/Products.svelte'
  import type { PageData } from './$types'
	import { perk } from '$lib/stores'
    import Rich from '$lib/components/Rich.svelte';

	export let data: PageData
</script>

<svelte:head>
	<title>Produits</title>
</svelte:head>

<section class="padded">
	<aside class="flex flex--spaced">
		<div>
			<Plans />
		</div>
		<form on:submit|preventDefault={e => $perk ? perk.set(undefined) : perk.set(e.currentTarget['perk'].value.toLowerCase())}>
			<label for="perk">Code rabais</label><br>
			{#if $perk}
			{$perk} <button class="button--none" type="submit"><u>Enlever</u></button>
			{:else}
			<input style="width: var(--step-4)" type="text" name="perk" id="perk">
			<button class="button--none" type="submit"><u>Appliquer</u></button>
			{/if}
		</form>
	</aside>
	<br>
	{#each data.collections.docs as collection}
	<h2>{collection.title}</h2>
	{#if collection.description}<Rich text={collection.description} />{/if}
  <Products products={collection.products.map(product => typeof product.value === 'string'
		? (data.products[product.value] || data.bundles[product.value])
		: product.value)} />
	{/each}
</section>

<style lang="scss">
	aside {
		@media (max-width: 888px) {
			padding: var(--step-0);
			flex-direction: column;
		}
	}
</style>