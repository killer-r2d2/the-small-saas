<script lang="ts" setup>
import { ref } from 'vue';

const errorMessage = ref<string | null>(null);

async function signup(e: Event) {
  errorMessage.value = null; // Reset error message before submitting
  try {
    await $fetch("/api/signup", {
      method: "POST",
      body: new FormData(e.target as HTMLFormElement)
    });
    await navigateTo("/");
  } catch (error: unknown) {
    if (error instanceof Error && 'data' in error) {
      const err = error as { data: { message: string } };
      errorMessage.value = err.data.message;
    } else {
      errorMessage.value = "An unexpected error occurred. Please try again.";
    }
  }
}
</script>

<template>
  <h1>Create an account</h1>
  <form @submit.prevent="signup">
    <label for="username">Username</label>
    <input name="username" id="username" required />
    <br />
    <label for="password">Password</label>
    <input type="password" name="password" id="password" required />
    <br />
    <button type="submit">Continue</button>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </form>
</template>
