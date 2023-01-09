<template>
    <div class="bg-grey q-mb-lg rounded-borders flex justify-between q-pa-sm">
            <div class="flex items-center">
              <q-checkbox class="start" size="lg" v-model="task.isDone" :color="task.isDone ? 'green': 'primary'" @click="update"/>
              <div class="flex column" :style="task.isDone ?{'text-decoration':'line-through'} : ''">
                <p class="q-mb-none text-h6 text-decoration-line" >{{task.title}}</p>
                <p class="q-mb-none text-caption" >{{task.description}}</p>
              </div>

            </div>
            <q-btn color="primary" round flat icon="more_vert" >
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable @click="dialogUpdateTask = true">
                    <q-item-section>Éditer</q-item-section>
                  </q-item>
                  <q-item clickable @click="toggleDeleteTask(router, task)">
                    <q-item-section class="text-red">Supprimer</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>

    <q-dialog v-model="dialogUpdateTask" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Your address</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="updatedTask.title" autofocus @keyup.enter="dialogUpdateTask = false" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input dense v-model="updatedTask.description" @keyup.enter="dialogUpdateTask = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Annuler" v-close-popup />
          <q-btn flat label="Modifier" v-close-popup @click="update" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { updateTask } from 'src/services/tasks';
import { toggleDeleteTask } from 'src/services/dialogTaskService.js';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';
import { useTaskStore } from 'src/stores/tasks-store';


const dialogUpdateTask = ref(false);
const props = defineProps({task: {type:Object}})
const task = ref(props.task)
const router = useRouter();
const taskStore = useTaskStore();
const updatedTask = ref({title:task.value.title, description:task.value.description})

const update = async() => {
    try{
      await updateTask({taskId: task.value._id, title: updatedTask.value.title, description: updatedTask.value.description, isDone: task.value.isDone})
      await taskStore.fillTasks(task.value.list);
    } catch(err){
        Notify.create('Il y a eu une erreur lors de la modification de la tâche.')
        console.error(err);
    }
}

const deleteTask = async() => {
    try{
        await deleteTask(taskId)
    }catch(err){
      Notify.create('Il y a eu une erreur lors de la suppression de la tâche.')
      console.error(err);

    }
}

</script>