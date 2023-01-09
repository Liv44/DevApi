<template>
    <div  v-if="listStore.selectedList" class="q-pa-xl">
        <div class="flex items-center justify-between q-mb-lg">
            <div  class="flex items-center q-gutter-lg">
                <q-btn color="primary" icon="navigate_before" outline @click="router.back"/>
                <p class="text-h1 q-mb-none">{{ listStore.selectedList.title }}</p>
            </div>
            <q-btn color="primary" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable @click="toggleUpdateList(router, listStore.selectedList)">
                    <q-item-section>Éditer</q-item-section>
                  </q-item>
                  <q-item clickable @click="toggleDeleteList(router, listStore.selectedList)">
                    <q-item-section class="text-red">Supprimer</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
        </div>
        <q-btn label="+ Ajouter une tâche" outline color="primary"/>
        <div>
        <h1>Tâches - {{ tasksToDo.length }}</h1>
        <div v-for="(task, index) of tasksToDo" :key="index">
          <div>
            <q-checkbox class="start" v-model="task.isDone" :label=task.title />
            <q-btn color="primary" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable >
                    <q-item-section>Éditer</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section class="text-red">Supprimer</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
        <h1>Tâches complétées - {{ tasksDone.length }}</h1>
        <div v-for="(task, index) of tasksDone" :key="index">
          <q-checkbox class="start" v-model="task.isDone" :label=task.title />
        </div>
      </div>
    </div>
</template>

<script setup>
import { Notify } from 'quasar';
import { getTasksByListId } from 'src/services/tasks';
import { useListStore } from 'src/stores/lists-store';
import { onMounted, ref, onBeforeMount} from 'vue';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute();
const router = useRouter();
const listStore = useListStore();
const listSelected = ref();

const allTasks = ref([]);
const tasksToDo = ref([]);
const tasksDone = ref([])

onMounted(async ()=>{
  listStore.setSelectedList(route.params.id);

    try{
      const tasksFound = await getTasksByListId(listStore.selectedList._id)
      console.log({tasksFound});
      allTasks.value = tasksFound.data;
      tasksDone.value = allTasks.value.filter((task)=> task.isDone)
      tasksToDo.value = allTasks.value.filter((task)=> !task.isDone)
    }catch(err){
      Notify.create("Il y a eu une erreur lors du chargement des tâches.")
      console.error(err)
    }
})
</script>