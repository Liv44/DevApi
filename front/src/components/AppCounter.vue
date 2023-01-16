<template>
    <div>
        <p>Counter {{ counterStore.counter }}</p>
    </div>
</template>
<script setup>
import { useCounterStore } from 'stores/example-store';
import { computed } from 'vue';
const counterStore = useCounterStore();

</script>