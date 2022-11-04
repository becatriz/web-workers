import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import WebWorker from "../components/WebWorker.vue";

const routes = [{ path: "/" }, { path: "/web-worker", component: WebWorker }];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
