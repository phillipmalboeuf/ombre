<script lang="ts">
	import Form from '$lib/components/Form.svelte'
	// import Products from '$lib/components/Products.svelte'

	// export let products: any[]

	import { getContext } from 'svelte'
  let content = getContext<any>('content')
</script>

<svelte:head>
	<title>{content.title}</title>
</svelte:head>

<section class="padded grid grid--full">
	{#each content.index as section, i}
	<section id={section.id}>
		{#if section.title}{#if i === 0}<h1 class="h3">{section.title}</h1>{:else}<h3 class={section.products && "h1"}>{section.title}</h3>{/if}{/if}
		{#if section.image}
		<figure>
			<picture>
				<img src={section.image} alt="">
			</picture>
		</figure>
		{/if}
		{#if section.text}
		{#each section.text as text}<p>{text}</p>{/each}
		{/if}
		{#if section.products}
		<ul class="--nostyle">
			{#each section.products as product}
			<li class="flex">
				<figure>
					<img src={product.image} alt="">
				</figure>
				<div>
					<h4>{product.title}</h4>
					<p>{product.text}</p>
				</div>
			</li>
			{/each}
		</ul>
		{/if}
	</section>
	{/each}

	<section id="support">
		<h3 class="h1">{content.support.title}</h3>
		
		<Form />
	</section>
	<!-- <Products {products} />
	<form action="/stripe/manage" method="post">
    <button type="submit">Manage</button>
  </form> -->
</section>

<style lang="scss">

	li {
		img {
			width: var(--step-1);
		}

		div > p {
			margin-bottom: 0;
		}
	}
</style>
