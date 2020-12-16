<!-- TRAINING -->
<script>
  import Input from "./Input.svelte";
  import Button from "./Button.svelte";
  import Card from "./Card.svelte";
  import { getSentsFromUrl, saveSent } from "./api";

  let url;
  let sentences = [];
  let currentSent = 0;
  const onclick = async () => {
    currentSent = 0;

    const res = await getSentsFromUrl(url);
    console.log("RES", res);
    sentences = res.sentences;
  };

  const reset = () => {
    console.log("RESET");
  };

  const onyes = async () => {
    if (currentSent >= sentences.length - 1) reset();
    else {
      // DO YES
      const res = await saveSent(sentences[currentSent], 1);
      currentSent++;
    }
  };
  const onno = async () => {
    if (currentSent >= sentences.length - 1) reset();
    else {
      // DO NO
      const res = await saveSent(sentences[currentSent], 0);
      currentSent++;
    }
  };
</script>

<h1>Training</h1>

<Input
  bind:value={url}
  placeholder="https://www.ign.com/articles/cyberpunk-2077-review" />
<Button {onclick}>Train from url</Button>

{#if sentences.length}
  <Card {onyes} {onno}>{sentences[currentSent]}</Card>
{/if}
