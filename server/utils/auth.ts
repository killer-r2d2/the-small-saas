// server/utils/auth.ts

// This is the main authentication library you're using. It handles the core logic for user authentication, including session management and user management.
import { Lucia } from "lucia";

// This adapter allows Lucia to work with your Prisma ORM, enabling Lucia to interact with your PostgreSQL database through Prisma.
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

// This is the Prisma client that interacts with your PostgreSQL database. It provides methods to perform CRUD operations on your database models.
import { PrismaClient } from "@prisma/client";

// An instance of PrismaClient that will be used to access your database. This client is essential for performing database operations like creating users, managing sessions, etc.
const client = new PrismaClient();

// An instance of PrismaAdapter that connects Lucia with Prisma. The adapter uses the session and user models defined in your Prisma schema to manage authentication data.
const adapter = new PrismaAdapter(client.session, client.user);

//  This is the instance of Lucia configured for your application. It uses the PrismaAdapter to interact with the database.
export const lucia = new Lucia(adapter, {

  // sessionCookie: This configuration defines how session cookies should be handled. The secure attribute is set based on whether the app is running in development or production mode: 
  // If in production (!import.meta.dev is true), the secure flag is set to true, meaning cookies will only be sent over HTTPS.
	sessionCookie: {
		attributes: {
			secure: !import.meta.dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			username: attributes.username
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
}