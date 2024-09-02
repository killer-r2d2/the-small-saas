<template>
  <div>
    <h1>Home</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.username }}
      </li>
    </ul>
  </div>
</template>

<script setup>

const { data: users } = useFetch('/api/getUsers')
// const users = ref([])

// onMounted(async () => {
//   const response = await fetch('/api/getUsers')
//   users.value = await response.json()
// })
</script>
