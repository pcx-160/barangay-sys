import { defineStore } from "pinia";
import api from "@/lib/axios";

export const usePostStore = defineStore("post", {
    state: () => ({
        user: null,
        errors: {},
    }),

    actions: {
        async store(apiRoute, payload) {
            try {
                const formData = new FormData();
                formData.append("title", payload.title);
                formData.append("content", payload.content);
                if (payload.image) {
                    formData.append("image", payload.image);
                }

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

        async editPost(id, formData) {
            try {
                const res = await api.put(`/posts/${id}`, formData);
                console.log(res.data);
            } catch (error) {
                console.error("Error updating post:", error);
            }
        },

        async deletePost(id) {
            try {
                const res = await api.delete(`/posts/${id}`);
                console.log(res.data);
                return res.data;
            } catch (error) {
                console.error(error);
            }
        },
    },
});
