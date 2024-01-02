<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  onMount(async () => {
    const response = await fetch("/auth");
    if (response.status !== 200) {
      goto("/user/login"); // redirect to login page
    } else {
      // handle the dashboard data
    }
  });
</script>

<div class="container text-primary-blue-50">
  <h1>Dashboard</h1>
</div>
