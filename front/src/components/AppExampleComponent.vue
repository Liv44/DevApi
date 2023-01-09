<template>
    <div>
        <q-card>
            <q-card-section>
                <p class="text-bold" color="title">{{ props.title }}</p>
                <p>{{ props.description }}</p>
            </q-card-section>
        </q-card>
    </div>
</template>

<script setup>
const props = defineProps(
    {
        title: {type:String},
        description: {type:String}}
    )
</script>