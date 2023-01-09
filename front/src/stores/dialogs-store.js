import { defineStore } from 'pinia'

export const useDialogsStore = defineStore('list', {
  state: () => ({
    lists: []
  }),

  getters: {},

  actions: {
    async fillLists () {
      try{
        const res = await getAllLists();
        this.lists = res.data
      }catch(err){
        throw new Error(err)
      }
    },
  }
})
