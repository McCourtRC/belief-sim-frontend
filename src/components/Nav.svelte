<script>
  export let onNav;
</script>

<style>
  nav {
    display: flex;
    justify-content: space-evenly;
  }

  a {
    color: #ff3e00;
    background-color: rgba(255, 62, 0, 0.1);
    flex-grow: 1;
    padding: 20px;
    text-decoration: none;
  }
  a:hover {
    background-color: rgba(255, 62, 0, 0.2);
  }
</style>

<nav>
  <a on:click={() => onNav(0)}>Detect</a>
  <a on:click={() => onNav(1)}>Train</a>
  <a on:click={() => onNav(2)}>About</a>
</nav>
