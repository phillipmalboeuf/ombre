<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit'
  export const load: Load = async ({ fetch, params, url }) => {
		return {
			props: await (await fetch(`/sessions/${url.searchParams.get('session_id')}.json`)).json()
		}
	}
</script>

<script lang="ts">
  import type Stripe from 'stripe'
  export let session: Stripe.Checkout.Session

  import { getContext } from 'svelte'
  let content = getContext<any>('content')
</script>


<center class="padded">
  <h1 class="h3">{content.success.title}</h1>
  <p>{content.success.number} <strong>{session.client_reference_id}</strong><br>{content.success.receipt} <strong>{session.customer_email}</strong>.</p>
  <div><a class="button" href="/">{content.back}</a></div>
</center>