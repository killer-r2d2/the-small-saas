import { lucia } from "~/server/utils/auth"; // Adjust the path as necessary

export default defineEventHandler(async (event) => {
  try {
    // Extract the session ID from cookies
    const sessionId = event.req.headers.cookie?.match(/auth_session=([^;]*)/)?.[1];

    // If no session ID, throw an unauthorized error
    if (!sessionId) {
      throw createError({ statusCode: 401, message: "Unauthorized" });
    }

    // Validate the session using the session ID
    const session = await lucia.validateSession(sessionId);

    // If the session is invalid, throw an unauthorized error
    if (!session) {
      throw createError({ statusCode: 401, message: "Unauthorized" });
    }

    // The user information should be available in the session object
    const user = session.user;

    // Store the user in the context for use in other parts of the app
    event.context.user = user;

    // Return the user data
    return user;
  } catch (error) {
    console.error("Failed to validate session or retrieve user:", error);
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
});
