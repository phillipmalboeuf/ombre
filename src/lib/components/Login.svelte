<script lang="ts">
  import { PUBLIC_API_URL } from '$env/static/public'
  import { enhance } from '$lib/form'
  import { fly } from 'svelte/transition'

  import { customer, items } from '$lib/stores'
</script>

<!-- {$customer?.email} -->

<form action="{PUBLIC_API_URL}/customers/login" method="post" use:enhance={{
  error: () => {
    // pending = undefined
  },
  pending: () => {
    // pending = true
  },
  result: async ({ response }) => {
    
    const json = await response.json()

    fetch(`${PUBLIC_API_URL}/customers/me`, {
      credentials: 'same-origin'
    }).then(async response => {
      console.log(json)
      customer.set((await response.json()))
    })
    // console.log(json)
    // customer.set(json.user)
  }
}}>
  <label for="email">Email address</label>
  <input type="email" name="email" id="email">

  <label for="password">Password</label>
  <input type="password" name="password" id="password">

  <button class="button--full button--dark" type="submit">Login</button>
</form>