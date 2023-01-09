<template>
    <div>
        <q-btn @click="emitOnTuto" label="Emit Value"></q-btn>
    </div>
</template>

<script setup>
import { ref } from 'vue'
    const valToEmit = ref('Valeur à emit');
    const emit = defineEmits(['onTuto'])
    const emitOnTuto = () => {
        emit('onTuto', valToEmit)
    }
</script>