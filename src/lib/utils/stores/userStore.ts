import { writable } from "svelte/store";

const userStore = writable({
  firstName: "",
  lastName: "",
  email: "",
  Organization: {
    name: "",
    id: 0,
  },
});

export default userStore;
