<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NCard, NModal, NPopover } from 'naive-ui'
import { helpDocuments } from '../../data/home'

const selected = ref<typeof helpDocuments[number] | null>(null)
</script>

<template>
  <NCard tag="section" aria-labelledby="help-heading">
    <h2 id="help-heading" class="m-0 mb-3 text-sm font-semibold text-inherit">新手文档</h2>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <ul v-for="group in 3" :key="group" class="m-0 list-none space-y-1 rounded-lg bg-white p-3 dark:bg-[#1e2e4b]" :aria-label="`新手文档第 ${group} 组`">
        <li v-for="document in helpDocuments" :key="document.id" class="min-w-0">
          <NPopover trigger="hover" placement="top" :delay="0">
            <template #trigger>
              <button type="button" class="cursor-pointer min-h-11 w-full truncate rounded-sm text-left text-xs leading-5 text-inherit hover:text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:hover:text-blue-200 dark:focus-visible:outline-blue-300 md:min-h-8" @click="selected = document">{{ document.title }}</button>
            </template>
            <span class="block max-w-72 text-xs leading-5 wrap-anywhere">{{ document.title }}</span>
          </NPopover>
        </li>
      </ul>
    </div>
    <NModal :show="!!selected" preset="card" :title="selected?.title" class="w-[90vw]! max-w-lg" @update:show="show => { if (!show) selected = null }">
      <p class="m-0 text-sm leading-7">{{ selected?.content }}</p>
      <p class="mt-3 text-xs opacity-70">本地演示文档，请以实际服务商说明为准。</p>
      <template #footer><NButton @click="selected = null">关闭</NButton></template>
    </NModal>
  </NCard>
</template>
