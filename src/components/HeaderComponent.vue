<template>
  <header>
    <div class="header_logo_container">
      <img src="/images/logo.png" alt="Logotipo GRUPO PROMASS" />
    </div>

    <div class="header_titles_container">
      <router-link to="/login" class="btn mr-3" v-if="!token">Iniciar sesión</router-link>
      <router-link to="/register" class="btn bg_blue" v-if="!token">Crear una cuenta</router-link>
      <button class="btn bg_red" @click="userStore.logout()" v-if="token">Cerrar sesión</button>
    </div>
  </header>
</template>

<script setup>
  import { storeToRefs } from "pinia";
  import { useUserStore } from "../stores/UserStore";

  const userStore = useUserStore();
  const { token } = storeToRefs(userStore);
</script>

<style lang="scss">
  @import '../assets/styles/components/header.scss';
</style>
