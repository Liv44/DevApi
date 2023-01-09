import { defineStore } from 'pinia'
import { getAllLists } from 'src/services/lists';

export const useListStore = defineStore('list', {
  state: () => ({
    lists: [],
    selectedList: {},
  }),

  getters: {
    sortedLists: (state) => state.lists.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)),
    getSelectedList: (state) => (id) => {
      return state.lists.find((list) => list._id === id)
    }
  },

  actions: {
    async fillLists() {
      try {
        const res = await getAllLists();
        this.lists = res.data
      } catch (err) {
        throw new Error(err)
      }
    },
  }
})
