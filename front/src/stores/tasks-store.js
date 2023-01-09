import { defineStore } from 'pinia'
import { getTasksByListId } from 'src/services/tasks';

export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: [],
        tasksDone: [],
        tasksToDo: [],
    }),

    getters: {
    },

    actions: {
        async fillTasks(listId) {
            try {
                this.tasks = [];
                this.tasksDone = [];
                this.tasksToDo = [];
                const res = await getTasksByListId(listId);
                this.tasks = res.data
                this.tasksDone = res.data.filter((task) => task.isDone)
                this.tasksToDo = res.data.filter((task) => !task.isDone)
            } catch (err) {
                throw new Error(err)
            }
        },
    }
})
