<script setup>
import { onMounted, ref } from 'vue'

const url = 'https://pokeapi.co/api/v2/pokemon/'

const team = ref([])
const searchPokemon = ref('')
const pokemon = ref({})

async function fetchPokemon(search) {
  const res = await fetch(url + search)
  pokemon.value = await res.json()
}

async function searchForPokemon() {
  if (searchPokemon.value) {
    await fetchPokemon(searchPokemon.value)
  }
}

onMounted(() => {
  fetchPokemon('1')
})

function addPokemonToTeam() {
  if(team.value.length < 6) {
    team.value.push({
      ...pokemon.value
    })
  }
}

function removePokemonFromTeam(poke) {
  team.value = team.value.filter((p) => {
    return p.id != poke.id
  })
}

function debug(log) {
  console.log(log)
}
</script>

<template>
  <div>
    <h1>Pokemon</h1>
    <div>
      <h2>Search Pokemon:</h2>
      <form @submit.prevent ="searchForPokemon">
          <input v-model="searchPokemon" placeholder="Pokemon"/>
          <button>Search</button>
      </form>
      <form v-if="pokemon" @submit.prevent ="addPokemonToTeam">
        {{ pokemon.id }}
        {{ pokemon.name }}
        <button>Add to Team</button>
      </form>
    </div>
    

    <div>
      <h1>My team:</h1>
      <ul>
        <li v-for="poke in team" :key="poke.id">
          {{ poke.name }}
          {{ debug(poke) }}
          <ul>
            <li v-for="type in poke.types">
              {{ type.type.name }}
              {{ debug(type) }}
            </li>
          </ul>
          <button @click="removePokemonFromTeam(poke)">X</button>
        </li>
      </ul>
    </div>

  </div>
</template>

