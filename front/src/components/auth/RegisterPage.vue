<template>
    <div class="q-pa-xl">
        
        <div class="flex flex-center column">
            <h1 class="q-mb-md">Inscrivez vous</h1>
            <q-card>
                <q-card-section>
                    <q-input label="Nom" type="text" outlined class="q-mb-md" v-model="form.firstname"></q-input>
                    <q-input label="Prénom" type="text" outlined class="q-mb-md" v-model="form.lastname"></q-input>
                    <q-input label="Email" type="email" outlined class="q-mb-md" v-model="form.email"></q-input>
                    <q-input label="Mot de passe" type="password" outlined class="q-mb-md" v-model="form.password"></q-input>
                    <q-checkbox label="tems and condictions" v-model="form.terms_and_conditions"></q-checkbox>
                    <q-btn label="s'inscrire" class="full-width q-mb-md" color="primary" @click="handleRegister"></q-btn>
                    <p>Vous avez déjà un compte ? <a href="/#/login">Connectez-vous</a></p>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script setup>
import { ref} from 'vue'
import { register } from 'src/services/users'
import { useUserStore } from 'stores/user-store'
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';

const form = ref({
    email:'',
    password: '',
    firstname:'',
    lastname:'',
    terms_and_conditions: false
})

const userStore = useUserStore();
const router = useRouter();

const handleRegister = async () => {
    try{
        await userStore.handleRegister(form.value)
        router.push({name:'dashboard'})
    }catch(err){
        Notify.create("Erreur de login", err)
        console.log(err)
    }
}
</script>