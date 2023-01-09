<template>
    <div class="text-center">
        <h1 class="text-purple text-bold text-center q-mb-md">Hello, {{ fullname }} ! 👋</h1>
        <div v-if="listStore.lists.length === 0">
            <p class="text-h4"> Tu n’as aucune liste de tâche pour le moment. Crées-en une en cliquant sur le bouton ci-dessous.</p>
            <q-btn label="Créer une liste" @click="toggleAddList"/>
        </div>
        <div v-else class="flex column justify-center items-center q-gutter-lg">
            <p class="text-h4">Voici les dernières tâches/listes que tu as ajouté.</p>
            <div v-for="(list, index) in listStore.sortedLists.slice(0,2)" :key="index">
                <CardList :list="list"></CardList>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Notify } from 'quasar';
import { ref, onMounted } from 'vue';
import { getUserInfos } from 'src/services/users';
import { useListStore } from 'src/stores/lists-store';
import CardList from './CardList.vue';



const fullname = ref('');
const listStore = useListStore();

onMounted(async()=> {
    try {
        const res = await getUserInfos()
        fullname.value = res.data.user.firstname + ' ' + res.data.user.lastname
        console.log(res);
    }catch(err){
        Notify.create('Error on loading user.')
        console.log(err)
    }
})


</script>