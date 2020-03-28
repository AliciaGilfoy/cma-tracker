import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Home from "../views/Home.vue";
// @ts-ignore
import Admin from "../views/Admin.vue";
// @ts-ignore
import Dashboard from "../views/Dashboard.vue";
// @ts-ignore
import Store from "../views/Store.vue";
// @ts-ignore
import Instructor from "../views/Instructor.vue";
// @ts-ignore
import { authGuard } from "@bcwdev/auth0-vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    beforeEnter: authGuard
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: authGuard
  },
  {
    path: "/store",
    name: "Store",
    component: Store,
    beforeEnter: authGuard
  },
  {
    path: "/instructor",
    name: "Instructor",
    component: Instructor,
    beforeEnter: authGuard
  },

];

const router = new VueRouter({
  routes
});

export default router;
