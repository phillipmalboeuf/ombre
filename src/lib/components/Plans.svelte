<script lang="ts">
  import { interval } from '$lib/stores'
  import Icon from './Icon.svelte'
</script>

<input type="radio" name="interval" bind:group={$interval} value="one-time" id="one-time">
<label for="one-time">{#if $interval === "one-time"}<Icon k="hand" />{/if} Commande une fois</label>
<input type="radio" name="interval" bind:group={$interval} value="week-2" id="week">
<label for="week">{#if $interval === "week-2"}<Icon k="hand" />{/if} Abonnement au 2 semaines</label>