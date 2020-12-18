<!-- TRAINING -->
<script>
  import Input from "./Input.svelte";
  import Button from "./Button.svelte";
  import Card from "./Card.svelte";
  import { getSentsFromUrl, saveSent } from "./api";

  let url = "";
  let sentences = [];
  let currentSent = 0;
  let loadingParser = false;
  let loadingSentences = false;

  const onclick = async () => {
    if (!url.trim()) return;
    loadingParser = true;
    currentSent = 0;

    const res = await getSentsFromUrl(url);
    console.log("RES", res);
    sentences = res.sentences;
    loadingParser = false;
  };

  const reset = () => {
    console.log("RESET");
  };

  const onyes = async () => {
    if (currentSent >= sentences.length - 1) reset();
    else {
      // DO YES
      loadingSentences = true;
      const res = await saveSent(sentences[currentSent], 1);
      currentSent++;
      loadingSentences = false;
    }
  };
  const onno = async () => {
    if (currentSent >= sentences.length - 1) reset();
    else {
      // DO NO
      loadingSentences = true;
      const res = await saveSent(sentences[currentSent], 0);
      currentSent++;
      loadingSentences = false;
    }
  };
</script>

<h1>Training</h1>

<Input
  bind:value={url}
  placeholder="https://www.ign.com/articles/cyberpunk-2077-review" />
<Button {onclick} disabled={loadingParser}>Train from url</Button>

{#if sentences.length}
  <Card {onyes} {onno} loading={loadingSentences}>
    {sentences[currentSent]}
  </Card>
{/if}
