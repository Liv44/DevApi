<template>
  <q-page class="flex flex-center">
    <h1>Exemplep page</h1>
    <p>{{ firstname }} {{ lastname }}</p>
    <p>{{ fullname }}</p>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
  const firstname = ref('Olivia');
  const lastname = ref("Moreau");
  const fullname = computed(()=> `${firstname.value} ${lastname.value}`)
export default defineComponent({
  name: 'IndexPage'
})
</script>
