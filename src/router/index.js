import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/loading"
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/views/register.vue")
  },
  {
    path: "/index",
    name: "index",
    component: () => import(/* webpackChunkName: "index" */ "@/views/index.vue")
  },
  {
    path: "/free",
    name: "free",
    component: () => import(/* webpackChunkName: "detail" */ "@/views/free.vue")
  },
  {
    path: "/loading",
    name: "loading",
    component: () => import(/* webpackChunkName: "detail" */ "@/views/loading.vue")
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
