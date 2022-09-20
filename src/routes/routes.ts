import { createRouter, createWebHashHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import TCMPharmacy from "@/pages/TCM-Pharmacy.vue";
import Pharmacy from "@/pages/Pharmacy.vue";

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "/tcm-pharmacy",
        component: TCMPharmacy,
      },
      {
        path: "/pharmacy",
        component: Pharmacy,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
