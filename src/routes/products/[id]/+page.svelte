<script lang="ts">
  import type { PageData } from './$types'
  import Rich from '$lib/components/Rich.svelte'
  import AddToOrder from '$lib/components/AddToOrder.svelte'
  import Slider from '$lib/components/Slider.svelte'
  import Media from '$lib/components/Media.svelte'

	export let data: PageData
  const { product } = data
</script>

<svelte:head>
	<title>{product.title}</title>
</svelte:head>

<nav class="padded">
  <a href="/products"><u>Retour au produits</u></a>
</nav>
<section class="padded grid grid--halves">
  <aside>
    <Slider particlesToShow={1} arrows={false} thumbnails={[product.thumbnail, ...product.uploads ? product.uploads.map(upload => upload.upload) : []]}>
      {#each [product.thumbnail, ...product.uploads ? product.uploads.map(upload => upload.upload) : []] as media}
      <figure>
        <Media {media} ar={1} />
      </figure>
      {/each}
    </Slider>
  </aside>
  <article>
    <h2>{product.title}</h2>
    <AddToOrder {product} />
    <br>
    <Rich text={product.description} />
  </article>
</section>

<style>
</style>