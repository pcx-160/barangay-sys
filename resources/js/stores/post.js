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

        async editPost(id, payload) {
            try {
                const formData = new FormData();
                formData.append("title", payload.title);
                formData.append("content", payload.content);
                formData.append("_method", "PUT"); // Important for Laravel to recognize as PUT request

                if (payload.image instanceof File) {
                    formData.append("image", payload.image);
                }

                const res = await api.post(`/posts/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                return res.data;
            } catch (error) {
                console.error("Error updating post:", error);
                throw error;
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
