<template>
    <q-card class="my-card" style="width:400px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.14);">
      <q-card-section class="bg-grey">
        <div class="row items-center justify-between no-wrap">
          <div>
            <div class="text-h6">{{ props.list.title }}</div>
          </div>

          <div class="col-auto">
            <q-btn color="primary" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable @click="router.push({ name: 'list', params: { id: props.list._id }})">
                    <q-item-section>Voir</q-item-section>
                  </q-item>
                  <q-item clickable @click="toggleUpdateList(router, props.list)">
                    <q-item-section>Éditer</q-item-section>
                  </q-item>
                  <q-item clickable @click="toggleDeleteList(router, props.list)">
                    <q-item-section class="text-red">Supprimer</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div v-if="tasks.length===0">
            <p>Cette liste ne contient aucune tâche. Ajoutez-en une depuis la liste ! ✅</p>
            <q-btn label="Voir ma liste" class="bg-primary text-white" :to="{ name: 'list', params: { id: props.list._id }}" />
        </div>
        <div v-else>
          <div class="flex column items-start">
              <q-checkbox class="start" v-model="tasks[0].isDone" :label=tasks[0].title @click="update(tasks[0])"/>
              <div v-if="tasks[1]">
              <q-checkbox class="start" v-model="tasks[1].isDone" :label=tasks[1].title @click="update(tasks[1])"/>
              </div>
          </div>
          <hr>
          <router-link :to="{ name: 'list', params: { id: props.list._id }}" class="text-primary text-center text-h4 no-underline">Voir la liste complète</router-link>
        </div>
      </q-card-section>
    </q-card>
</template>


<script setup>
import { Notify } from 'quasar';
import { ref, onMounted } from 'vue';
import { getTasksByListId, updateTask } from 'src/services/tasks.js'
import { useRouter } from 'vue-router';
import { toggleUpdateList, toggleDeleteList } from 'src/services/dialogListService.js';

const router = useRouter()

const tasks = ref([])

const props = defineProps({list: {type:Object}})

const update = async(task) => {
    try{
      await updateTask({taskId: task._id, isDone: task.isDone})
    } catch(err){
        Notify.create('Il y a eu une erreur lors de la modification de la tâche.')
        console.error(err);
    }
}

onMounted( async()=>{
    try{
        const res = await getTasksByListId(props.list._id)
        tasks.value = res.data
    }catch(err){
        Notify.create('Error on task')
        console.log(err);
    }
})

</script>