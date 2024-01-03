<script>
  import { goto } from "$app/navigation";
  import userStore from "$lib/utils/stores/userStore";

  async function handleLogout() {
    // Request server to clear the cookie
    await fetch("/auth/logout", { method: "GET" });

    // Reset the user store
    // @ts-ignore
    userStore.set({});

    // Redirect to the login page
    goto("/user/login");
  }
</script>

<nav
  class="mb-2 flex content-center items-center justify-between border-b border-primary-blue-800 px-6 text-slate-200"
>
  <img class="max-h-16" src="../logo.svg" alt="logo" />
  <ul class="flex items-center gap-6 font-bold text-primary-blue-300">
    <li><a href="/">Dashboard</a></li>
    <li><a href="/">Projects</a></li>
    <li><a href="/">Tasks</a></li>
    <li><a href="/">Settings</a></li>
    <li>
      <button
        on:click={handleLogout}
        class="rounded-md bg-primary-blue-300 px-2 py-1 text-primary-blue-900 shadow-purple-900 drop-shadow-md active:bg-primary-blue-400 active:shadow-none"
        >Logout</button
      >
    </li>
  </ul>
</nav>
