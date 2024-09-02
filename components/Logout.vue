<script setup lang="ts">
import { useUser } from '~/composables/useUser';
import { navigateTo } from 'nuxt/app';

const user = useUser();

async function logout() {
  try {
    await $fetch('/api/logout', {
      method: 'POST',
    });

    // Clear user state
    user.value = null;

    // Redirect to login page after logout
    await navigateTo('/login');
  } catch (error) {
    console.error("Failed to logout:", error);
    // Optionally, handle the error (e.g., show a notification to the user)
  }
}
</script>
<template>
  <header>
    <nav>
      <!-- Other navigation items -->
      <div v-if="user">
        Welcome, {{ user.username }}!
        <button @click="logout">Logout</button>
      </div>
      <div v-else>
        <a href="/login">Login</a>
      </div>
    </nav>
  </header>
</template>

