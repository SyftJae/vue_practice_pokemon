<script setup>
import { ref } from 'vue'

const loginInput = ref("")
</script>

<template>
<div>
  <input v-model="loginInput" />
</div>
</template>