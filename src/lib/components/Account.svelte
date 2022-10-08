<script lang="ts">
  import { PUBLIC_API_URL } from '$env/static/public'
  import { enhance } from '$app/forms'
  import { fly } from 'svelte/transition'

  import { me, items } from '$lib/stores'

  export let mode: "login" | "create" | "reset" = "login"
  let waiting = false
  let error: string
</script>
{#if $me}
<button class="button--full" on:click>Continuez avec le compte {$me.email}</button>
<center>
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
    })
  }}>Inscrire un nouveau compte?</button>
</center>
{:else}
{#if mode === "login"}
<form action="/account?/login" method="POST" use:enhance={() => {
  waiting = true
  return async ({ result, update }) => {
    if (result.type === 'success') {
      fetch(`/account/me`, {
        credentials: 'include'
      }).then(async response => {
        me.set((await response.json()))
      })
    } else if (result.type === 'error') {
      error = result.error.message
    }

    waiting = false
  }
}}>
  <label for="email">Adresse courriel</label>
  <input type="email" name="email" id="email">

  <label for="password">Mot de passe</label>
  <input type="password" name="password" id="password">

  <button class="button--full button--dark" type="submit" disabled={waiting}>Login</button>
</form>

<center>
  <a href="/account/create" on:click|preventDefault={() => mode = "create"}>Pas encore inscrit?</a><br>
  <a href="/account/reset" on:click|preventDefault={() => mode = "reset"}>Oublié votre mot de passe?</a>
</center>

{:else if mode === "create"}
<form action="/account?/create" method="POST" use:enhance={() => {
  waiting = true
  return async ({ result, update }) => {
    if (result.type === 'success') {
      fetch(`/account/me`, {
        credentials: 'include'
      }).then(async response => {
        me.set((await response.json()))
      })
    }

    waiting = false
  }
}}>
  <label for="name">Nom complet</label>
  <input type="text" name="name" id="name">

  <label for="email">Adresse courriel</label>
  <input type="email" name="email" id="email">

  <label for="password">Mot de passe</label>
  <input type="password" autocomplete="new-password" name="password" id="password">

  <button class="button--full button--dark" type="submit" disabled={waiting}>Créer votre compte</button>
</form>

<center><a href="/account/login" on:click|preventDefault={() => mode = "login"}>Déjà inscrit?</a></center>
{:else if mode === "reset"}

{/if}
{#if error}
<aside>{error}</aside>
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