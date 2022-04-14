<script context="module" lang="ts">


	import type { Load } from '@sveltejs/kit'
  export const load: Load = async ({ fetch, params }) => {
		const content = (await import("$lib/content/fr.json")).default
		return {
			props: {
				content
			}
		}
	}
</script>

<script lang="ts">
	import '../app.scss'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'

	export let content
</script>

<Header />

<main>
	<center><a href="/" class="h1">{content.title}</a></center>
	<slot />
</main>

<Footer />

<style lang="scss">
	center {
		margin-bottom: var(--step-2);

		a {
			position: relative;
			z-index: 1;
		}
	}
</style>
