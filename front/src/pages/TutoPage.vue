<template>
    <q-page class="q-pa-xl">
      <h1>Tutorial</h1>
      <p>{{firstname}}</p>
        <q-input type="text" v-model="firstname" @onchange="check"/>
        <q-btn @click="reverse" label="reverse"/>
    </q-page>
</template>
  
<script setup>
    import { ref } from 'vue'

    const firstname = ref('Olivia')

    const reverse = () =>{
        if(firstname.value === 'Olivia'){
            firstname.value = "test"
        }else{
            firstname.value = "Nop"
        }
    }
    const check = ()=>{
        console.log(firstname)
    }

</script>
  