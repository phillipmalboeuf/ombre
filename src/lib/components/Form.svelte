<script lang="ts">
  import Icon from './Icon.svelte'
  let amount: string = '5'
  let interval: string = 'one-time'
  let consent: string = 'never'
</script>

<form class="padded flex flex--middle flex--col flex--tight" action="/support" method="post">
  <div class="flex flex--tight">
    <input type="radio" name="amount" class="group" bind:group={amount} value="5" id="5">
    <label for="5">5$</label>
    <input type="radio" name="amount" class="group" bind:group={amount} value="20" id="20">
    <label for="20">20$</label>
    <input type="radio" name="amount" class="group" bind:group={amount} value="100" id="100">
    <label for="100">100$</label>
  </div>

  <div>
    <input type="radio" name="interval" bind:group={interval} value="one-time" id="one-time">
    <label for="one-time">{#if interval === "one-time"}<Icon k="hand" />{/if} One-time</label>
    <input type="radio" name="interval" bind:group={interval} value="month" id="month">
    <label for="month">{#if interval === "month"}<Icon k="hand" />{/if} Monthly</label>
    <input type="radio" name="interval" bind:group={interval} value="year" id="year">
    <label for="year">{#if interval === "year"}<Icon k="hand" />{/if} Yearly</label>
  </div>

  <div class="flex flex--middle flex--tight">
    <label for="email" aria-label="Email address"><Icon k="at" /></label>
    <input type="email" name="email" id="email" placeholder="your.email@address.com" required>
  </div>

  <div>consent to receive our newsletter:</div>

  <div>
    <input type="radio" name="consent" bind:group={consent} value="never" id="never">
    <label for="never">{#if consent === "never"}<Icon k="hand" />{/if} Never</label>
    <input type="radio" name="consent" bind:group={consent} value="week" id="week">
    <label for="week">{#if consent === "week"}<Icon k="hand" />{/if} ~ Once a week</label>
    <input type="radio" name="consent" bind:group={consent} value="month" id="month">
    <label for="month">{#if consent === "month"}<Icon k="hand" />{/if} ~ Once a month</label>
  </div>
  <div></div>
  <div><button class="button--dark" type="submit">Proceed to payment information</button></div>
</form>

<style lang="scss">
  form {
    font-family: var(--altfont);
    font-weight: bold;
    background: var(--grey);
    border-radius: var(--step-0);
  }

  input {
    width: 100%;
    border: 3px solid;
    font-family: var(--altfont);
    font-size: var(--step-0);
    border-radius: var(--step--2);
    padding: var(--step--2);
    background-color: var(--light);

    &::placeholder {
      color: currentColor;
    }
  }

  input[type="radio"] {
    display: none;

    & + label {
      position: relative;
      cursor: pointer;
      display: block;
      // width: 100%;
    }

    &:checked {
      & + label > :global(svg) {
        position: absolute;
        right: calc(100% + var(--step--2));
      }
    }

    &.group + label {
      border: 3px solid;
      background-color: var(--light);
      border-radius: var(--step--2);
      padding: var(--step--2);
    }

    &.group:checked + label {
      color: var(--light);
      background-color: var(--dark);
      outline: 3px solid var(--dark);
    }
  }
</style>