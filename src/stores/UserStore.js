import axios from 'axios';
import { _TOKEN } from '../config';
import { defineStore } from 'pinia';
import { _API_URL } from '../config';
import { useLoaderStore } from './LoaderStore';
import Swal from 'sweetalert2/dist/sweetalert2';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    token: localStorage.getItem(_TOKEN) || null,
  }),
  actions: {
    async login(loginData) {
      useLoaderStore().loading = true;

      try {
        const { data } = await axios.post(`${_API_URL}/auth/login`, loginData);
        localStorage.setItem(_TOKEN, data.access_token);
        this.token = data.access_token;
        axios.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
        axios.defaults.headers.common.Accept = 'application/json';
        useLoaderStore().loading = false;
      } catch (error) {
        useLoaderStore().loading = false;

        if (error.response.status == 401) {
          Swal.fire({
            timer: 5000,
            icon: 'error',
            position: 'center',
            timerProgressBar: true,
            showConfirmButton: false,
            title: '¡Hubo un error!',
            text: 'Credenciales de acceso incorrectas.'
          });
        }
      }
    },
    async logout() {
      useLoaderStore().loading = true;

      try {
        const response = await axios.post(`${_API_URL}/auth/logout`, this.token);
        localStorage.removeItem(_TOKEN);
        this.token = null;
        axios.defaults.headers.common.Authorization = '';
        useLoaderStore().loading = false;
      } catch (error) {
        useLoaderStore().loading = false;
      }
    },
    async register(registerData) {
      useLoaderStore().loading = true;

      try {
        await axios.post(`${_API_URL}/auth/register`, registerData);
        useLoaderStore().loading = false;

        Swal.fire({
          timer: 5000,
          icon: 'success',
          position: 'center',
          timerProgressBar: true,
          showConfirmButton: false,
          title: '¡Registro exitoso!',
          text: 'Tu cuenta se ha creado satisfactoriamente. Ahora, inicia sesión para comenzar a publicar.'
        });
      } catch (error) {
        useLoaderStore().loading = false;

        Swal.fire({
          timer: 5000,
          icon: 'error',
          position: 'center',
          timerProgressBar: true,
          showConfirmButton: false,
          title: '¡Hubo un error!',
          text: 'Lo sentimos, en este momento no fué posible crear tu cuenta. Por favor inténtalo más tarde.'
        });
      }
    },
  }
});
