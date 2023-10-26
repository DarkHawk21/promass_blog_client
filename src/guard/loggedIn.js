import moment from 'moment';
import jwtDecode from 'jwt-decode';
import { _TOKEN } from '../config';

export default (to, from, next) => {
  const isNotProtected = [
    'home',
    'login',
    'register'
  ].includes(to.name);

  try {
    const token = jwtDecode(localStorage.getItem(_TOKEN));

    if (token.exp < moment().unix()) {
      throw new Error('Auth token expired');
    }

    next();
  } catch (error) {
    localStorage.removeItem(_TOKEN);

    isNotProtected
      ? next()
      : next({ name: 'login' });
  }
};
