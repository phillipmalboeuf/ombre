<script lang="ts">
  import { getContext } from 'svelte'
  import Icon from './Icon.svelte'
  import { wip } from './WIP.svelte'

  let content = getContext<any>('content')
</script>

<footer class="padded flex flex--spaced flex--middle">
  <copy>{content.copyright} {new Date().getFullYear()}</copy>
  <nav class="flex flex--tight flex--middle">
    <!-- <a href="/" on:click|preventDefault={() => wip.set(true)}><Icon k='twitter' /></a> -->
    <a href="mailto:poussepoulin@gmail.com" target="_blank"><u>Nous rejoindre</u></a>
    <a href="https://www.facebook.com/profile.php?id=100085516862996" target="_blank"><Icon k='facebook' /></a>
    <a href="/" target="_blank"><Icon k='instagram' /></a>
    <!-- <a href="/" on:click|preventDefault={() => wip.set(true)}><Icon k='tiktok' /></a>
    <a href="/" on:click|preventDefault={() => wip.set(true)}><Icon k='youtube' /></a>
    <a href="/" on:click|preventDefault={() => wip.set(true)}><Icon k='twitch' /></a> -->
  </nav>
</footer>

<style lang="scss">
  footer {
    margin-top: var(--step-2);
  }
</style>