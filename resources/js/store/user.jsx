import { create } from 'zustand'
import axios from 'axios';

let user = await axios.get('https://localhost/api/user').catch(function (error) {
   return false;
});;

const useUserStore = create((set) => ({
  user: user,
  login: async (creds) => {
    await axios.get('https://localhost/sanctum/csrf-clookie');
    await axios.post('https://localhost/login', creds);
    let user = await axios.get('https://localhost/api/user');
    set({ user: user.data })
    return user;
  },
  logout: async () => {
    await axios.post('https://localhost/logout');
    set({ user: false })
  }
}))

export  default useUserStore;