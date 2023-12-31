import { error, type HttpError } from "@sveltejs/kit";

export const loginUser = async (email: string, password: string) => {
  if (!email || !password) {
    error(400, "Please enter an email and password");
  }
  try {
    const response = await fetch("/user/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      // Here you should check the actual status code to set the proper message
      const errorData = await response.json();
      error(404, errorData.message || "An error occurred during login");
    }
  } catch (e) {
    const err = e as HttpError;
    error(400, err.body.message);
  }
};
