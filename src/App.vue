<script setup>
import { onMounted } from 'vue'
import { store } from './store'

import { Search, List } from './components'

function debug(log) {
  console.log(log)
}

onMounted(() => {
  store.team.getTeam()
})
</script>

<template>
  <div>
    <h1>Pokemon</h1>
    <Search @addPokemonToTeam="(pokemon) => store.team.addPokemonToTeam(pokemon)"/>
    <List @removePokemonFromTeam="(pokemon) => store.team.removePokemonFromTeam(pokemon)" :team="store.team.value"/>
  </div>
</template>

