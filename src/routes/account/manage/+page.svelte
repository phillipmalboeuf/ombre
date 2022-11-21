<script lang="ts">
  import { me } from '$lib/stores'
  import { DateTime } from 'luxon'

  import type { PageServerData } from './$types'
  import { goto } from '$app/navigation'
  import { date, money } from '$lib/formatters'

	export let data: PageServerData  
</script>

<nav>
  <a href="/products"><u>Retour au produits</u></a>
</nav><br>

<section class="flex flex--spaced">
  <main>
    <h4>Bonjour {data.me.email}</h4>
    <h3>Vos commandes</h3>
    
    <table>
      <tbody>
        <tr><th>Id</th><th>Livraison</th><th>Items</th><th>Total</th></tr>
        {#each data.orders as order}
        <tr><td>{order.id}</td><td>{date(order.deliver_at)}<br>{order.kiosk?.name}</td><td>{#each order.line_items as item}{item.quantity} fois {item.product.title}{/each}</td><td>{money(order.total)}</td></tr>
        {/each}
      </tbody>
    </table>
    <h3>Vos abonnements</h3>
    <table>
      <tbody>
        <tr><th>Id</th><th>Livraison</th><th>Items</th></tr>
        {#each data.subscriptions as subscription}
        <tr><td>{subscription.id}</td><td>{date(subscription.next_deliver_at)}<br>{subscription.kiosk?.name}</td><td>{#each subscription.line_items as item}{item.quantity} fois {item.product.title}{/each}</td></tr>
        {/each}
      </tbody>
    </table>
    <form method="POST">
      <button>Modifier vos abonnements</button>
    </form>
  </main>
  <aside>
    <!-- <h4>Calendrier</h4> -->

    <h4>Détails du compte</h4>
    <strong>Id:</strong> {data.me.id}

    <br>
    <button class="button--none" on:click={() => {
    fetch(`/account?/logout`, {
      credentials: 'include',
      method: 'POST',
      body: new FormData(),
      headers: {
        'x-sveltekit-action': 'true'
      }
    }).then(async response => {
      // console.log(response)
      // console.log(await response.json())
      me.set(undefined)
      goto('/account')
    })
  }}><u>Logout</u></button>
  </aside>
</section>