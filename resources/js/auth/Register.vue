<script setup>
import { RouterLink } from "vue-router";
import { reactive, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";

const { authenticate } = useAuthStore();
const { errors } = storeToRefs(useAuthStore());

const formData = reactive({
    username: "",
    password: "",
});

onMounted(() => {
    errors.value = {};
});
</script>

<template>
    <section
        class="min-h-screen flex items-center justify-center bg-gray-100 px-4"
    >
        <div
            class="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2"
        >
            <!-- Left: Branding -->
            <div
                class="hidden md:flex flex-col justify-center items-center bg-cover bg-center"
                style="background-image: url('/assets/form-bg.png')"
            >
                <img
                    src="/assets/brgy-logo.png"
                    alt="Barangay Logo"
                    class="w-80"
                />
            </div>

            <!-- Right: Register Form -->
            <div class="p-8 sm:p-20">
                <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create an Account
                </h2>

                <form
                    @submit.prevent="authenticate('register', formData)"
                    class="space-y-4"
                >
                    <div>
                        <label class="block text-sm font-medium text-gray-700"
                            >Username</label
                        >
                        <input
                            type="text"
                            v-model="formData.username"
                            placeholder="Create a username"
                            class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                        />
                        <p class="text-sm text-red-500" v-if="errors.username">
                            {{ errors.username[0] }}
                        </p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700"
                            >Password</label
                        >
                        <input
                            type="password"
                            v-model="formData.password"
                            placeholder="••••••••"
                            class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
                        />
                        <p class="text-sm text-red-500" v-if="errors.password">
                            {{ errors.password[0] }}
                        </p>
                    </div>

                    <button
                        type="submit"
                        class="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-500 transition duration-200 cursor-pointer"
                    >
                        Register
                    </button>
                </form>

                <p class="text-sm text-center text-gray-600 mt-6">
                    Already have an account?
                    <RouterLink
                        :to="{ name: 'login' }"
                        class="text-green-600 hover:underline"
                    >
                        Sign in
                    </RouterLink>
                </p>
            </div>
        </div>
    </section>
</template>
