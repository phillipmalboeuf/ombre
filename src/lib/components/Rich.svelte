<script lang="ts">
  export let text: {
    [k: string]: any
  }[]
</script>

{#if text}
{#each text as t}
{#if t.children}
{#if t.type}
{#if t.type === 'h1'}
<h1><svelte:self text={t.children} /></h1>
{:else if t.type === 'h2'}
<h2><svelte:self text={t.children} /></h2>
{:else if t.type === 'h3'}
<h3><svelte:self text={t.children} /></h3>
{:else if t.type === 'h4'}
<h4><svelte:self text={t.children} /></h4>
{:else if t.type === 'h5'}
<h5><svelte:self text={t.children} /></h5>
{:else if t.type === 'h6'}
<h6><svelte:self text={t.children} /></h6>
{:else if t.type === 'quote'}
<blockquote><svelte:self text={t.children} /></blockquote>
{:else if t.type === 'ol'}
<ol><svelte:self text={t.children} /></ol>
{:else if t.type === 'ul'}
<ul><svelte:self text={t.children} /></ul>
{:else if t.type === 'li'}
<li><svelte:self text={t.children} /></li>
{:else if t.type === 'link'}
<a href={t.url} target={true ? "_blank" : "_self"}><svelte:self text={t.children} /></a>
{:else if t.type === 'p'}
<p><svelte:self text={t.children} /></p>
{/if}
{:else}
<p><svelte:self text={t.children} /></p>
{/if}
{:else}

{#if t.bold}
<strong>{t.text}</strong>
{:else if t.italic}
<em>{t.text}</em>
{:else}
{t.text}
{/if}

{/if}
{/each}
{/if}