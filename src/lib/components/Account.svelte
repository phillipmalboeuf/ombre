<script lang="ts">
  import { PUBLIC_API_URL } from '$env/static/public'
  import { enhance } from '$lib/form'
  import { fly } from 'svelte/transition'

  import { me, items } from '$lib/stores'

  export let mode: "login" | "create" | "reset" = "create"
</script>
{#if $me?.user}
<button class="button--full" on:click>Continuez avec le compte {$me.user.email}</button>
<center>
  <button class="button--none" on:click={() => {
    fetch(`${PUBLIC_API_URL}/customers/logout`, {
      method: 'POST',
      credentials: 'include'
    }).then(async response => {
      console.log(await response.json())
      me.set(undefined)
    })
  }}>Inscrire un nouveau compte?</button>
</center>
{:else}
{#if mode === "login"}
<form action="{PUBLIC_API_URL}/customers/login" method="POST" use:enhance={{
  error: () => {
    // pending = undefined
  },
  pending: () => {
    // pending = true
  },
  result: async ({ response }) => {
    
    const json = await response.json()
    console.log(json)

    fetch(`${PUBLIC_API_URL}/customers/me`, {
      credentials: 'include'
    }).then(async response => {
      me.set((await response.json()))
    })
    // console.log(json)
    // customer.set(json.user)
  }
}}>
  <label for="email">Adresse courriel</label>
  <input type="email" name="email" id="email" value="phil@phils.computer">

  <label for="password">Mot de passe</label>
  <input type="password" name="password" id="password" value="gloomycreek">

  <button class="button--full button--dark" type="submit">Login</button>
</form>

<center>
  <a href="/account/create" on:click|preventDefault={() => mode = "create"}>Pas encore inscrit?</a><br>
  <a href="/account/reset" on:click|preventDefault={() => mode = "reset"}>Oublié votre mot de passe?</a>
</center>

{:else if mode === "create"}
<form action="{PUBLIC_API_URL}/customers" method="POST" use:enhance={{
  error: () => {
    // pending = undefined
  },
  pending: () => {
    // pending = true
  },
  result: async ({ response }) => {
    
    const json = await response.json()

    fetch(`${PUBLIC_API_URL}/customers/me`, {
      credentials: 'include'
    }).then(async response => {
      console.log(json)
      me.set((await response.json()))
    })
    // console.log(json)
    // customer.set(json.user)
  }
}}>
  <label for="name">Name</label>
  <input type="text" name="name" id="name">

  <label for="email">Email address</label>
  <input type="email" name="email" id="email">

  <label for="password">Password</label>
  <input type="password" autocomplete="new-password" name="password" id="password">

  <button class="button--full button--dark" type="submit">Créer votre compte</button>
</form>

<center><a href="/account/login" on:click|preventDefault={() => mode = "login"}>Déjà inscrit?</a></center>
{:else if mode === "reset"}

{/if}
{/if}

<style lang="scss">
  center {
    margin-top: var(--step--1);
    
    a:hover,
    a:focus {
      text-decoration: underline;
    }
  }
</style>