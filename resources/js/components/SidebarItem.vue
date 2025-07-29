<script setup>
defineProps({
    icon: String,
    text: String,
    badge: [String, Number],
});
</script>

<template>
    <div
        class="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-green-500 cursor-pointer transition"
    >
        <div class="flex items-center gap-3">
            <span class="text-lg">{{ icon }}</span>
            <span class="text-sm">{{ text }}</span>
        </div>
        <span
            v-if="badge"
            class="bg-white text-yellow-500 text-xs font-bold px-2 rounded-full"
        >
            {{ badge }}
        </span>
    </div>
</template>
