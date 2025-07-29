import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "login",
            component: () => import("@/auth/Login.vue"),
            meta: { guest: true },
        },
        {
            path: "/register",
            name: "register",
            component: () => import("@/auth/Register.vue"),
            meta: { guest: true },
        },
        {
            path: "/home",
            name: "home",
            component: () => import("@/pages/Home.vue"),
            meta: { auth: true },
        },
    ],
});

router.beforeEach(async (to, from) => {
    const authStore = useAuthStore();
    await authStore.getUser();

    if (authStore.user && to.meta.guest) {
        return { name: "home" };
    }

    if (!authStore.user && to.meta.auth) {
        return { name: "login" };
    }
});

export default router;
