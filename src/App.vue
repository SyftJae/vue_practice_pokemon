<script setup>
import { onMounted, ref } from 'vue'
import { store } from './store'
import { db } from './firebase'
import { collection, addDoc, doc, deleteDoc, query, getDocs } from 'firebase/firestore'

import { Search, List } from './components'

const team = ref([])
const teamRef = collection(db, 'team')

async function addPokemonToTeam() {
  if(team.value.length < 6) {
    console.log("WTF")
    let doc = await addDoc(teamRef, {
      ...pokemon.value
    })
    team.value.push({
      'documentId': doc.id,
      ...pokemon.value
    })
  }
}

async function removePokemonFromTeam(poke) {
  team.value = team.value.filter((p) => {
    return p.documentId != poke.documentId
  })
  const pokeRef = doc(db, "team", poke.documentId)
  await deleteDoc(pokeRef)
}

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

