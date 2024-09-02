import { verify } from "@node-rs/argon2";
import { PrismaClient } from "@prisma/client";
import { lucia } from "~/server/utils/auth"; // Adjust the path as necessary

const prisma = new PrismaClient();

export default eventHandler(async (event) => {
  const formData = await readFormData(event);
  const username = formData.get("username");
  const password = formData.get("password");

  if (typeof username !== "string" || typeof password !== "string") {
    throw createError({ statusCode: 400, message: "Invalid input" });
  }

  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user) {
    throw createError({ statusCode: 400, message: "Invalid username or password" });
  }

  const isValidPassword = await verify(user.password_hash, password);

  if (!isValidPassword) {
    throw createError({ statusCode: 400, message: "Invalid username or password" });
  }

  const session = await lucia.createSession(user.id, {});
  appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
});
