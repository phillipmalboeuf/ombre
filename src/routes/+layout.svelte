<script lang="ts">
	import '../app.scss';
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Wip from '$lib/components/WIP.svelte'

	import { setContext } from 'svelte'
	import type { LayoutData } from '.svelte-kit/types/src/routes/$types'

	export let data: LayoutData
	setContext('content', data.content)
</script>

<Header />

<center><a href="/" class="h1">{data.content.title}</a></center>
<main>
	<slot />
</main>

<Footer />
<Wip />

<style lang="scss">
	main {
		min-height: 100vh;
		width: 100%;
		max-width: var(--step-7);
		margin: 0 auto;

		@media (max-width: 888px) {
			
		}
	}

	center {
		padding-top: var(--step--1);
		margin-bottom: var(--step-2);

		@media (max-width: 888px) {
			padding-top: var(--step-3);
			margin: 0 var(--step--1) var(--step--1);
		}

		a {
			position: relative;
			z-index: 1;
		}
	}
</style>
