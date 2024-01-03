<script lang="ts">
  import userStore from "$lib/utils/stores/userStore";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import type { UserType } from "$lib/types";

  onMount(async () => {
    const response = await fetch("/auth");
    if (response.status !== 200) {
      goto("/user/login"); // redirect to login page
    } else {
      const data = await response.json(); // Wait for the JSON data

      userStore.set(data);
    }
  });
</script>

<div class="container text-primary-blue-50">
  <h1>Welcome to the dashboard {$userStore.firstName} {$userStore.lastName}</h1>
  <button on:click={() => console.log($userStore)}>Console User STore</button>
</div>
