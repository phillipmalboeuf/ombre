<script lang="ts">
  import Rich from '$lib/components/Rich.svelte'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<section>
  <h1>{data.page.title}</h1>

  {#each data.page.content as section, i}
	<section id={section.id}>
		{#if section.title}{#if i === 0}<h1 class="h3">{section.title}</h1>{:else}<h3>{section.title}</h3>{/if}{/if}
    {#if section.blockType === 'Text'}
    <Rich text={section.text} />
    {/if}
		<!-- {#if section.image}
		<figure>
			<picture>
				<img src={section.image} alt="">
			</picture>
		</figure>
		{/if} -->
		<!-- {#if section.}
		{#each section.text as text}<p>{text}</p>{/each}
		{/if} -->
		<!-- {#if section.products}
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
		{/if} -->
  </section>
	{/each}
</section>

<style lang="scss">
	section {
		width: 100%;
		max-width: var(--step-7);
		margin: 0 auto;
	}

	// li {
	// 	img {
	// 		width: var(--step-1);
	// 	}

	// 	div > p {
	// 		margin-bottom: 0;
	// 	}
	// }
</style>