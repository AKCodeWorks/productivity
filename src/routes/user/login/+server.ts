import prisma from "$lib/db";
import { error } from "@sveltejs/kit";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
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
    // Generate JWT token
    if (!process.env.SECRET) {
      throw error(500, "Secret key is missing");
    }
    const token = jwt.sign({ userId: user.id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    // Serialize the token into a cookie
    const cookieHeader = serialize("session", token, {
      httpOnly: true,
      maxAge: 60 * 60, // 1 hour in seconds
      path: "/",
      sameSite: "strict", // Adjust to your needs
      secure: process.env.NODE_ENV === "production", // Secure in production
    });

    return new Response(
      JSON.stringify({
        message: "Login successful",
        user: { email: user.email, name: user.name },
      }),
      {
        headers: {
          "Set-Cookie": cookieHeader,
          "Content-Type": "application/json",
        },
      },
    );
  }
};
