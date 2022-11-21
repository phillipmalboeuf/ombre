<script lang="ts">
  import { onMount, tick } from 'svelte'
  import emblaCarouselSvelte, { type EmblaCarouselType } from 'embla-carousel-svelte'
  import AutoHeight from 'embla-carousel-auto-height'
  import AutoPlay from 'embla-carousel-autoplay'
  
  import type { Upload } from '$lib/payload-types'
  import Media from './Media.svelte'
  

  export let autoplay = false
  export let arrows = true
  export let thumbnails: (string | Upload)[] = undefined
  export let particlesToShow: number = undefined

  let embla: EmblaCarouselType 

  function prev() {
    embla.scrollPrev()
  }

  function next() {
    embla.scrollNext()
  }

  function go(i: number) {
    embla.scrollTo(i, false)
  }

  // onMount(() => {
  // })
</script>

<article>
  <div class="embla"
    use:emblaCarouselSvelte={{
      options: {
        loop: true,
        slidesToScroll: particlesToShow > 1 ? 2 : 1
      },
      plugins: [AutoHeight(), AutoPlay({ playOnInit: autoplay })]
    }}
    on:init={event => embla = event.detail}
    style="--width: {100/particlesToShow}%;"
  >
    <div class="embla__container">
      <slot />
    </div>
  </div>

  {#if arrows}
  <center>
    <button on:click={prev} class="button--none arrow arrow--prev">
      Previous
    </button>
    <button on:click={next} class="button--none arrow arrow--next">
      Next
    </button>
  </center>
  {/if}

  {#if thumbnails}
  <nav class="flex">
    {#each thumbnails as thumbnail, i}
    <button on:click={() => go(i)} class="button--none">
      <Media media={thumbnail} ar={1} small />
    </button>
    {/each}
  </nav>
  {/if}
</article>


<style lang="scss">
  article {
    width: 100%;
    overflow-x: hidden;
    cursor: ew-resize;
  }

  .embla {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
    align-items: flex-start;
    transition: height 333ms;

    > :global(li),
    > :global(figure) {
      flex: 0 0 var(--width);
      margin: 0 var(--step--1) var(--step-0);
      
      // @media (max-width: 799px) {
      //   padding: var(--step--1);
      // }
    }
  }

  center {
    margin-top: var(--step-6);
    margin-bottom: var(--step-0);

    button {
      padding: var(--step-0);
      border: none;
      transition: transform 333ms;

      &.arrow--prev {
        :global(svg) {
          transform: rotate(180deg);
        }
      }

      &:hover,
      &:focus {
        transform: translateX(var(--step-0));

        &:first-child {
          transform: translateX(calc(var(--step-0) * -1));
        }
      }
    }
  }

  nav {
    margin: var(--step--1) 0;
    gap: var(--step--2);
    
    button {
      width: var(--step-1);
    }
  }
</style>
