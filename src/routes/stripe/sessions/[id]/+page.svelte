<script lang="ts">
  import type { PageData } from './$types'
  export let data: PageData

  import { getContext } from 'svelte'
  let content = getContext<any>('content')
</script>


<center class="padded">
  <h1 class="h3">{content.success.title}</h1>
  <p>{content.success.number} <strong>{data.session.client_reference_id}</strong><br>{content.success.receipt} <strong>{data.session.customer_email}</strong>.</p>
  <div><a class="button" href="/">{content.back}</a></div>
</center>