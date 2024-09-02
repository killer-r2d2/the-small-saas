<script setup lang="ts">
import { useUser } from '~/composables/useUser';

const user = useUser();
</script>
<template>
  <div>
    <!-- sample nav  -->
    <nav>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/signup">Signup</NuxtLink>
      <NuxtLink to="/login">Login</NuxtLink>
    </nav>
    <NuxtPage />
    <div v-if="user">
        Welcome, {{ user.username }}!
      </div>
      <div v-else>
        You are not logged in.
      </div>
  </div>
</template>
