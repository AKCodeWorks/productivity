import prisma from "$lib/db";
import { error } from "@sveltejs/kit";
import bcrypt from "bcrypt";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  console.log("Trying to login user");

  const { email, password } = await request.json();

  if (!email || !password) {
    throw error(400, "Email and password are required");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw error(404, "User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.log("Invalid password! on the server!");
    throw error(401, "Invalid password");
  } else {
    console.log(user);
    return new Response(JSON.stringify({ message: "Got user!" }));
  }
};
