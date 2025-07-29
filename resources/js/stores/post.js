import { defineStore } from "pinia";
import api from "@/lib/axios";

export const usePostStore = defineStore("post", {
    state: () => ({
        user: null,
        errors: {},
    }),

    actions: {
        async store(apiRoute, formData) {
            try {
                const res = await api.post(`/${apiRoute}`, formData);
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        },

        async getAllPosts() {
            try {
                const res = await api.get("/posts");
                console.log(res.data);
                return res.data;
            } catch (error) {
                console.error(error);
            }
        },
    },
});
