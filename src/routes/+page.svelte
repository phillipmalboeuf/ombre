<script lang="ts">
	import Form from '$lib/components/Form.svelte'
  import Media from '$lib/components/Media.svelte'
  import Rich from '$lib/components/Rich.svelte'
  import Slider from '$lib/components/Slider.svelte'
	import type { PageData } from './$types'

  export let data: PageData
</script>

<svelte:head>
	<title>{data.page.title}</title>
</svelte:head>

<section class="padded grid grid--full">
	{#each data.page.content as section, i}
	<section id={section.id}>
		{#if section.title}{#if i === 0}<h1 class="h1">{section.title}</h1>{:else}<h3>{section.title}</h3>{/if}{/if}
    {#if section.blockType === 'Text'}
		{#if section.media}
		<figure>
			<Media media={section.media} />
		</figure>
		{/if}
    <Rich text={section.text} />
		{:else if section.blockType === 'Button'}
		<center>
			<a href={section.link} class="button button--dark">{section.cta}</a>
		</center>
		{:else if section.blockType === 'Slider'}
		<Slider particlesToShow={1} arrows={false} autoplay>
      {#each section.slides as slide}
      <figure>
				<!-- {JSON.stringify(slide, null, 2)} -->
        <Media media={slide.upload} ar={0.66} />
      </figure>
      {/each}
    </Slider>
    {/if}
  </section>
	{/each}

	<!-- {#each content.index as section, i}
	<section id={section.id}>
		{#if section.title}{#if i === 0}<h1 class="h1">{section.title}</h1>{:else}<h3 class={section.products && "h3"}>{section.title}</h3>{/if}{/if}
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
				{#if product.image}
				<figure>
					<img src={product.image} alt="">
				</figure>
				{/if}
				<div>
					<h4>{product.title}</h4>
					<p>{product.text}</p>
				</div>
			</li>
			{/each}
		</ul>
		{/if}
		{#if section.button}
		<center>
			<a href={section.button.link} class="button button--dark">{section.button.label}</a>
		</center>
		{/if}
	</section>
	{/each} -->

	<!-- <section id="support">
		<h3 class="h1">{content.support.title}</h3>
		
		<Form />
	</section> -->
	<!-- <Products {products} />
	<form action="/stripe/manage" method="post">
    <button type="submit">Manage</button>
  </form> -->
</section>

<style lang="scss">

	li {
		img {
			width: var(--step-1);
			object-fit: cover;
		}

		div > p {
			margin-bottom: 0;
		}
	}
</style>
