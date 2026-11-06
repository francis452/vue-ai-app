<script setup lang="ts">
import type { HomeEntry } from '../../data/home'

defineProps<{ entry: HomeEntry }>()
const emit = defineEmits<{ select: [entry: HomeEntry] }>()
</script>

<template>
  <button type="button" class="flex h-full min-h-[76px] w-full min-w-0 items-center gap-3 rounded-lg border border-transparent bg-white px-3 py-3 text-left text-inherit transition-colors hover:border-blue-400/50 hover:bg-blue-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-[#1e2e4b] dark:focus-visible:outline-blue-300" :aria-label="`查看${entry.title}`" @click="emit('select', entry)">
    <span class="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-blue-300/40 bg-linear-to-br from-blue-100 via-blue-200 to-blue-400/50 text-blue-600 shadow-sm" aria-hidden="true">
      <svg class="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path :d="entry.iconPath" />
      </svg>
    </span>
    <span class="min-w-0">
      <span class="block text-xs leading-4 font-semibold wrap-anywhere">{{ entry.title }}</span>
      <span class="mt-1 block text-[11px] leading-4 opacity-80 wrap-anywhere">{{ entry.description }}</span>
    </span>
  </button>
</template>
