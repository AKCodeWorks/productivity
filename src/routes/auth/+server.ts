import prisma from "$lib/db";
import userStore from "$lib/utils/stores/userStore";
import type { RequestHandler } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import jwt from "jsonwebtoken";

export const GET: RequestHandler = async ({ request }) => {
  type DecodedToken = {
    userId: string | number;
  };
  const cookies = request.headers.get("cookie");
  if (!cookies) {
    return new Response(null, { status: 401 });
  }
  const session = cookies
    ?.split(";")
    .find((c) => c.trim().startsWith("session="));

  const token = session?.split("=")[1];

  try {
    if (!process.env.SECRET || !token) {
      throw new Error("Secret key or token is missing");
    }
    const decodedToken = jwt.verify(token, process.env.SECRET) as DecodedToken;

    const userId = decodedToken.userId;

    if (!session || !decodedToken || !userId) {
      return new Response(null, { status: 401 });
    }

    // Fetch user data from Prisma using userId from the token
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!user) {
      return new Response(null, { status: 404, statusText: "User not found" });
    }

    // Exclude the password from the user data
    const { password, ...sanitizedUserData } = user;

    // Reshape the user data to match the expected structure for userStore
    const userDataForStore = {
      firstName: sanitizedUserData.firstName,
      lastName: sanitizedUserData.lastName,
      email: sanitizedUserData.email,
      Organization: {
        name: sanitizedUserData.organization, // Assuming 'organization' is a string
        id: sanitizedUserData.orgId,
      },
    };
    console.log(userDataForStore, " this is user data for store");
    // Set the userStore with the reshaped user data
    userStore.set(userDataForStore);

    return new Response(JSON.stringify(userDataForStore));
  } catch (error) {
    // Redirect to login if token verification fails
    throw redirect(302, "/user/login");
  }
};
