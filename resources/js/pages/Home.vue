<script setup>
import BaseModal from "../components/BaseModal.vue";
import { reactive, ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { usePostStore } from "../stores/post";
import Sidebar from "../components/Sidebar.vue";

const authstore = useAuthStore();
const { store } = usePostStore();
const showCreateModal = ref(false);
const formData = reactive({
    title: "",
    content: "",
});

const handleCreate = () => {
    store("posts", formData);
    formData.title = "";
    formData.content = "";
    showCreateModal.value = false;
};
</script>

<template>
    <div v-if="authstore.user" class="h-screen bg-gray-100">
        <!-- Fixed Sidebar -->
        <Sidebar />
        <!-- Scrollable Main Content -->
        <div class="ml-64 min-h-screen px-8 py-6 bg-gray-50">
            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-gray-800">Announcements</h1>
                <div v-if="authstore.isAdmin">
                    <button
                        @click="showCreateModal = true"
                        class="w-10 h-10 flex items-center justify-center bg-green-600 hover:bg-green-500 text-white rounded-full shadow-md text-2xl transition cursor-pointer"
                        aria-label="Add Announcement"
                    >
                        +
                    </button>
                </div>
            </div>

            <!-- Announcement Card -->
            <div class="grid gap-6 md:grid-cols-1">
                <div
                    v-for="n in 15"
                    :key="n"
                    class="bg-white border border-gray-200 rounded-xl shadow-sm p-6"
                >
                    <!-- Title + Date -->
                    <div class="flex justify-between items-center mb-2">
                        <h2 class="text-xl font-semibold text-gray-700">
                            Nothing Yet
                        </h2>
                        <span class="text-sm text-gray-400">MM/DD/YYYY</span>
                    </div>

                    <!-- Content -->
                    <p class="text-gray-500 mb-4">
                        There are no announcements at the moment. Stay tuned!
                    </p>

                    <!-- Reactions -->
                    <div class="flex gap-6 text-sm text-gray-400">
                        <div
                            class="flex items-center gap-1 hover:text-pink-500 cursor-pointer transition"
                        >
                            ❤️ <span>0</span>
                        </div>
                        <div
                            class="flex items-center gap-1 hover:text-blue-500 cursor-pointer transition"
                        >
                            💬 <span>0</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <BaseModal
                :show="showCreateModal"
                confirmText="Create Post"
                @cancel="showCreateModal = false"
                @confirm="handleCreate"
            >
                <template #title>
                    <h2 class="text-xl font-semibold text-gray-800">
                        Create Announcement
                    </h2>
                </template>

                <template #body>
                    <div class="space-y-4">
                        <label class="block">
                            <span class="text-sm text-gray-700">Title</span>
                            <input
                                v-model="formData.title"
                                type="text"
                                class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-pink-500 focus:border-pink-500 focus:outline-none"
                                placeholder="Enter announcement title"
                            />
                        </label>

                        <label class="block">
                            <span class="text-sm text-gray-700">Content</span>
                            <textarea
                                v-model="formData.content"
                                rows="4"
                                class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-pink-500 focus:border-pink-500 focus:outline-none"
                                placeholder="Write your announcement..."
                            ></textarea>
                        </label>
                    </div>
                </template>
            </BaseModal>
        </div>
    </div>
</template>
