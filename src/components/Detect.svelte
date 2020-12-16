<script>
  import Input from "./Input.svelte";
  import Button from "./Button.svelte";
  import { isSentBelief } from "./api";

  let sentence;
  let isBelief = {};
  let loading = false;
  const onclick = async () => {
    loading = true;
    const res = await isSentBelief(sentence, "wordvecs70000");
    console.log("RES", res);
    isBelief = res;
    loading = false;
  };
</script>

<style>
  h3,
  p {
    text-align: left;
  }
</style>

<h1>Detect</h1>

<Input
  bind:value={sentence}
  placeholder="My favorite food is strawberry ice cream." />
<Button {onclick} disabled={loading}>Is this a belief?</Button>

{#await isBelief}
  <p>loading...</p>
{:then { beliefAvg, topSents }}
  {#if beliefAvg}
    <h2>{Math.round(beliefAvg * 100)}% belief</h2>

    <h3>{topSents.slice(0, 10).length} Closest Sentences</h3>
    {#each topSents.slice(0, 10) as sent}
      <p>{sent}</p>
    {/each}
  {/if}
{/await}
