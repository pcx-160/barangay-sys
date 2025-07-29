<!-- BaseModal.vue -->
<script setup>
defineProps({
    show: Boolean,
    confirmText: {
        type: String,
        default: "Confirm",
    },
});

const emit = defineEmits(["cancel", "confirm"]);
</script>

<template>
    <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
        <div
            class="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl border border-gray-200 transition-all"
        >
            <!-- Title Slot -->
            <div class="mb-4">
                <slot name="title" />
            </div>

            <!-- Body Slot -->
            <div class="text-gray-600 mb-6 text-sm leading-relaxed">
                <slot name="body" />
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-3">
                <button
                    @click="$emit('cancel')"
                    class="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                    Cancel
                </button>
                <button
                    @click="$emit('confirm')"
                    class="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                    {{ confirmText }}
                </button>
            </div>
        </div>
    </div>
</template>
