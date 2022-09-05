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

<main>
	<center><a href="/" class="h1">{data.content.title}</a></center>
	<slot />
</main>

<Footer />
<Wip />

<style lang="scss">
	center {
		margin-bottom: var(--step-2);

		@media (max-width: 888px) {
			margin: 0 var(--step--1) var(--step--1);
		}

		a {
			position: relative;
			z-index: 1;
		}
	}
</style>
