<script lang="ts">
  import { page as _page } from '$app/stores'
  import Media from '$lib/components/Media.svelte'
  import Rich from '$lib/components/Rich.svelte'
  import Slider from './Slider.svelte'
  
  import type { ContentPage } from '$lib/payload-types'

  export let content: ContentPage['content']
  export let pages: ContentPage[] = undefined
</script>

{#each content as section, i}
<section id={section.id}>
  {#if 'title' in section && section.title}{#if i === 0}<h1>{section.title}</h1>{:else}<h3>{section.title}</h3>{/if}{/if}
  {#if 'media' in section && section.media}
  <figure>
    <picture>
      <Media media={section.media} />
    </picture>
  </figure>
  {/if}
  {#if section.blockType === 'Text'}
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
  {:else if section.blockType === 'PagesList'}
  {#if pages}
  <ul class="--nostyle grid grid--thirds">
    {#each section.pages as page, i}
    <li>
      {#if page.thumbnail}
      <a href="/{$_page.params.page}/{page.id}">
      <figure>
        <Media media={page.thumbnail} ar={1} />
      </figure>
      </a>
      {/if}
      <a href="/{$_page.params.page}/{page.id}"><h4>{page.title} <small><u>Plus d'info</u></small></h4></a>
    </li>
    {/each}
  </ul>
  {/if}
  {/if}
</section>
{/each}

<style lang="scss">
	section {
		width: 100%;
		max-width: var(--step-7);
		margin: 0 auto;
	}
</style>