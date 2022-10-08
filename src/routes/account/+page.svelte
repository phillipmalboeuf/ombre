<script lang="ts">
  import { goto } from '$app/navigation'
  import Account from '$lib/components/Account.svelte'
  import type { PageServerData } from '.svelte-kit/types/src/routes/account/$types'

  export let data: PageServerData
</script>


<Account on:click={() => goto('/account/manage')} />

<!-- <section>
  <h4>{data.me.name}</h4>
	<form action="/stripe/manage" method="post">
		<button type="submit">Manage</button>
	</form>
	<a href="/account/logout" class="button">Logout</a>
</section> -->

<style lang="scss">
	// section {
	// 	width: 100%;
	// 	max-width: var(--step-7);
	// 	margin: 0 auto;
	// }
</style>