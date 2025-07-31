<script setup>
import BaseModal from "../components/BaseModal.vue";
import { onMounted, reactive, ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { usePostStore } from "../stores/post";

const authstore = useAuthStore();
const { store, getAllPosts, editPost, deletePost } = usePostStore();
const showCreateModal = ref(false);
const posts = ref([]);
const isEditing = ref(false);
const editingPostId = ref(null);

const formData = reactive({
    title: "",
    content: "",
    image: null,
});

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        formData.image = file;
        console.log("Image set to formData:", file);
    }
};

const handleSubmit = async () => {
    const realFormData = new FormData();
    realFormData.append("title", formData.title);
    realFormData.append("content", formData.content);
    if (formData.image) {
        realFormData.append("image", formData.image);
    }

    if (isEditing.value) {
        await editPost(editingPostId.value, realFormData);
    } else {
        await store("posts", formData);
    }

    console.log("Submitting:", {
        title: formData.title,
        content: formData.content,
        image: formData.image,
    });

    posts.value = await getAllPosts();
    formData.title = "";
    formData.content = "";
    formData.image = null;
    editingPostId.value = null;
    isEditing.value = false;
    showCreateModal.value = false;
};

const handleCancel = () => {
    showCreateModal.value = false;
    isEditing.value = false;
    formData.title = "";
    formData.content = "";
    formData.image = null;
};

const handleEdit = async (post) => {
    formData.title = post.title;
    formData.content = post.content;
    editingPostId.value = post.id;
    isEditing.value = true;
    showCreateModal.value = true;
    posts.value = await getAllPosts();
};

const handleDelete = async (id) => {
    await deletePost(id);
    posts.value = await getAllPosts();
};

onMounted(async () => {
    posts.value = await getAllPosts();

    //For testing resident acc
    // setInterval(async () => {
    //     posts.value = await getAllPosts();
    // }, 1000);
});
</script>

<template>
    <div v-if="authstore.user" class="h-screen bg-gray-100">
        <div class="ml-64 min-h-screen px-8 py-6 bg-gray-50">
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
                    v-for="post in posts.slice().reverse()"
                    :key="post.id"
                    class="bg-white border border-gray-200 rounded-xl shadow-sm p-6"
                >
                    <div class="flex justify-between items-center mb-2">
                        <h2 class="text-xl font-semibold">
                            {{ post.title }}
                        </h2>

                        <div class="flex items-center gap-2">
                            <span class="text-sm text-gray-400"
                                >MM/DD/YYYY</span
                            >
                            <div
                                v-if="authstore.isAdmin"
                                class="flex items-center gap-2"
                            >
                                <button
                                    @click="handleDelete(post.id)"
                                    class="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 hover:bg-red-200 rounded-md text-sm transition cursor-pointer"
                                >
                                    🗑️ Delete
                                </button>
                                <button
                                    @click="handleEdit(post)"
                                    class="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md text-sm transition cursor-pointer"
                                >
                                    ✏️ Edit
                                </button>
                            </div>
                        </div>
                    </div>

                    <p
                        class="text-gray-600 mb-4 break-words whitespace-pre-wrap md:max-h-60 md:overflow-auto"
                    >
                        {{ post.content }}
                    </p>

                    <!-- /storage/app/public/posts/ -->
                    <div
                        v-if="post.image"
                        class="mb-4 w-full max-w-md mx-auto aspect-video"
                    >
                        <img
                            :src="
                                post.image
                                    ? `/storage/${post.image}`
                                    : 'https://placehold.co/600x300?text=No+Image&font=roboto'
                            "
                            alt="Post Image"
                            class="rounded-lg object-contain"
                        />
                    </div>

                    <div class="flex gap-6 text-sm text-gray-400">
                        <div
                            class="flex items-center gap-1 hover:text-green-600 cursor-pointer transition"
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

            <BaseModal
                :show="showCreateModal"
                :confirmText="isEditing ? 'Update Post' : 'Create Post'"
                @cancel="handleCancel"
                @confirm="handleSubmit"
            >
                <template #title>
                    <h2 class="text-xl font-semibold text-gray-800">
                        {{
                            isEditing
                                ? "Edit Announcement"
                                : "Create Announcement"
                        }}
                    </h2>
                </template>

                <template #body>
                    <div class="space-y-4">
                        <label class="block">
                            <span class="text-sm text-gray-700">Title</span>
                            <input
                                v-model="formData.title"
                                type="text"
                                class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-green-600 focus:border-green-600 focus:outline-none"
                                placeholder="Enter announcement title"
                            />
                        </label>

                        <label class="block">
                            <span class="text-sm text-gray-700">Content</span>
                            <textarea
                                v-model="formData.content"
                                rows="4"
                                class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-green-600 focus:border-green-600 focus:outline-none"
                                placeholder="Write your announcement..."
                            ></textarea>
                        </label>

                        <label class="flex flex-col space-y-3">
                            <span class="text-sm text-gray-700"
                                >Upload Image</span
                            >
                            <input
                                type="file"
                                @change="handleImageUpload"
                                accept="image/*"
                                class="file:mr-4 file:rounded-md file:border-0 file:bg-green-100 file:px-4 file:py-2 file:text-green-700 file:font-semibold file:cursor-pointer hover:file:bg-green-200 text-sm text-gray-700"
                            />
                        </label>
                    </div>
                </template>
            </BaseModal>
        </div>
    </div>
</template>
