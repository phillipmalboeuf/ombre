<script lang="ts">
	import '../app.scss'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
</script>

<Header />

<main>
	<center><a href="/" class="h1">Gloomy Creek</a></center>
	<slot />
</main>

<Footer />

<style>
	center {
		margin-bottom: var(--step-2);
	}
</style>
