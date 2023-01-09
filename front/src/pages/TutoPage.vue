<template>
    <q-page class="q-pa-xl">
      <h3>Tutorial</h3>
      <p>ref: {{firstname}} {{ lastname }}</p>
      <p>computed : {{fullname}}</p>
      <q-input type="text" v-model="firstname" @onchange="check"/>
        <q-btn @click="reverse" label="reverse"/>
      <h3>Watched</h3>
      <p>Watched {{ watchedValue }}</p>
      <h3>Conditional Rendering</h3>
        <div v-if="bool">
            <p>C'est vrai</p>
        </div>
        <div v-else>
            <p>C'est faux.</p>
        </div>
        <q-btn label="toggle boolean" @click="toggle"></q-btn>
        <h3>Loop rendering</h3>
        <div v-for="(todo, index) in array" :key="index">
            <p>{{ todo.title }}</p>
            <p>{{ todo.description }}</p>
        </div>

        <h4>Custon event</h4>
        <AppEmitVue @on-tuto="handleOnTuto"/>
        <p>{{ emitedValue }}</p>

        <h3>Router & routes (vue-router)</h3>
        <q-btn @click="redirectHomepage" label="Home"></q-btn>
        <q-btn @click="redirectToTutoWithParams" label="Tuto"/>
        <div v-if="route.params.id">
            <p>Params found : {{ route.params.id }}</p>
        </div>

        <h3>Asynchronous Calls</h3>
        <div v-if="loading">
        ...Loading Data</div>
        <div v-else>
            <p>{{ fakeData }}</p>
        </div>

        <h3>Components</h3>
        <div v-for="(todo, index) in array" :key="index">
            <AppExampleComponent :title="todo.title" :description=todo.description></AppExampleComponent>

        </div>

        <h3>Store</h3>
        <div class="flex">
            <q-btn label="-" @click="counterStore.decrement"/>
            <AppCounter class="q-mx-md"/>
            <q-btn label="+" @click="counterStore.increment"/>
            <p class="q-ml-md">double count - {{ counterStore.doubleCount }}</p>
        </div>

        <h3>Api calls</h3>
        <div v-for="(todo, index) in lists" :key="index">
            <AppExampleComponent :title="todo.title" :description=todo.description></AppExampleComponent>
        </div>
    </q-page>
</template>
  
<script setup>
    import { ref, computed, watch, onMounted } from 'vue'
    import AppEmitVue from 'src/components/AppEmit.vue';
    import AppCounter from 'src/components/AppCounter.vue';
    import { useRoute, useRouter } from 'vue-router';
    import AppExampleComponent from 'src/components/AppExampleComponent.vue';
    import { useCounterStore } from 'src/stores/example-store';
    import { getAllLists } from 'src/services/lists'
    import { Notify } from 'quasar'
    const router = useRouter();
    const route = useRoute();
    const firstname = ref('Olivia')
    const lastname = ref("Moreau");
    const fullname = computed(()=> `${firstname.value} ${lastname.value}`)
    const watchedValue = ref('');
    const bool = ref(false);
    const emitedValue = ref();
    const fakeData = ref([]);
    const loading = ref(true);
    const counterStore = useCounterStore();
    const lists = ref();
    const array = ref([
        {title:'title1', description:'description1'},
        {title:'title2', description:'description2'},
        {title:'title3', description:'description3'},
        {title:'title4', description:'description4'},

    ])


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

    watch(firstname, (newVal, oldVal)=> {
        console.log(oldVal, newVal);
        watchedValue.value = newVal + ' Watched'
    })

    const toggle = () => {
        bool.value = !bool.value
    }

    const handleOnTuto = (v) => {
        console.log(v)
        emitedValue.value = v
    }

    const redirectHomepage = ()=> {
        router.push({name:'homepage'})
    }

    const redirectToTutoWithParams = ()=> {
        router.push({name:'tuto-params', params:{id:"12345678"}})
    }

    const asyncCall = async () => {
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(array.value[0])
            }, 3000)
        })
    }

    onMounted(async()=>{
        loading.value = true;
        const asyncValue = await asyncCall();
        fakeData.value = asyncValue;
        loading.value = false;
        try{
            const res = await getAllLists()
            console.log(res)
            lists.value = res.data;
        }catch(err){
            Notify.create("Error on list : ", err)
        }
    })

</script>
  