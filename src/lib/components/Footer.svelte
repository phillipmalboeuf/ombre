<script lang="ts">
  import Icon from './Icon.svelte'
  import { wip } from './WIP.svelte'
</script>

<footer class="padded flex flex--spaced flex--middle">
  <copy>© La ferme de la rigole ombrée {new Date().getFullYear()}</copy>
  <nav>
    <a href="/" on:click|preventDefault={() => wip.set(true)}><Icon k='twitter' /></a>
    <a href="/" on:click|preventDefault={() => wip.set(true)}><Icon k='facebook' /></a>
    <a href="/" on:click|preventDefault={() => wip.set(true)}><Icon k='instagram' /></a>
    <a href="/" on:click|preventDefault={() => wip.set(true)}><Icon k='tiktok' /></a>
    <a href="/" on:click|preventDefault={() => wip.set(true)}><Icon k='youtube' /></a>
    <a href="/" on:click|preventDefault={() => wip.set(true)}><Icon k='twitch' /></a>
  </nav>
</footer>

<style lang="scss">
  footer {
    margin-top: var(--step-2);
  }
</style>