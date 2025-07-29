<!-- components/Sidebar.vue -->
<script setup>
import SidebarItem from "./SidebarItem.vue";
import BaseModal from "./BaseModal.vue";
import { useAuthStore } from "../stores/auth";
import { ref } from "vue";

const authstore = useAuthStore();
const showLogoutModal = ref(false);

const confirmLogout = () => {
    authstore.logout();
    showLogoutModal.value = false;
};
</script>

<template>
    <aside
        class="h-screen w-64 bg-green-600 text-white flex flex-col justify-between fixed left-0 top-0 z-10"
    >
        <!-- Top section -->
        <div>
            <div class="flex justify-center py-4">
                <img
                    src="/assets/brgy-logo.png"
                    alt="Barangay Logo"
                    class="w-45"
                />
            </div>

            <div class="px-4 pb-4">
                <input
                    type="text"
                    placeholder="Search"
                    class="w-full text-white placeholder-white/70 px-4 py-2 rounded-full border-2 border-green-500 focus:outline-none"
                />
            </div>

            <nav class="px-4 space-y-1">
                <SidebarItem icon="🏠" text="Feed" badge="10" />
                <SidebarItem icon="📑" text="Stories" />
                <SidebarItem icon="👥" text="Friends" badge="2" />
                <SidebarItem icon="📦" text="APIs" />
                <SidebarItem icon="💳" text="Subscription" />
                <SidebarItem icon="⚙️" text="Settings" />
                <SidebarItem icon="💬" text="Help & Support" />
            </nav>
        </div>

        <!-- Bottom section -->
        <div class="px-4 pb-4 space-y-3">
            <button
                class="w-full py-2 px-4 rounded-xl flex items-center justify-between hover:bg-green-500 transition"
            >
                <span>Go Pro</span>
                <span>⭐</span>
            </button>

            <div
                class="flex items-center justify-between hover:bg-green-500 transition px-4 py-3 rounded-xl"
            >
                <div class="flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/40"
                        class="w-10 h-10 rounded-full border border-white"
                        alt="Avatar"
                    />
                    <div>
                        <p class="text-sm font-semibold">
                            {{ authstore.user?.username || "Guest" }}
                        </p>
                        <p
                            v-if="authstore.isAdmin"
                            class="text-xs text-white/70"
                        >
                            Barangay Admin
                        </p>
                        <p v-else class="text-xs text-white/70">Resident</p>
                    </div>
                </div>
                <button
                    @click="showLogoutModal = true"
                    class="text-white/70 cursor-pointer"
                >
                    ↩
                </button>
            </div>
        </div>
    </aside>

    <!-- Logout Modal -->
    <BaseModal
        :show="showLogoutModal"
        @cancel="showLogoutModal = false"
        @confirm="confirmLogout"
    >
        <template #title>
            <h2 class="text-xl font-bold mb-4">Confirm Logout</h2>
        </template>
        <template #body>
            <p>Are you sure you want to logout?</p>
        </template>
    </BaseModal>
</template>
