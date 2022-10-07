<script lang="ts">
  import { enhance } from '$app/forms'
  import Icon from '$lib/components/Icon.svelte'
  import Kiosks from '$lib/components/Kiosks.svelte'
  import type { PageServerData } from './$types'

  // export let data: PageServerData
	let success = false
  let waiting = false
  let consent = "never"
</script>

{#if success}
<h2>Merci!</h2>
<button class="button--full" on:click={() => success = false}>Inscrire un nouveau client</button>
{:else}
<form method="POST" use:enhance={() => {
  waiting = true
  return async ({ result, update }) => {
    waiting = false
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

  <label for="">Consentir à recevoir notre infolettre :</label>
  <div>
    <input type="radio" name="accepts_notices" bind:group={consent} value="never" id="never">
    <label for="never">{#if consent === "never"}<Icon k="hand" />{/if} Jamais</label>
    <input type="radio" name="accepts_notices" bind:group={consent} value="month" id="month">
    <label for="month">{#if consent === "month"}<Icon k="hand" />{/if} À chaque mois ou deux</label>
  </div>
  
  <button class="button--full button--dark" type="submit" disabled={waiting}>{#if waiting}Un instant...{:else}S'inscrire{/if}</button>
</form>
{/if}

<style lang="scss">
  form {
    div {
      padding: var(--step-0);
    }
  }
</style>