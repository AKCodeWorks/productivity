import prisma from "$lib/db";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  console.log("Trying to create user");
  try {
    const { email, password, firstName, lastName, organization } =
      await request.json();
    if (!email || !password || !lastName || !firstName || !organization) {
      throw new Error("Email, password and name are required");
    }

    // Hash the password
    const saltRounds = 10; // You can adjust the number of rounds here
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
        organization: organization,
        Organization: {
          create: {
            name: organization,
          },
        },
      },
    });

    if (!process.env.SECRET) {
      throw new Error("Secret key is missing");
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    const cookieHeader = serialize("session", token, {
      httpOnly: true,
      maxAge: 60 * 60, // 1 hour in seconds
      path: "/",
      sameSite: "strict", // Adjust to your needs
      secure: process.env.NODE_ENV === "production", // Secure in production
    });

    return new Response(JSON.stringify(user), {
      headers: {
        "Set-Cookie": cookieHeader,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("error", error);
    throw new Error(JSON.stringify(error));
  }
};
