<script lang="ts">
  import Icon from './Icon.svelte'
  let amount: string = '5'
  let interval: string = 'one-time'
  let consent: string = 'never'

  import { getContext } from 'svelte'
  let content = getContext<any>('content')
</script>

<form class="padded flex flex--middle flex--col flex--tight" action="/stripe/support" method="post">
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
    <label for="one-time">{#if interval === "one-time"}<Icon k="hand" />{/if} {content.support.interval.one_time}</label>
    <input type="radio" name="interval" bind:group={interval} value="month" id="month">
    <label for="month">{#if interval === "month"}<Icon k="hand" />{/if} {content.support.interval.monthly}</label>
    <input type="radio" name="interval" bind:group={interval} value="year" id="year">
    <label for="year">{#if interval === "year"}<Icon k="hand" />{/if} {content.support.interval.yearly}</label>
  </div>

  <div class="flex flex--middle flex--tight">
    <label for="email" aria-label="Email address"><Icon k="at" /></label>
    <input type="email" name="email" id="email" placeholder={content.support.email} required>
  </div>

  <div>{content.support.consent}</div>

  <div>
    <input type="radio" name="consent" bind:group={consent} value="never" id="never">
    <label for="never">{#if consent === "never"}<Icon k="hand" />{/if} {content.support.consent_interval.never}</label>
    <input type="radio" name="consent" bind:group={consent} value="week" id="week">
    <label for="week">{#if consent === "week"}<Icon k="hand" />{/if} {content.support.consent_interval.week}</label>
    <input type="radio" name="consent" bind:group={consent} value="month" id="month">
    <label for="month">{#if consent === "month"}<Icon k="hand" />{/if} {content.support.consent_interval.month}</label>
  </div>
  <div></div>
  <div><button class="button--dark" type="submit">{content.support.cta}</button></div>
</form>

<style lang="scss">
  form {
    font-family: var(--altfont);
    font-weight: bold;
    background: var(--grey);
    border-radius: var(--step-0);
  }
</style>