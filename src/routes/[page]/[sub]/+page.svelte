<script lang="ts">
    import { page } from '$app/stores';
  import Content from '$lib/components/Content.svelte'
  import Media from '$lib/components/Media.svelte'
  import Rich from '$lib/components/Rich.svelte'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<section>
	<h4><a href="/{$page.params.page}"><u>Retour</u></a></h4>
  <h1>{data.page.title}</h1>

  <Content content={data.page.content} />
</section>

<style lang="scss">
</style>