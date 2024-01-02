export const loginUser = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Please enter an email and password");
  }

  try {
    const response = await fetch("/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred during login");
    }

    return await response.json();
  } catch (e) {
    // Re-throwing the error to be handled by the caller
    throw e instanceof Error
      ? e
      : new Error("An error occurred during the login process");
  }
};
