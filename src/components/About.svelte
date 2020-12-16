<script>
  import Input from "./Input.svelte";
  import Button from "./Button.svelte";
  import {
    nearestWord as getNearestWord,
    nearestSent as getNearestSent,
  } from "./api";

  let word = "";
  let nearestWord = "";

  let sent = "";
  let nearestSent = "";

  const handleNearestWord = async () => {
    const { nearest: n, dist } = await getNearestWord(word);
    console.log("NEAREST", n);
    console.log("DIST", dist);
    nearestWord = n;
  };
  const handleNearestSent = async () => {
    const { nearest: n, dist } = await getNearestSent(sent);
    console.log("NEAREST", n);
    console.log("DIST", dist);
    nearestSent = n;
  };
</script>

<style>
  h2,
  ul,
  li,
  p {
    text-align: left;
    line-height: 26px;
  }

  ul {
    padding: 0;
  }

  li {
    list-style-position: inside;
  }

  a {
    color: #ff3e00;
  }

  section {
    margin-bottom: 60px;
  }

  .container {
    /* padding: 0px 50px; */
    max-width: 80vw;
    margin: auto;
  }

  .nearest {
    text-align: center !important;
  }
</style>

<h1>About</h1>

<div class="container">
  <section>
    <h2>Welcome to the Belief Detector!</h2>
    <p>
      For this project I wanted to explore some ideas regarding machine
      learning. The idea came about when talking to Derek, creator of
      <a
        href="https://apps.apple.com/us/app/dimenschen/id1465421047">Dimenschen</a>,
      about a problem he was having. Dimenschen is an app that allows you to log
      your beliefs over time, and Derek needed a way to consistently create
      fresh belief content. Instead of having a dedicated content creation team,
      I thought this would be a good problem for machine learning to handle.
    </p>
  </section>

  <section>
    <h2>What was I trying to solve?</h2>
    <p>
      It is easy for us to look at a sentence and decide whether or not that is
      a belief. Something like
      <b>The ends justify the means</b>
      is a belief, whereas
      <b>Where is the beef?</b>
      is not. The challenge comes in getting a machine to recognize a belief.
    </p>
  </section>

  <section>
    <h2>How does a machine <i>learn</i>?</h2>
    <p>For this, I had to do some digging.</p>
    <p>
      Traditionally, machines are fed an explicit set of instructions to produce
      a result. If I want a machine to identify a dog, I would need to provide
      instructions on how to do that. If, however, I provide lots of pictures of
      what a dog does and does not look like, the machine could be trained to
      identify dogs on its own. This is the trivial explanation of how machine
      learning works.
    </p>
    <p>
      Without getting into the nitty gritty, there are many techniques involved
      in machine learning depending on the goal, but in this instance I was
      looking at classification. I could map the numerical values of, let's say,
      pixels in an image to whether or not that image is a dog. From that, I
      could compare pixels in another image to predict whether that is also a
      picture of a dog. This comparison is achievable when the object being
      classified can be represented in numbers.
    </p>
  </section>

  <section>
    <h2>So what about words?</h2>
    <p>
      Words are distinct on their own, so how do we compare them? How do we know
      that the word
      <b>apple</b>
      is similar to
      <b>orange</b>, but very different from
      <b>tarantula</b>?
    </p>
    <p>
      I found this article about
      <a
        href="https://gist.github.com/aparrish/2f562e3737544cf29aaf1af30362f469">Understanding
        Word Vectors</a>
      by Allison Parrish, who does an excellent job at explaining how to do just
      that, but I'll try to summarize it the best I can.
    </p>
    <p>
      The idea is that words can be converted into vectors based on their
      context in a sentence. So in the case of "The
      <i>dog</i>
      ate" and "The
      <i>cat</i>
      ate", both dog and cat could be considered similar words because they
      appear in sentences surrounded by the same words. This comparison can be
      applied across multiple contexts in order to create a vector that
      represents the word and it's similarity to other words.
    </p>
    <p>
      Instead of generating a word vector model myself, I used Stanford's
      <a href="https://github.com/stanfordnlp/GloVe/tree/master/src">Global
        Vectors for Word Representation (GloVe)</a>
      demo to generate vectors for 70,000 words. Now these words are represented
      as a vector of numbers. Using the classic distance formula,
      <b><code>d = sqrt((x2 - x1)^2 + (y2 - y1)^2 + ...)</code></b>, we can get
      the distance between two words to find a word that is similar. Give it a
      shot down below!
    </p>
  </section>
  <section>
    <Input bind:value={word} />
    <Button onclick={handleNearestWord}>Get Nearest Word</Button>
    <div>
      {#if !nearestWord}
        <h3 class="nearest">Nearest</h3>
      {:else}
        <h3 class="nearest">{nearestWord}</h3>
      {/if}
    </div>
  </section>
  <section>
    <h2>So, sentences...</h2>
    <p>
      Well a sentence is just a list of words, isn't it? So one way to represent
      a sentence is to add up all the word vectors and find the average. Now we
      can compare sentences!
    </p>
    <p>
      I took the liberty of calculating the sentence vectors for all of Bram
      Stoker's
      <a href="https://www.gutenberg.org/cache/epub/345/pg345.txt">Dracula</a>,
      so you don't have to. Type in a sentence down below and see what sentence
      in Dracula it's the closest to.
    </p>
  </section>
  <section>
    <Input bind:value={sent} />
    <Button onclick={handleNearestSent}>Get Nearest Sent</Button>
    <div>
      {#if !nearestSent}
        <h3 class="nearest">Nearest</h3>
      {:else}
        <h3 class="nearest">{nearestSent}</h3>
      {/if}
    </div>
  </section>
  <section>
    <p>
      Although the results vary, it is interesting to see a relationship between
      words and sentences. I think a large part of this relies upon how these
      word vectors were originally calculated, and what contexts were
      considered.
    </p>
  </section>
  <section>
    <h2>Back to beliefs</h2>
    <p>
      Now that we know how to compare sentences, we can assign a belief value to
      a sentence. If we collect enough data on sentences, we should be able to
      predict with a level of certainty whether or not a random sentence is a
      belief.
    </p>
    <p>
      Much more can be done to optimize the certainty, but that will be for
      another day.
    </p>
  </section>
  <section>
    <h2>Author Notes:</h2>
    <p>
      Corey here. I built this in a couple of days and didn't have time to set
      up a database. All the data is being stored on a .txt file. That, paired
      with the fact that heroku seems to refresh after a few minutes means that
      the data is not persistent. Lesson learned.
    </p>
    <ul>
      <b>Tech:</b>
      <li>
        Frontend -
        <a href="https://svelte.dev/">Svelte</a>
        on
        <a href="http://vercel.com/">Vercel</a>
      </li>
      <li>
        Backend -
        <a href="https://nodejs.dev/">Node</a>
        on
        <a href="https://dashboard.heroku.com/">Heroku</a>
      </li>
    </ul>
    <p>Developed December, 2020</p>
  </section>
</div>
