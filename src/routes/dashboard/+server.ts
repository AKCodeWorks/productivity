// // src/routes/dashboard/+server.ts
// import type { RequestHandler } from "@sveltejs/kit";
// import { redirect } from "@sveltejs/kit";
// import jwt from "jsonwebtoken";

// export const GET: RequestHandler = async ({ request }) => {
//   const cookies = request.headers.get("cookie");
//   if (!cookies) {
//     return new Response(null, { status: 401 });
//   }
//   const session = cookies
//     ?.split(";")
//     .find((c) => c.trim().startsWith("session="));

//   const token = session?.split("=")[1];

//   try {
//     if (!process.env.SECRET || !token) {
//       throw new Error("Secret key or token is missing");
//     }
//     const verifyToken = jwt.verify(token, process.env.SECRET);

//     if (!session || !verifyToken) {
//       return new Response(null, { status: 401 });
//     }

//     // TODO: Add dashboard content here

//     return new Response("Dashboard content...");
//   } catch (error) {
//     // Redirect to login if token verification fails
//     throw redirect(302, "/user/login");
//   }
// };
