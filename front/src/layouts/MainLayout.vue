<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-black">
      
      <q-toolbar class="q-my-sm">
        <img src="~/assets/todo-logo.svg" />
        <q-toolbar-title>
          Ynov Task Manager
        </q-toolbar-title>
        <router-link to="login" class="q-mr-md">Se connecter</router-link>
        <q-btn to="register" color="primary" label="s'inscrire" outline></q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>