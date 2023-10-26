<template>
  <main>
    <form class="form_container" @submit.prevent="handleSubmit">
      <h2 class="align_center">Iniciar sesión</h2>

      <label class="form_label_control">Correo electrónico:</label>
      <input
        type="email"
        v-model="email"
        placeholder="ejemplo@ejemplo.com"
        class="form_control"
      />

      <label class="form_label_control">Contraseña:</label>
      <input
        type="password"
        v-model="password"
        placeholder="********"
        class="form_control"
      />

      <button class="btn w_100" type="submit">Iniciar sesión</button>
      <p class="text-center pt-3">¿No tienes una cuenta?</p>
      <router-link to="/register" class="flex justify-center btn bg_blue">Crear una cuenta</router-link>
    </form>
  </main>
</template>

<script setup>
  import { ref, computed, watch } from 'vue';
  import { storeToRefs } from "pinia";
  import { useRouter } from "vue-router";

  import { useUserStore } from "../stores/UserStore";

  const router = useRouter();

  const userStore = useUserStore();
  const { token } = storeToRefs(userStore);

  const email = ref("");
  const password = ref("");

  const canLogin = computed(() => {
    return email.value && password.value;
  });

  const handleSubmit = () => {
    if (canLogin.value) {
      userStore.login({ email: email.value, password: password.value });
    }
  };

  if (token.value) {
    router.replace({ name: 'home' });
  }

  watch(token, (token) => {
    if (token) {
      router.replace({ name: 'home' });
    }
  });
</script>

<style lang="scss" scoped>
  @import '../assets/styles/views/login.scss';
</style>
