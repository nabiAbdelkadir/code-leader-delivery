import Vue from "vue";
import Router from "vue-router";
import order from './order'

Vue.use(Router);


const router = new Router({
    routes: [
        {
            path: "/",
            redirect: "/dashboard",
            component: () => import("@/view/layout/Layout"),
            children: [
                {
                    path: "/",
                    redirect: "/orders",
                    name: "orders",
                    component: () => import("@/view/pages/creation/orders/index.vue"),
                },
                ...order,
                {
                    path: "/custom-pages",
                    name: "custom-pages",
                    component: () => import("@/view/pages/custom_pages/CustomPages.vue"),
                    children: [
                        {
                            path: "profile",
                            name: "profile",
                            component: () => import("@/view/pages/custom_pages/Profile.vue")
                        }
                    ]
                }
            ]
        },//end dashboard layout

        {
            path: "/",
            component: () => import("@/view/pages/auth/login_pages/Login-1"),
            children: [
                {
                    name: "login",
                    path: "/login",
                    component: () => import("@/view/pages/auth/login_pages/Login-1")
                },
            ]
        },

        {
            path: "*",
            redirect: "/404"
        },
        {
            path: "/404",
            name: "404",
            component: () => import("@/view/pages/error/Error-1.vue")
        }

    ]
});
// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    // If no subsequent Middleware exists,
    // the default `next()` callback is returned.
    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {
        // Run the default Vue Router `next()` callback first.
        context.next(...parameters);
        // Than run the subsequent Middleware with a new
        // `nextMiddleware()` callback.
        const nextMiddleware = nextFactory(context, middleware, index + 1);
        subsequentMiddleware({...context, next: nextMiddleware});
    };
}

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware)
            ? to.meta.middleware
            : [to.meta.middleware];

        const context = {
            from,
            next,
            router,
            to,
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({...context, next: nextMiddleware});
    }

    return next();
});
export default router;
