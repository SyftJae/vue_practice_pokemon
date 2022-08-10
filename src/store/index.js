import { reactive } from 'vue'
import { db } from '../firebase'
import { collection, addDoc, doc, deleteDoc, query, getDocs } from 'firebase/firestore'

const teamRef = collection(db, 'team')

export const store = reactive({
  user: {
    data: {},
    isLoggedin: false,
    login() {
      console.log('user logged in')
    },
    logout() {
      console.log('user logged out')
    }
  },
  team: {
    value: [],
    async getTeam() {
      let q = query(teamRef)
      const querySnapshot = await getDocs(q)
      let temp = []
      querySnapshot.forEach((doc) => {
        temp.push({
          'documentId': doc.id,
          ...doc.data()
        })
      })
      this.value = [...temp]
    },
    async addPokemonToTeam(pokemon) {
      console.log(pokemon)
      if(this.value.length < 6) {
        let relevantData = {
          id: pokemon.id,
          name: pokemon.name,
          nickname: "",
          types: pokemon.types
        }
        let doc = await addDoc(teamRef, { ...relevantData })
        this.value.push({
          'documentId': doc.id,
          ...relevantData
        })
      }
    },
    async removePokemonFromTeam(pokemon) {
      this.value = this.value.filter((p) => {
        return p.documentId != pokemon.documentId
      })
      const pokeRef = doc(db, "team", pokemon.documentId)
      await deleteDoc(pokeRef)
    }
    
  }

})