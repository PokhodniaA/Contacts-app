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
    path: "/edit/:id",
    name: "Edit",
    component: Edit,
    props: true,
    beforeEnter(to, { name }, next) {
      (name == 'Home') ? next() : next('/'); // Have an issue. I don't know how it fixed.
    },
  },
];

const router = new VueRouter({
  routes
});

export default router;
