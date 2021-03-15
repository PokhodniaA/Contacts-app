import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Edit from "../views/Edit.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/edit",
    name: "Edit",
    component: Edit,
    props: true,
    beforeEnter(to, { name }, next) {
      (name == 'Home') ? next() : next('/');
    },
  },
];

const router = new VueRouter({
  routes
});

export default router;
