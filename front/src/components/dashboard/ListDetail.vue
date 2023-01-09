<template>
    <div  v-if="selectedList" class="q-pa-xl">

      <div class="flex items-center justify-between q-mb-lg">
          <div  class="flex items-center q-gutter-lg">
              <q-btn color="primary" icon="navigate_before" outline @click="router.back"/>
              <p class="text-h1 q-mb-none">{{ selectedList.title }}</p>
          </div>
          <q-btn color="primary" round flat icon="more_vert">
            <q-menu cover auto-close>
              <q-list>
                <q-item clickable @click="toggleUpdateList(router, selectedList)">
                  <q-item-section>Éditer</q-item-section>
                </q-item>
                <q-item clickable @click="toggleDeleteList(router, selectedList)">
                  <q-item-section class="text-red">Supprimer</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
      </div>

      <q-btn class="q-mb-lg" label="+ Ajouter une tâche" outline color="primary" @click="dialogCreateTask = true"/>

      <div class="flex column q-gutter-lg">
        <h1>Tâches - {{ taskStore.tasksToDo.length }}</h1>

        <div v-for="(task, index) of taskStore.tasksToDo" :key="index" class="q-mr-xl">
          <TaskItem :task="task"/>
        </div>

        <h1>Tâches complétées - {{ taskStore.tasksDone.length }}</h1>

        <div v-for="(task, index) of taskStore.tasksDone" :key="index">
          <TaskItem :task="task"/>
        </div>
      </div>
    </div>

    <q-dialog v-model="dialogCreateTask">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Nouvelle tâche</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p class="q-mb-none">Titre</p>
          <q-input dense v-model="newTask.title" autofocus @keyup.enter="dialogCreateTask = false" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <p class="q-mb-none">Description</p>
          <q-input dense v-model="newTask.description" @keyup.enter="dialogCreateTask = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Annuler" v-close-popup />
          <q-btn flat label="Ajouter" v-close-popup @click="create" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup>
import { Notify } from 'quasar';
import { getTasksByListId, createTask } from 'src/services/tasks';
import { toggleUpdateList, toggleDeleteList } from 'src/services/dialogListService.js';
import { useListStore } from 'src/stores/lists-store';
import { useTaskStore } from 'src/stores/tasks-store';
import { onMounted, ref, computed} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TaskItem from './TaskItem.vue';

const dialogCreateTask = ref(false);
const route = useRoute();
const router = useRouter();
const listStore = useListStore();
const taskStore = useTaskStore();
const newTask = ref({title:''});

const getSelectedList = listStore.getSelectedList
const selectedList = computed(()=> getSelectedList(route.params.id))

// const tasksDone = computed(()=>taskStore.tasks.filter((task)=> task.isDone))
// const tasksToDo = computed(()=>taskStore.tasks.filter((task)=> !task.isDone))

const create = async () => {
  try{
    await createTask({...newTask.value, listId: route.params.id})
    await taskStore.fillTasks(route.params.id);
    newTask.value = {title:''};
  }catch(err){
    Notify.create("Il y a eu une erreur lors de l'ajout de la tâche.")
    console.error(err)
  }
}

onMounted(async ()=>{
  try{   
    await taskStore.fillTasks(route.params.id);
  }catch(err){
    Notify.create("Il y a eu une erreur lors du chargement des tâches.")
    console.error(err)
  }
})
</script>