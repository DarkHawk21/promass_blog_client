<template>
  <ModalAddEntry
    v-if="showModalAddEntry"
    @hide-modal-add-entry="showModalAddEntry = false"
  />

  <div class="container pt-10">
    <h1 class="text-center">Blog</h1>
    <h4 class="text-center" v-if="entries.length > 1">Una colección de {{ entries.length }} publicaciones.</h4>
    <h4 class="text-center" v-else-if="entries.length == 1">Una colección de {{ entries.length }} publicación.</h4>
    <h4 class="text-center" v-else>GRUPO PROMASS</h4>

    <div class="py-5">
      <h3>Puedes filtrar por:</h3>

      <div class="flex gap-7 p-5 items-start">
        <div class="form_control_container">
          <label class="form_label_control">Palabra clave:</label>
          <input type="text" class="form_control" placeholder="Introduce título o contenido" v-model="filters.keyword">
        </div>

        <div class="form_control_container">
          <label class="form_label_control">Autor:</label>
          <select class="form_control" v-model="filters.author_id">
            <option :value="null">...</option>
            <option :value="author.id" v-for="author in authors" :key="author.id">{{ author.name }}</option>
          </select>
        </div>

        <div class="flex gap-2">
          <span>
            <label class="form_label_control">&nbsp;</label>
            <button class="btn bg_orange" @click="cleanFilters">Limpiar filtros</button>
          </span>

          <span v-if="token">
            <label class="form_label_control">&nbsp;</label>
            <button class="btn" @click="showModalAddEntry = true">Agregar</button>
          </span>

          <span>
            <label class="form_label_control">&nbsp;</label>
            <button class="btn bg_blue" @click="entryStore.getAll(filters)">Buscar</button>
          </span>
        </div>
      </div>
    </div>

    <div class="p-5 flex row items-start justify-center flex-wrap gap-20" v-if="entries.length > 0">
      <div class="card cursor-pointer hover:bg-slate-100" v-for="entry in entries" :key="entry.id">
        <div class="card_head">
          <h3 class="text-center mb-2">
            <strong>{{ entry.title }}</strong>
          </h3>

          <p class="text-sky-500">Autor: <strong>{{ entry.author.name }}</strong></p>
          <p class="text-sky-500">Creada el <strong>{{ moment(entry.created_at).format("D/MM/Y") }}</strong> a las <strong>{{ moment(entry.created_at).format("HH:mm") }}</strong></p>
        </div>

        <div class="card_body mb-5">
          <p v-if="entry.content.length > 70">
            {{ entry.content.substring(0, 70) }}...
            <router-link
              :to="`/entry/${entry.id}`"
              class="text-blue-600"
            >ver más.</router-link>
          </p>
          <p v-else>{{ entry.content }}</p>
        </div>

        <div class="card_footer flex justify-end mt-5">
          <router-link :to="`/entry/${entry.id}`" class="btn">Ver completa</router-link>
        </div>
      </div>
    </div>

    <div class="p-5 flex row items-start justify-center flex-wrap gap-20" v-else>
      <div class="card text-center bg-gray-50" style="width:100%;">
        <h3>No encontramos publicaciones que cumplan con los filtros seleccionados.</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref, inject } from "vue";
  import { storeToRefs } from "pinia";
  import { useUserStore } from "../stores/UserStore";
  import { useEntryStore } from "../stores/EntryStore";
  import ModalAddEntry from "../components/ModalAddEntryComponent.vue";

  const moment = inject("moment");

  const filters = ref({
    keyword: "",
    author_id: null,
  });

  let showModalAddEntry = ref(false);

  const userStore = useUserStore();
  const { token } = storeToRefs(userStore);

  const entryStore = useEntryStore();
  const { entries, authors } = storeToRefs(entryStore);

  onMounted(async () => {
    await entryStore.getAll(filters.value);
    await entryStore.getAuthors();
  });

  const cleanFilters = () => {
    filters.value = {
      keyword: "",
      author_id: null,
    };
  };
</script>
