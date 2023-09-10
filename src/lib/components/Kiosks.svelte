<script lang="ts">
  import { onMount } from 'svelte'
  import type { Kiosk, Product } from '$lib/payload-types'
  import { kiosk } from '$lib/stores'
  import { api } from '$lib/clients/payload'

  let kiosks: {docs: Kiosk[]}
  let value: string

  onMount(async () => {
    kiosks = await api<{docs: Kiosk[]}>(`kiosks?sort=-name&limit=50`)
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