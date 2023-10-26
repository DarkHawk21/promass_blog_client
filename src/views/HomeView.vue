<template>
  <ModalAddEntry
    v-if="showModalAddEntry"
    @hide-modal-add-entry="showModalAddEntry = false"
  />

  <div class="container pt-10">
    <h1 class="text-center">Blog</h1>
    <h4 class="text-center">Una colección de 29 publicaciones.</h4>

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
      <div class="card" v-for="entry in entries" :key="entry.id">
        <div class="card_head">
          <h3>{{ entry.title }}</h3>
        </div>

        <div class="card_body mb-5">
          <p>{{ entry.content }}</p>
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
  import { onMounted, ref } from "vue";
  import { storeToRefs } from "pinia";
  import { useUserStore } from "../stores/UserStore";
  import { useEntryStore } from "../stores/EntryStore";
  import ModalAddEntry from "../components/ModalAddEntryComponent.vue";

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
