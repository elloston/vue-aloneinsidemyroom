import { defineStore } from "pinia";
import api from "@/api";

interface User {
  id: number;
  name: string;
  email: string;
  roles: UserRole[];
}

interface UserRole {
  name: string;
}

interface Credentials {
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", {
  state: (): {
    user: User | null;
    token: string | null;
  } => ({
    user: null,
    token: localStorage.getItem("user_token"),
  }),
  getters: {
    isAuthorized: (state) => {
      return (requiredRoles: string[]) =>
        requiredRoles.some((role) =>
          state.user?.roles.some((userRole) => userRole.name === role)
        );
    },
  },
  actions: {
    async getUser() {
      try {
        if (!this.token) return;
        const { data } = await api.get("user");
        this.user = data;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async signup(credentials: Credentials) {
      try {
        const { data } = await api.post<{ token: string }>(
          "signup",
          credentials
        );
        this.token = data.token;
        localStorage.setItem("user_token", data.token);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async signin(credentials: Credentials) {
      try {
        const { data } = await api.post<{ token: string }>(
          "signin",
          credentials
        );
        this.token = data.token;
        localStorage.setItem("user_token", data.token);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async signout() {
      if (!this.token) return;
      try {
        await api.post("signout");
        this.user = null;
        this.token = null;
        localStorage.removeItem("user_token");
        delete api.defaults.headers.common["Authorization"];
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
});
