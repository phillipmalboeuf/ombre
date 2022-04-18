<script lang="ts" context="module">
  import { writable } from 'svelte/store'
  export const wip = writable<boolean>(false)
</script>

<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import Form from './Form.svelte'
  import Overlay from './Overlay.svelte'

  import { getContext } from 'svelte'
  let content = getContext<any>('content')
</script>

<Overlay bind:open={$wip}>
  <div class="padded grid grid--full" transition:fly={{ y: -100 }}>
    <section>
      <h2>{content.dev.title}</h2>
      <p>{@html content.dev.text}</p>
    </section>

    <section>
      <h3>{content.support}</h3>
      <Form />
    </section>
  </div>
</Overlay>

<style lang="scss">
  div {
    width: 100%;
		max-width: var(--step-7);
		margin: 0 auto;
    padding: var(--step-1);
  }
</style>