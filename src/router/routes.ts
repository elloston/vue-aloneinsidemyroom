import HomeViewVue from "@/views/HomeView.vue";

const routes = [
  { path: "/", component: HomeViewVue },
  { path: "/signup", component: () => import("@/views/SignupView.vue") },
  { path: "/signin", component: () => import("@/views/SigninView.vue") },
];

export default routes;
