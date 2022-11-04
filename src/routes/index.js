import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import WebWorker from "../components/WebWorker.vue";
import Protobuf from "../components/Protobuf.vue";
import TextEncoder from "../components/TextEncoder.vue";

const routes = [
  { path: "/" },
  { path: "/web-worker", component: WebWorker },
  { path: "/text-encoder", component: TextEncoder },
  { path: "/protobuf", component: Protobuf },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
