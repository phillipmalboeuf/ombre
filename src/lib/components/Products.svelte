<script lang="ts">
  import type { Product } from '$lib/payload-types'
  export let products: Product[]

  import Icon from './Icon.svelte'
  import Media from './Media.svelte'
  import Price from './Price.svelte'
  import Plans from './Plans.svelte'
  import AddToOrder from './AddToOrder.svelte'
  import Slider from './Slider.svelte'
</script>

<Plans />

<ul class="--nostyle grid grid--halves">
{#each products as product}
  <li>
    <Slider particlesToShow={1} arrows={false}>
      {#each [product.thumbnail, ...product.uploads ? product.uploads.map(upload => upload.upload) : []] as media}
      <figure>
        <Media {media} ar={1} />
      </figure>
      {/each}
    </Slider>
    <a href="/products/{product.id}"><h4>{product.title} <small><u>Plus d'info</u></small></h4></a>
    <AddToOrder {product} />
  </li>
{/each}
</ul>

<style lang="scss">
  li :global(.embla) {
    max-width: var(--step-4);
    margin-bottom: var(--step-0);
  }

  h4 {
    margin-bottom: var(--step--2);
  }
</style>