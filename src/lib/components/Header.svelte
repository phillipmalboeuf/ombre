<script lang="ts">
  import Icon from './Icon.svelte'

</script>

<header class="padded flex flex--spaced flex--middle">
  <button class="button--none"><Icon k='menu' /> Menu</button>
  <nav class="flex flex--middle flex--tight">
    <a href="/fr">Fr</a>
    <a href="/account" aria-label="Account"><Icon k='account' /></a>
    <a href="/account"><Icon k='cart' /></a>
  </nav>
</header>

<style lang="scss">
  header {
    position: fixed;
    inset: 0;
    bottom: auto;

    > button,
    > nav {
      font-size: var(--step-1);
    }
  }
</style>