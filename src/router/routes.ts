/**
 * router/routes.ts
 */

import PostsViewVue from "@/views/PostsView.vue";
import { useAuthStore } from "@/stores/authStore";

function removeQueryParams(to) {
  if (Object.keys(to.query).length)
    return { path: to.path, query: {}, hash: to.hash };
}

const routes = [
  { path: "/", component: PostsViewVue },
  {
    path: "/posts/:id",
    component: () => import("@/views/PostDetailsView.vue"),
  },
  {
    path: "/posts/editor/:id?",
    component: () => import("@/views/PostEditorView.vue"),
  },
  {
    path: "/users/:username",
    component: () => import("@/views/UserView.vue"),
  },
  // Auth
  {
    path: "/compilations",
    component: () => import("@/views/CompilationsView.vue"),
  },
  { path: "/account", component: () => import("@/views/AccountView.vue") },
  { path: "/signin", component: () => import("@/views/SigninView.vue") },
  { path: "/signup", component: () => import("@/views/SignupView.vue") },
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
