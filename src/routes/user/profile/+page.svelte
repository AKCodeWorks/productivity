<script lang="ts">
  import { onMount } from "svelte";
  type User = {
    name: string;
    email: string;
    password: string;
    id: string;
  };

  let users: User[] = [];

  const getAllUsers = async () => {
    const response = await fetch("/user/profile");
    if (response.ok) {
      users = await response.json();
    } else {
      console.error("Failed to fetch users");
    }
  };

  onMount(async () => await getAllUsers());
  async function deleteUser(email: string) {
    const response = await fetch("/user/profile", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    if (response.ok) {
      await getAllUsers();
    } else {
      console.error("Failed to delete user");
    }
  }
</script>

<main class="text-white">
  <h1>Users</h1>
  {#if users.length}
    <ul>
      {#each users as user}
        <div class="container mx-auto flex gap-6 p-4">
          <li class="p-4">Name: {user.name}</li>
          <li class="p-4">Email: {user.email}</li>
          <li class="p-4">ID: {user.id}</li>
        </div>

        <li>Password: {user.password}</li>
        <button on:click={() => deleteUser(user.email)}>Delete</button>
        <button on:click={() => console.log(user.email)}>Console Email</button>
      {/each}
    </ul>
  {:else}
    <p>No users found.</p>
  {/if}
</main>
