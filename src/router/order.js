import Vue from "vue";
import VueRouter from "vue-router";
import log from "@/middleware/log";

Vue.use(VueRouter);
export default [
    {
        path: "/",
        name: "vuetify",
        component: () => import("@/view/pages/vue-bootstrap/VueBootstrap.vue"),
        children: [
            {
                path: "/orders",
                name: "orders",
                component: () => import("@/view/pages/creation/orders/index.vue"),
            },
            {
                path: "/orders/:id",
                name: "orderDetails",
                component: () => import("@/view/pages/creation/orders/details.vue")
            },
        ]
    },

]
