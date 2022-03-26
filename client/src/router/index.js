import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import Home from "../views/Home.vue";
import Users from "../views/Users.vue";
import CreateUser from "../views/CreateUser.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { title: "Página Home - Login" },
  },
  {
    path: "/register",
    name: "register",
    component: CreateUser,
    meta: { title: "Cadastrar" },
  },
  {
    path: "/users",
    name: "users",
    component: Users,
    meta: { title: "Usuários Cadastrados" },
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({
          name: "home",
        });
      }

      next();
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  next();
});

export default router;
