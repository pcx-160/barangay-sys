import { defineStore } from "pinia";
import api from "@/lib/axios";
import router from "../router";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        errors: {},
    }),
    getters: {
        isAdmin: (state) => state.user?.username === "admin",
    },

    actions: {
        async authenticate(apiRoute, formData) {
            try {
                const res = await api.post(`/${apiRoute}`, formData);
                this.user = res.data.user;
                localStorage.setItem("token", res.data.token);
                router.push({ name: "home" });
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        },

        async getUser() {
            try {
                const response = await api.get("/user");
                this.user = response.data;
            } catch (error) {
                this.user = null;
                localStorage.removeItem("token");
                console.log(error);
            }
        },

        async logout() {
            try {
                const res = await api.post("/logout");
                console.log(res.data);
                this.user = null;
                localStorage.removeItem("token");
                router.push({ name: "login" });
            } catch (error) {
                console.error(error);
            }
        },
    },
});
