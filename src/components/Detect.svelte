<script>
  import Input from "./Input.svelte";
  import Button from "./Button.svelte";
  import { isSentBelief } from "./api";

  let sentence = "";
  let loading = false;

  const get = async () => {
    loading = true;
    const res = await isSentBelief(sentence, "wordvecs70000");
    console.log("RES", res);
    loading = false;
    return res;
  };

  let isBelief = {};
  const onclick = () => {
    if (!sentence.trim()) return;
    isBelief = get();
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
  <h2>loading...</h2>
{:then { beliefAvg, topSents }}
  {#if beliefAvg !== undefined}
    <h2>{Math.round(beliefAvg * 100)}% belief</h2>

    <h3>{topSents.slice(0, 10).length} Closest Sentences</h3>
    {#each topSents.slice(0, 10) as sent}
      <p>{sent}</p>
    {/each}
  {/if}
{/await}
