<script lang="ts">
  let errorMessage: string;
</script>

<div class="container mx-auto">
  <div class="row pb-60">
    <div
      class="col-12 mx-auto mt-48 max-w-fit rounded-md border border-primary-blue-900 bg-primary-blue-50 px-4 pb-20 pt-12"
    >
      <img class="mx-auto max-w-80" src="../logo.svg" alt="logo" />
      <h1 class="text-center text-2xl font-bold">Create a New Project</h1>
      <div class="mt-4 flex flex-col gap-2">
        <div class="mb-2 flex flex-col">
          <label class="font-bold" for="projectName"> Project Name</label>
          <input
            name="projectName"
            class="border-b border-primary-blue-800 bg-transparent p-2 focus:outline-none"
            type="text"
            placeholder="Data Migration Project"
          />
        </div>

        <div class="mb-2 flex flex-col">
          <div class="flex gap-2">
            <label class="font-bold" for="collaborators">Collaborators</label>
            <details>
              <summary
                class="inline-block cursor-pointer text-sm font-bold italic"
                >?</summary
              >
              <p class="max-w-1/2 text-sm">
                To select or remove multiple collaborators,<br /> hold down the Ctrl
                key (or CMD) and click on the name.
              </p>
            </details>
          </div>
          <select class="max-h-20 bg-transparent" multiple name="collaborators">
            <option value="1">John Smith</option>
            <option value="2">Jane Doe</option>
          </select>
        </div>

        <div class="flex gap-6">
          <input
            class="border-b border-primary-blue-800 bg-transparent p-2 focus:outline-none"
            type="text"
            placeholder="First Name"
          />
          <input
            class="border-b border-primary-blue-800 bg-transparent p-2 focus:outline-none"
            type="text"
            placeholder="Last Name"
          />
        </div>

        <input
          class="border-b border-primary-blue-800 bg-transparent p-2 focus:outline-none"
          type="text"
          placeholder="Organization Name"
        />
        <div class="flex gap-6">
          <input
            class="border-b border-primary-blue-800 bg-transparent p-2 focus:outline-none"
            type="password"
            placeholder="Password"
          />
          <input
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
          class="mx-auto mt-8 w-48 rounded-sm bg-primary-blue-700 px-6 py-2 text-slate-100 shadow-md active:bg-primary-blue-600 active:shadow-none"
          >Create Project</button
        >
      </div>
    </div>
  </div>
</div>
