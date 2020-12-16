<script>
  import Spinner from "./Spinner.svelte";

  export let onclick;
  export let disabled;
</script>

<style>
  button {
    font-family: inherit;
    font-size: inherit;
    padding: 1em 2em;
    color: #ff3e00;
    background-color: rgba(255, 62, 0, 0.1);
    border-radius: 2em;
    border: 2px solid rgba(255, 62, 0, 0);
    outline: none;
    width: 200px;
    font-variant-numeric: tabular-nums;
  }

  button:focus {
    border: 2px solid #ff3e00;
  }

  button:active,
  button:hover {
    cursor: pointer;
    background-color: rgba(255, 62, 0, 0.2);
  }

  button:disabled {
    cursor: default;
    background-color: lightgray;
  }
</style>

<button on:click={onclick} {disabled}>
  {#if disabled}
    <Spinner />
  {:else}
    <slot />
  {/if}
</button>
