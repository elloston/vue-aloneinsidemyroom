/**
 * router/routes.ts
 */

import HomeViewVue from "@/views/HomeView.vue";
import { useAuthStore } from "@/stores/authStore";

function removeQueryParams(to) {
  if (Object.keys(to.query).length)
    return { path: to.path, query: {}, hash: to.hash };
}

const routes = [
  { path: "/", component: HomeViewVue },
  { path: "/signup", component: () => import("@/views/SignupView.vue") },
  { path: "/signin", component: () => import("@/views/SigninView.vue") },
  {
    path: "/oauth",
    component: { template: "<div>OAuth</div>" },
    beforeEnter: (to) => {
      const authStore = useAuthStore();
      const token = to.query.token;

      if (token) {
        authStore.setToken(token);
        authStore.getUser();
        return { path: "/" };
      }
    },
  },
];

export default routes;
