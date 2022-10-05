<script lang="ts">
  import { onMount } from 'svelte'
  import { PUBLIC_API_URL } from '$env/static/public'
  import type { Kiosk, Product } from '$lib/payload-types'
  import { kiosk } from '$lib/stores'

  let kiosks: {docs: Kiosk[]}
  let value: string

  onMount(async () => {
    kiosks = await (await fetch(`${PUBLIC_API_URL}/kiosks?sort=-name`)).json()
    if (!$kiosk) {
      kiosk.set(kiosks.docs[0])
    }
    value = $kiosk.id
  })

  $: value && kiosk.set(kiosks.docs.find(d => d.id === value))
</script>

<select bind:value name="kiosk" id="kiosk">
{#if kiosks}
{#each kiosks.docs as kiosk}
<option value={kiosk.id}>{kiosk.name}</option>
{/each}
{/if}
</select>