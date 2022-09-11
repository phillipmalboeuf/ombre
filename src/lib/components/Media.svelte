<script lang="ts">
  import type { Upload } from '$lib/payload-types'
  import Rich from './Rich.svelte'

  export let media: Upload
  export let small = false
  export let noDescription = false
  export let ar: number = undefined
  export let eager = false
  export let video: HTMLVideoElement = undefined

  function cdn(url: string) {
    return url.replace('https://images.ctfassets.net/vgc87z7vc7p3', 'https://quebecsolidaire-images.imgix.net')
  }
</script>

<style>
  img,
  video,
  audio {
    display: block;
    width: 100%;
    max-width: 100%;
  }

  small {
    display: block;
    margin-bottom: var(--step-0);
  }

  picture + small {
    margin-top: var(--step--1);
  }

  video {
    background-color: var(--off-noir);
    cursor: pointer;
  }
 
  audio::-webkit-media-controls-enclosure {
    background-color: var(--off-noir);
  }
</style>

{#if media}
{#if media.mimeType?.startsWith('video/')}
<!-- svelte-ignore a11y-media-has-caption -->
<video src="{cdn(media.url)}" controls bind:this={video} autoplay={eager} muted={eager} loop={eager} loading={"lazy"} />
{:else if media.mimeType?.startsWith('audio/')}
{#if !noDescription && media.mimeType}
<small>{media.mimeType}</small>
{/if}
<!-- svelte-ignore a11y-media-has-caption -->
<audio src="{cdn(media.url)}" controls />
{:else}
<picture>
  {#if small}
  <source srcSet="{cdn(media.url)}?auto=compress,format&w=400{ar ? `&h=${Math.round(ar * 400)}&fit=fill` : ''}" media="(max-width: 900px)" />
  <source srcSet="{cdn(media.url)}?auto=compress,format&w=600{ar ? `&h=${Math.round(ar * 600)}&fit=fill` : ''}" media="(max-width: 1200px)" />
  <img src="{cdn(media.url)}?auto=compress,format&w=800{ar ? `&h=${Math.round(ar * 800)}&fit=fill` : ''}"
    style={ar ? `aspect-ratio: 800 / ${Math.round(ar * 800)}` : ''}
    alt="{media.title}" loading={eager ? "eager" : "lazy"} />
    {:else}
  <source srcSet="{cdn(media.url)}?auto=compress,format&w=900{ar ? `&h=${Math.round(ar * 900)}&fit=fill` : ''}" media="(max-width: 900px)" />
  <source srcSet="{cdn(media.url)}?auto=compress,format&w=1200{ar ? `&h=${Math.round(ar * 1200)}&fit=fill` : ''}" media="(max-width: 1200px)" />
  <img src="{cdn(media.url)}?auto=compress,format&w=1800{ar ? `&h=${Math.round(ar * 1800)}&fit=fill` : ''}"
    style={ar ? `aspect-ratio: 1800 / ${Math.round(ar * 1800)}` : ''}
    alt="{media.title}" loading={eager ? "eager" : "lazy"} />
  {/if}
</picture>

{#if !noDescription && media.caption}
<small><Rich text={media.caption} /></small>
{/if}
{/if}
{/if}