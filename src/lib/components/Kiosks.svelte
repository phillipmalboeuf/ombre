<script lang="ts">
  import { onMount } from 'svelte'
  import { PUBLIC_API_URL } from '$env/static/public'
  import type { Kiosk, Product } from '$lib/payload-types'

  let kiosks: {docs: Kiosk[]}

  onMount(async () => {
    kiosks = await (await fetch(`${PUBLIC_API_URL}/kiosks?sort=-name`)).json()
  })
</script>

<select name="kiosk" id="kiosk">
{#if kiosks}
{#each kiosks.docs as kiosk}
<option value={kiosk.id}>{kiosk.name}</option>
{/each}
{/if}
</select>