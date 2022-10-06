<script>
  import { me } from '$lib/stores'
</script>

<article>
  <h1>Merci!</h1>
  <p>Votre reçu a été envoyé à votre adresse courriel: {$me?.email}</p>
  <a href="/account" class="button">Visitez votre historique de commandes</a>
</article>

<style lang="scss">
</style>