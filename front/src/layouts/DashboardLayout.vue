<template>
    <q-layout view="hhh lpR lFf">

        <q-header class="bg-grey text-black" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05)">
      
            <q-toolbar class="q-my-sm">
                <img src="~/assets/todo-logo.svg" />
                <q-toolbar-title class="text-purple">
                    Ynov Task Manager
                </q-toolbar-title>
                <router-link to="/dashboard" class="q-mr-md">Tableau de bord</router-link>
            </q-toolbar>
        </q-header>
  
        <q-drawer show-if-above v-model="leftDrawerOpen" side="left" class="q-pa-lg bg-grey flex">
            <div class="flex column justify-between fit">
                <div>
                    <div class="flex justify-between items-center q-mb-lg">
                        <h4>Mes listes</h4>
                        <q-btn label="+" outline @click="toggleAddList(router)"/>
                    </div>
                    <div v-if="listsFound.length!==0" class="flex column q-gutter-lg">
                        <div v-for="(list, index) in listsFound" :key="index">
                            <h5 class="text-weight-normal cursor-pointer" @click="router.push({name:'list', params:{id:list._id}})"> {{list.title}}</h5>
                        </div>
                    </div>
                    <div v-else>
                        <p>Aucune liste n'a été trouvée. Pour commencer, clique sur le bouton +</p>
                    </div>
                </div> 
                <q-btn class="bg-purple text-white" label="Déconnexion" @click="logout"></q-btn>
            </div>
      </q-drawer>
  
      <q-page-container >
        <router-view class="q-pa-lg" />
      </q-page-container>
  
    </q-layout>
</template>
<script setup>
import { LocalStorage, Notify } from 'quasar';
import { useListStore } from 'src/stores/lists-store';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { toggleAddList } from 'src/services/dialogListService';

const router = useRouter();
const listStore = useListStore()
const listsFound = ref([]);
const loading = ref(true);
const leftDrawerOpen = ref(true)

const logout = () => {
    LocalStorage.clear()
    router.push({name:'homepage'})
}


onMounted(async()=>{
        loading.value = true;
        try{
            await listStore.fillLists()
            listsFound.value = listStore.lists;
            loading.value = false;
        }catch(err){
            loading.value = false;
            Notify.create("Error on list : ", err)
            console.log(err)
        }
    })

</script>
