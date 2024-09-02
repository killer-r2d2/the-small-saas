import { useUser } from '~/composables/useUser'; // Adjust the path as necessary

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useUser();

  // Allow access to login and signup pages without authentication
  if (to.path === "/login" || to.path === "/signup") {
    return;
  }

  // If user data already exists, allow the route
  if (user.value) {
    return;
  }

  // If user data doesn't exist, try to fetch it
  try {
    const data = await $fetch("/api/user");
    user.value = data; // Set the user data if fetch is successful
  } catch (error) {
    console.log("Failed to fetch user data:", error);
    return navigateTo("/login"); // Redirect to login if fetching user data fails
  }
});
