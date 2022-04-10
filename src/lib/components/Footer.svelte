<script lang="ts">
  import Icon from './Icon.svelte'

</script>

<footer class="padded flex flex--spaced flex--middle">
  <copy>© La ferme de la rigole ombrée {new Date().getFullYear()}</copy>
  <nav>
    <a href="/"><Icon k='twitter' /></a>
    <a href="/"><Icon k='facebook' /></a>
    <a href="/"><Icon k='instagram' /></a>
    <a href="/"><Icon k='tiktok' /></a>
    <a href="/"><Icon k='youtube' /></a>
    <a href="/"><Icon k='twitch' /></a>
  </nav>
</footer>

<style lang="scss">
  footer {
    margin-top: var(--step-2);
  }
</style>