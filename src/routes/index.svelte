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
	import Form from '$lib/components/Form.svelte'
	import Products from '$lib/components/Products.svelte'
	
	import type { Product } from '@prisma/client'
	export let products: Product[]
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section class="padded grid grid--full">
	<section>
		<h1 class="h3">We are making a regenerative permaculture farm rooted in Compton Québec</h1>
		<p>Our belief is that local food resilience, soil and ecosystem health, and our food nutrition is in steep decline. This is our way to learn to fight back.</p>
	</section>
	<figure>
		<picture>
			<img src="/farm.png" alt="">
		</picture>
	</figure>
	<section>
		<h3>It’s a small start</h3>
		<p>Founded by Phil Malboeuf, programmer and permaculturist, it’ll be slow growing, but we’re here to listen, to be different, to find balance, and to make plenty of mistakes.</p>
		<p>Here’s a look at our potential production and keep scrolling to show your support.</p>
	</section>

	<section>
		<h3 class="h1">Products growing</h3>
		<ul class="--nostyle">
			<li>
				<h4>Fruits</h4>
				<p>Apple, Argousier, Blackberry, Citrus, Figs</p>
			</li>
			<li>
				<h4>Herbs</h4>
				<p>Fresh, dried for tea</p>
			</li>
			<li>
				<h4>Hazelnut</h4>
				<p>Butter, oil, flour</p>
			</li>
			<li>
				<h4>Ducks</h4>
				<p>Fresh eggs, conserved meat</p>
			</li>
			<li>
				<h4>Mushrooms</h4>
				<p>Fresh, dried, in oil, growing kits, yeast starters</p>
			</li>
			<li>
				<h4>Solitary bees</h4>
				<p>Mason, Leafcutter</p>
			</li>
			<li>
				<h4>Potted trees</h4>
				<p>Ornamental, dwarf cuttings</p>
			</li>
		</ul>
	</section>

	<section>
		<h3 class="h1">Show your support</h3>
		
		<Form />
	</section>
	<!-- <Products {products} />
	<form action="/manage" method="post">
    <button type="submit">Manage</button>
  </form> -->
</section>

<style>
	section {
		width: 100%;
		max-width: var(--step-7);
		margin: 0 auto;
	}
</style>
