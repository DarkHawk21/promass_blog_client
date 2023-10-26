<template>
  <div class="container pt-10" v-if="entry.id">
    <h1 class="text-center mb-5">
      <strong>{{ entry.title }}</strong>
    </h1>

    <p class="text-sky-500 text-center">Autor: <strong>{{ entry.author.name }}</strong></p>
    <p class="text-sky-500 text-center mb-10">Creada el <strong>{{ moment(entry.created_at).format("D/MM/Y") }}</strong> a las <strong>{{ moment(entry.created_at).format("HH:mm") }}</strong></p>

    <hr class="mb-10">

    <p>{{ entry.content }}</p>

    <div class="container flex justify-center mt-10">
      <router-link to="/" class="btn">Regresar al inicio</router-link>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, inject } from "vue";
  import { storeToRefs } from "pinia";
  import { useEntryStore } from "../stores/EntryStore";
  import { useRouter } from "vue-router";

  const moment = inject("moment");
  const router = useRouter();

  const entryStore = useEntryStore();
  const { entry } = storeToRefs(entryStore);

  onMounted(async () => {
    const entryId = router.currentRoute.value.params.entryId;
    await entryStore.getOne(entryId);
  });
</script>
