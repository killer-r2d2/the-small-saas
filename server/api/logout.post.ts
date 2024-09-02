import { lucia } from "~/server/utils/auth"; // Adjust the path as necessary

export default defineEventHandler(async (event) => {
  try {
    // Extract the session ID from cookies
    const sessionId = event.req.headers.cookie?.match(/auth_session=([^;]*)/)?.[1];

    // If no session ID, throw an unauthorized error
    if (!sessionId) {
      throw createError({ statusCode: 401, message: "Unauthorized" });
    }

    // Invalidate the session using the session ID
    await lucia.invalidateSession(sessionId);

    // Clear the session cookie by setting it to an empty value and immediate expiry
    appendHeader(event, "Set-Cookie", lucia.createBlankSessionCookie().serialize());

    // Return success response
    return { message: "Logged out successfully" };
  } catch (error) {
    console.error("Failed to logout:", error);
    throw createError({ statusCode: 500, message: "Failed to logout" });
  }
});
