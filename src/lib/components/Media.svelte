<script lang="ts">
  import type { Upload } from '$lib/payload-types'
  import Rich from './Rich.svelte'

  export let media: string | Upload
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
{#if typeof media !== 'string'}
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
<!-- {JSON.stringify(media, null, 2)} -->
<picture>
  {#if small}
  <source srcSet="{cdn(media.url)}?width=400{ar ? `&aspect_ratio=400:${Math.round(ar * 400) + 2}` : ''}" media="(max-width: 900px)" />
  <source srcSet="{cdn(media.url)}?width=600{ar ? `&aspect_ratio=600:${Math.round(ar * 600) + 2}` : ''}" media="(max-width: 1200px)" />
  <img src="{cdn(media.url)}?width=800{ar ? `&aspect_ratio=800:${Math.round(ar * 800) + 2}` : ''}"
    style={ar ? `aspect-ratio: 800 / ${Math.round(ar * 800) + 2}` : ''}
    alt="{media.title}" loading={eager ? "eager" : "lazy"} />
  {:else}
  <source srcSet="{cdn(media.url)}?width=900{ar ? `&aspect_ratio=900:${Math.round(ar * 900) + 2}` : ''}" media="(max-width: 900px)" />
  <source srcSet="{cdn(media.url)}?width=1200{ar ? `&aspect_ratio=1200:${Math.round(ar * 1200) + 2}` : ''}" media="(max-width: 1200px)" />
  <img src="{cdn(media.url)}?width=1800{ar ? `&aspect_ratio=1800:${Math.round(ar * 1800) + 2}` : ''}"
    style={ar ? `aspect-ratio: 1800 / ${Math.round(ar * 1800) + 2}` : ''}
    alt="{media.title}" loading={eager ? "eager" : "lazy"} />
  {/if}
</picture>

{#if !noDescription && media.caption}
<small><Rich text={media.caption} /></small>
{/if}
{/if}
{:else}
<picture>
  <img src="{cdn(media)}?width=100{ar ? `&aspect_ratio=100:${Math.round(ar * 100)}` : ''}"
    style={ar ? `aspect-ratio: 100 / ${Math.round(ar * 100)}` : ''}
    alt="" loading={eager ? "eager" : "lazy"} />
</picture>
{/if}
{/if}