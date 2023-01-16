<template>
    <div class="q-pa-xl">
        
        <div class="flex flex-center column">
            <h1 class="q-mb-md" color="title-color">Connectez-vous</h1>
            <q-card>
                <q-card-section>
                    <q-input label="Email" type="email" outlined class="q-mb-md" v-model="form.email"></q-input>
                    <q-input label="Mot de passe" type="password" outlined class="q-mb-md" v-model="form.password"></q-input>
                    <q-btn label="Connexion" class="full-width q-mb-md" color="primary" @click="handleLogin"></q-btn>
                    <p>Vous n'avez pas encore de compte ? <a href="/#/register">Inscrivez-vous</a></p>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script setup>
import { ref} from 'vue'
import { useUserStore } from 'stores/user-store'
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';
const form = ref({
    email:'',
    password: '',
})

const userStore = useUserStore();
const router = useRouter();

// const handleLogin = async () => {
//     // await register(form.value)
// }

const handleLogin = async () => {
    try{
        await userStore.handleLogin(form.value)
        router.push({name:'dashboard'})
    }catch(err){
        Notify.create("Erreur de login", err)
        console.log(err)
    }
}
</script>