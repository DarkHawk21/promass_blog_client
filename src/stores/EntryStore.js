import axios from 'axios';
import { defineStore } from 'pinia';
import { _API_URL } from '../config';
import { useLoaderStore } from './LoaderStore';

export const useEntryStore = defineStore('entry', {
  state: () => ({
    entry: {},
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
    }
  }
});
