import { Dialog, Notify } from 'quasar'
import { useTaskStore } from 'stores/tasks-store.js';
import { useRoute } from 'vue-router';
import { deleteTask } from './tasks';

const tasksStore = useTaskStore();
const route = useRoute();

export const toggleDeleteTask = async (router, task) => {
    Dialog.create({
        title: 'Supprimer la tâche',
        message: `Tu es sur le point de supprimer la tâche "${task.title}". Es-tu sûr(e) ?`,
        ok: {
            label: 'Supprimer',
            push: true,
            color: 'negative'
        },
        cancel: {
            label: 'Annuler',
            push: true,
            outline: true,
        }
    }).onOk(async data => {
        try {
            await deleteTask(task._id);
            await tasksStore.fillTasks(task.list);
        } catch (err) {
            Notify.create('Il y a eu une erreur lors de la suppression de la tâche.')
            console.error(err)
        }
    })
}