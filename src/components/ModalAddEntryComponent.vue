<template>
  <section class="modal_wrap">
    <div class="modal">
      <div class="modal_header">
        <i class="fa-solid fa-xmark" @click="$emit('hideModalAddEntry')"></i>
      </div>

      <div class="modal_body">
        <h4 class="modal_title">Agregando una publicación</h4>

        <div class="form_control_container mt-5">
          <label class="form_label_control">Título: <b class="text-red-500">*</b></label>
          <input type="text" v-model="newEntry.title" class="form_control">
          <legend class="flex justify-end">{{ 230 - newEntry.title.trim().length }} / 230</legend>
        </div>

        <div class="form_control_container">
          <label class="form_label_control">Contenido: <b class="text-red-500">*</b></label>
          <textarea rows="5" class="form_control" style="margin-bottom:10px;" v-model="newEntry.content"></textarea>
          <legend class="flex justify-end">{{ 2500 - newEntry.content.trim().length }} / 2500</legend>
        </div>
      </div>

      <div class="modal_footer">
        <button class="btn bg_red" @click="$emit('hideModalAddEntry')">Cancelar</button>
        <button class="btn" @click="saveNewEntry" v-if="canSave">Guardar</button>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useEntryStore } from "../stores/EntryStore";

  const emitSelf = defineEmits(['hideModalAddEntry']);
  const entryStore = useEntryStore();

  const newEntry = ref({
    title: "",
    content: "",
  });

  const canSave = computed(() => {
    return newEntry.value.title.trim().length > 0 && newEntry.value.content.trim().length > 0;
  });

  const saveNewEntry = async () => {
    await entryStore.storeOne({
      title: newEntry.value.title.trim(),
      content: newEntry.value.content.trim(),
    });

    emitSelf('hideModalAddEntry');

    newEntry.value = {
      title: "",
      content: "",
    };

    await entryStore.getAll();
  };
</script>

<style lang="scss">
  @import "../assets/styles/components/modal.scss";
</style>
