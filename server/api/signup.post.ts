// This file handles the user signup process by validating the input, ensuring the username is unique, securely hashing the password, creating a new user in the database, and finally, establishing a session for the user and setting a session cookie.

import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { PrismaClient } from "@prisma/client";
import { lucia } from "~/server/utils/auth"; // Adjust the path as necessary

const prisma = new PrismaClient();

export default eventHandler(async (event) => {
  const formData = await readFormData(event);
  const username = formData.get("username");
  const password = formData.get("password");

  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    throw createError({
      message: "Invalid username",
      statusCode: 400
    });
  }

  if (typeof password !== "string" || password.length < 6 || password.length > 255) {
    throw createError({
      message: "Invalid password",
      statusCode: 400
    });
  }

  // Check if username is already in use
  const existingUser = await prisma.user.findUnique({
    where: { username }
  });

  if (existingUser) {
    throw createError({
      message: "Username already taken",
      statusCode: 400
    });
  }

  const passwordHash = await hash(password);
  const userId = generateIdFromEntropySize(10);

  // Create user in the database
  const user = await prisma.user.create({
    data: {
      id: userId,
      username,
      password_hash: passwordHash
    }
  });

  // Create a session
  const session = await lucia.createSession(user.id, {});
  appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
});
