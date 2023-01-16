<template>
  <q-page class="flex flex-center row">
    <div class="q-gutter-lg col-6">
      <h1 class="text-primary text-bold" style="font-size:64px">Ynov Tasks Manager</h1>
      <p style="font-size:30px">Essaye ce nouveau gestionnaire de tâches pour la vie de tous les jours</p>
      <q-btn size="xl" color="primary" to='/login' label="Get Started"/>
    </div>
    <img class="col-auto" src="~/assets/image-ynov-tasks.png" />
  </q-page>
</template>

<script setup>
import { defineComponent, ref, computed } from 'vue'
  const firstname = ref('Olivia');
  const lastname = ref("Moreau");
  const fullname = computed(()=> `${firstname.value} ${lastname.value}`)
</script>
