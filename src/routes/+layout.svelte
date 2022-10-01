<script lang="ts">
	import '../app.scss';
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Wip from '$lib/components/WIP.svelte'

	import { onMount, setContext } from 'svelte'
	import type { LayoutData } from '.svelte-kit/types/src/routes/$types'

	export let data: LayoutData
	setContext('content', data.content)
</script>

<Header />

<center>
	<a href="/" class="flex flex--bottom flex--tight"><img src="https://gloomy.b-cdn.net/uploads/poussepoulin_logo-removebg-preview.png" alt="Logo"/> <h2>{data.content.title}</h2></a>
</center>

<main>
	<slot />
</main>

<Footer />
<Wip />

<style lang="scss">
	main {
		min-height: calc(var(--vh) - var(--step-5) - var(--step--1));
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
			max-width: var(--step-4);
			text-transform: uppercase;
			text-align: left;
			line-height: 1;

			h2 {
				margin-bottom: 0;
			}

			img {
				max-width: var(--step-2);
			}
		}
	}
</style>
