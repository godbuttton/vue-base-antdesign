import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('user', () => {
  const user = ref({})
  function setUser(user) {
    user.value = user
  }
  return { user, setUser }
})
