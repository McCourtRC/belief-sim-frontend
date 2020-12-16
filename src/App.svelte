<!-- HOME -->
<script>
	import Nav from "./components/Nav.svelte";
	import Detect from "./components/Detect.svelte";
	import Train from "./components/Train.svelte";
	import About from "./components/About.svelte";

	let page = 2;
</script>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
			Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
	}

	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}
</style>

<main>
	<Nav onNav={(pageNum) => (page = pageNum)} />

	{#if page === 0}
		<Detect />
	{:else if page === 1}
		<Train />
	{:else if page === 2}
		<About />
	{/if}
</main>
