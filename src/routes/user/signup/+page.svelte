<script lang="ts">
  import { goto } from "$app/navigation";

  let firstName: string;
  let lastName: string;
  let organization: string;
  let email: string;
  let password: string;
  let confirmPassword: string;
  let errorMessage: string;

  const addUser = async () => {
    if (
      !firstName ||
      !lastName ||
      !organization ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      errorMessage = "All fields are required";
      return;
    }
    if (password !== confirmPassword) {
      errorMessage = "Passwords do not match";
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      errorMessage = "Invalid email address";
      return;
    }
    if (password.length < 8) {
      errorMessage = "Password must be at least 8 characters long";
      return;
    }

    const response = await fetch("/user/signup", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        organization,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      goto("/dashbaord");
    } else {
      errorMessage = "Something went wrong on our end. Please try again later.";
    }
  };
</script>

<div class="container mx-auto">
  <div class="row">
    <div
      class="col-12 mx-auto mt-48 max-w-fit rounded-md border border-primary-blue-900 bg-primary-blue-50 px-4 pt-12"
    >
      <img class="mx-auto max-w-80" src="../logo.svg" alt="logo" />
      <h1 class="text-center text-2xl font-bold">Signup</h1>
      <div class="mt-4 flex flex-col gap-2">
        <input
          bind:value={email}
          class="border-b border-primary-blue-800 bg-transparent p-2 focus:outline-none"
          type="text"
          placeholder="E-Mail"
        />
        <div class="flex gap-6">
          <input
            bind:value={firstName}
            class="border-b border-primary-blue-800 bg-transparent p-2 focus:outline-none"
            type="text"
            placeholder="First Name"
          />
          <input
            bind:value={lastName}
            class="border-b border-primary-blue-800 bg-transparent p-2 focus:outline-none"
            type="text"
            placeholder="Last Name"
          />
        </div>

        <input
          bind:value={organization}
          class="border-b border-primary-blue-800 bg-transparent p-2 focus:outline-none"
          type="text"
          placeholder="Organization Name"
        />
        <div class="flex gap-6">
          <input
            bind:value={password}
            class="border-b border-primary-blue-800 bg-transparent p-2 focus:outline-none"
            type="password"
            placeholder="Password"
          />
          <input
            bind:value={confirmPassword}
            class="border-b border-primary-blue-800 bg-transparent p-2 focus:outline-none"
            type="password"
            placeholder="Confirm Password"
          />
        </div>
      </div>
      <div class="container mt-4 flex flex-col">
        {#if errorMessage}
          <p class="text-center text-red-500">{errorMessage}</p>
        {/if}
        <button
          on:click={addUser}
          class="mx-auto mt-2 w-48 rounded-sm bg-primary-blue-700 px-6 py-2 text-slate-100 shadow-md active:bg-primary-blue-600 active:shadow-none"
          >Create Account</button
        >
        <div class="my-8 flex w-full justify-evenly">
          <a href="/user/login" class="font-semibold text-primary-blue-600"
            >Login Instead?</a
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
