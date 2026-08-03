import { defineStore } from 'pinia';

export default defineStore('user', {
  state: () => ({
    username: '',
    userId: '',
    token: '',
    role: '',
    authCodes: [] as Array<string>,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    clear() {
      this.$reset();
      localStorage.clear();
    },
    patch(
      data: Partial<{
        username: string;
        token: string;
        userId: string;
        role: string;
        authCodes: string[];
      }>,
    ) {
      this.$patch(data);
    },
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage }],
  },
});
