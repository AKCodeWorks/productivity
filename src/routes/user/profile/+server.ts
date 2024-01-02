import { PrismaClient } from "@prisma/client";
import { json, type RequestHandler } from "@sveltejs/kit";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return json(users);
  } catch (error) {
    return json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export const DELETE: RequestHandler = async ({ request }) => {
  try {
    // Extract the email from the request body
    const data = await request.json();
    const email = data.email;

    console.log("this is my email!", email);

    const user = await prisma.user.delete({
      where: {
        email: email,
      },
    });

    return json(user);
  } catch (error) {
    console.log(error);
    return json({ error: "Failed to delete user" }, { status: 500 });
  }
};
