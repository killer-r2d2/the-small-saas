<script lang="ts" setup>
async function signup(e: Event) {
  await $fetch("/api/signup", {
    method: "POST",
    body: new FormData(e.target as HTMLFormElement)
  });
  await navigateTo("/");
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
  </form>
</template>
