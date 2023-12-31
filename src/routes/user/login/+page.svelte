<script lang="ts">
  // +page
  import { type HttpError } from "@sveltejs/kit";
  import { loginUser } from "$lib/login";

  let email: string;
  let password: string;
  $: errorMessage = "";

  const handleLoginUser = async () => {
    try {
      await loginUser(email, password);
    } catch (e) {
      const err = e as HttpError;
      errorMessage = err.body.message;
    }
  };
</script>

<div class="container mx-auto">
  <div class="row">
    <div
      class="col-12 mx-auto mt-48 max-w-fit rounded-md border border-primary-blue-900 bg-primary-blue-50 px-4 pt-12"
    >
      <img class="mx-auto max-w-80" src="../logo.svg" alt="logo" />
      <h1 class="text-center text-2xl font-bold">Login</h1>
      <div class="mt-4 flex flex-col gap-2">
        <input
          bind:value={email}
          class="border-b border-primary-blue-800 bg-transparent p-2 focus:outline-none"
          type="text"
          placeholder="E-Mail"
        />
        <input
          bind:value={password}
          class="border-b border-primary-blue-800 bg-transparent p-2 focus:outline-none"
          type="text"
          placeholder="Password"
        />
      </div>
      <div class="container mt-4 flex flex-col">
        {#if errorMessage}
          <p class="text-center text-red-500">{errorMessage}</p>
        {/if}
        <button
          on:click={handleLoginUser}
          class="mx-auto mt-2 w-48 rounded-sm bg-primary-blue-700 px-6 py-2 text-slate-100 shadow-md active:bg-primary-blue-600 active:shadow-none"
          >Login</button
        >
        <div class="my-8 flex w-full justify-evenly">
          <a href="/user/signup" class="font-semibold text-primary-blue-600"
            >New User?</a
          >
          <a
            href="/user/resetpassword"
            class="font-semibold text-primary-blue-600">Forgot Password?</a
          >
        </div>
      </div>
    </div>
  </div>
</div>
