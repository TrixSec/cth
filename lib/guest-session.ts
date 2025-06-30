import { cookies } from "next/headers";

export async function getGuestSessionId(): Promise<string> {
  const cookieStore = await cookies(); // Await required in server context

  let sessionId = cookieStore.get("guest_session_id")?.value;

  if (!sessionId) {
    sessionId = crypto.randomUUID(); // Use crypto for UUID

    cookieStore.set({
      name: "guest_session_id",
      value: sessionId,
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });
  }

  return sessionId;
}
