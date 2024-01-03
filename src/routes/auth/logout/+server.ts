import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request }) => {
  const headers = new Headers();
  headers.append("Set-Cookie", "session=; Max-Age=0; path=/; HttpOnly;");

  if (process.env.NODE_ENV === "production") {
    headers.append("Set-Cookie", "Secure;");
  }

  return new Response(null, {
    status: 200,
    headers: headers,
  });
};
