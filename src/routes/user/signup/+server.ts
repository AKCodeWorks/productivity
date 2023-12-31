import prisma from "$lib/db";
import bcrypt from "bcrypt";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  console.log("Trying to create user");
  try {
    const { email, password, name } = await request.json();
    if (!email || !password || !name) {
      throw new Error("Email, password and name are required");
    }

    // Hash the password
    const saltRounds = 10; // You can adjust the number of rounds here
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword, // Store the hashed password
      },
    });

    if (!user) {
      throw new Error("User not created");
    }

    // It's a good practice not to return the password hash
    const { password: _, ...userWithoutPassword } = user;

    return new Response(JSON.stringify(userWithoutPassword));
  } catch (error) {
    console.log("error", error);
    throw new Error(JSON.stringify(error));
  }
};
