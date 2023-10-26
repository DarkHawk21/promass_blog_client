<template>
  <main>
    <form class="form_container" @submit.prevent="handleSubmit">
      <h2 class="align_center">Crear cuenta</h2>

      <label class="form_label_control">Nombre:</label>
      <input
        type="text"
        v-model="name"
        placeholder="Juan Andrés Pérez"
        class="form_control"
      />

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

      <label class="form_label_control">Repite la contraseña:</label>
      <input
        type="password"
        v-model="password_confirmation"
        placeholder="********"
        class="form_control"
        style="margin-bottom:5px;"
      />

      <p class="text-red-500 mb-5" v-if="password != password_confirmation">Las contraseñas no coinciden.</p>

      <button class="btn w_100" type="submit">Crear cuenta</button>
      <p class="text-center pt-3">¿Ya tienes una cuenta?</p>
      <router-link to="/login" class="flex justify-center btn bg_blue">Iniciar sesión</router-link>
    </form>
  </main>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from "vue-router";
  import { useUserStore } from "../stores/UserStore";

  const router = useRouter();

  const userStore = useUserStore();

  const name = ref("");
  const email = ref("");
  const password = ref("");
  const password_confirmation = ref("");

  const canLogin = computed(() => {
    return name.value
      && email.value
      && password.value
      && password_confirmation.value
      && password.value === password_confirmation.value;
  });

  const handleSubmit = async () => {
    if (canLogin.value) {
      await userStore.register({
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
      });

      router.replace({ name: 'login' });
    }
  };
</script>

<style lang="scss" scoped>
  @import '../assets/styles/views/login.scss';
</style>
