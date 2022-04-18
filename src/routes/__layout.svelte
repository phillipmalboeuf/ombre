<script context="module" lang="ts">

	import type { Load } from '@sveltejs/kit'
  export const load: Load = async ({ fetch, params, url }) => {
		const content = url.hostname === 'gloomycreek.com'
			? (await import("$lib/content/en.json")).default
			: (await import("$lib/content/fr.json")).default

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
	import Wip from '$lib/components/WIP.svelte'

	import { setContext } from 'svelte'

	export let content
	setContext('content', content)
</script>

<Header />

<main>
	<center><a href="/" class="h1">{content.title}</a></center>
	<slot />
</main>

<Footer />
<Wip />

<style lang="scss">
	center {
		margin-bottom: var(--step-2);

		@media (max-width: 888px) {
			margin-bottom: var(--step--1);
		}

		a {
			position: relative;
			z-index: 1;
		}
	}
</style>
