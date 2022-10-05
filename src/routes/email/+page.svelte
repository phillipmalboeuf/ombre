<script lang="ts">
  import { enhance } from '$app/forms'
  import Kiosks from '$lib/components/Kiosks.svelte'
  import type { PageServerData } from './$types'

  // export let data: PageServerData
	let success = false
</script>

{#if success}
<h2>Merci!</h2>
<button class="button--full" on:click={() => success = false}>Inscrire un nouveau client</button>
{:else}
<form method="POST" use:enhance={() => {
  return async ({ result, update }) => {
    if (result.type === 'success') {
      success = true
    }
  }
}}>
  <!-- <label for="name">Nom</label>
  <input type="text" name="name" id="name"> -->

  <label for="email">Adresse courriel</label>
  <input required type="email" name="email" id="email">

  <label class="flex flex--spaced flex--middle" for="kiosk"><span>Point de chute idéal</span></label>
  <Kiosks />

  <label for="shipping_address">Ou, votre code postal</label>
  <input type="text" name="shipping_address" id="shipping_address">
  
  <button class="button--full button--dark" type="submit">S'inscrire</button>
</form>
{/if}

<style lang="scss">
	// section {
	// 	width: 100%;
	// 	max-width: var(--step-7);
	// 	margin: 0 auto;
	// }
</style>