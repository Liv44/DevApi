<template>
    <div>
        <div>
            <q-btn color="primary" icon="mail" outline @click="router.back"/>
            <p>{{ listStore.selectedList.title }}</p>
        </div>
        <q-btn label="+ Ajouter une tâche" outline/>

    </div>
</template>

<script setup>
import { useListStore } from 'src/stores/lists-store';
import { onBeforeMount, onMounted } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';


const route = useRoute();
const router = useRouter();
const listStore = useListStore();
onMounted(()=>{
    listStore.setSelectedList(route.params.id);
})

</script>