import { create } from 'zustand'
import axios from 'axios';

let user = await axios.get('/api/user').catch(function (error) {
   return false;
});;

const useUserStore = create((set) => ({
  user: user,
  login: async (creds) => {
    await axios.get('/sanctum/csrf-clookie');
    await axios.post('/login', creds);
    let user = await axios.get('/api/user');
    set({ user: user.data })
    return user;
  },
  register: async (creds) => {
    await axios.get('/sanctum/csrf-clookie');
    await axios.post('/register', creds);
    let user = await axios.get('/api/user');
    set({ user: user.data })
    return user;
  },
  logout: async () => {
    await axios.post('/logout');
    set({ user: false })
  }
}))

export  default useUserStore;