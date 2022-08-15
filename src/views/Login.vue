<script setup>
import { ref } from 'vue'
import store from '../store'

const loginInput = ref("")
</script>

<template>
<div>
  <h2>Login</h2>
  <form @submit.prevent ="store.user.login">
    <input v-model="loginInput" placeholder="Username"/>
    <button>Login</button>
  </form>
</div>
</template>