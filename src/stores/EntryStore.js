import axios from 'axios';
import { defineStore } from 'pinia';
import { _API_URL } from '../config';
import { useLoaderStore } from './LoaderStore';
import Swal from 'sweetalert2/dist/sweetalert2';

export const useEntryStore = defineStore('entry', {
  state: () => ({
    entries: [],
    authors: []
  }),
  actions: {
    async getAll(params) {
      useLoaderStore().loading = true;

      try {
        const { data } = await axios.get(`${_API_URL}/entries`, { params });
        this.entries = data;
        useLoaderStore().loading = false;
      } catch (error) {
        useLoaderStore().loading = false;
      }
    },
    async getAuthors() {
      useLoaderStore().loading = true;

      try {
        const { data } = await axios.get(`${_API_URL}/users-who-has-entries`);
        this.authors = data;
        useLoaderStore().loading = false;
      } catch (error) {
        useLoaderStore().loading = false;
      }
    },
    async storeOne(entry) {
      useLoaderStore().loading = true;

      try {
        await axios.post(`${_API_URL}/entries`, entry);
        useLoaderStore().loading = false;

        Swal.fire({
          timer: 5000,
          icon: 'success',
          position: 'center',
          timerProgressBar: true,
          showConfirmButton: false,
          title: '¡Publicación creada!',
          text: 'Se ha guardado satisfactoriamente la nueva publicación.'
        });
      } catch (error) {
        useLoaderStore().loading = false;
      }
    }
  }
});
