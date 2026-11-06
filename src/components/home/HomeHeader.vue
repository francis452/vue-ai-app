<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { NBadge, NButton, NPopover, NSwitch } from 'naive-ui'
import { homeProfile } from '../../data/home'

defineProps<{ dark: boolean }>()
const emit = defineEmits<{ 'update:dark': [value: boolean] }>()
const fullscreen = ref(false)
const fullscreenSupported = ref(false)
const feedback = ref('')
const syncFullscreen = () => { fullscreen.value = !!document.fullscreenElement }

onMounted(() => {
  fullscreenSupported.value = typeof document.documentElement.requestFullscreen === 'function'
  document.addEventListener('fullscreenchange', syncFullscreen)
  syncFullscreen()
})
onBeforeUnmount(() => document.removeEventListener('fullscreenchange', syncFullscreen))

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen()
    else await document.documentElement.requestFullscreen()
    feedback.value = ''
  } catch {
    feedback.value = '无法切换全屏，请使用浏览器的全屏功能。'
  }
}
</script>

<template>
  <header class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-blue-400/10 px-4 py-2 sm:px-5" aria-label="系统顶部栏">
    <div class="flex min-w-0 items-center gap-2">
      <span class="relative inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-cyan-300 via-blue-500 to-indigo-500 shadow-sm" aria-hidden="true">
        <span class="size-4 rounded-full border-2 border-white/70 bg-blue-100"></span>
        <span class="absolute -inset-1 rounded-full border border-blue-400/30"></span>
      </span>
      <p class="m-0 text-base leading-snug font-semibold sm:text-lg">{{ homeProfile.systemName }}</p>
    </div>

    <nav class="flex items-center gap-1 rounded-full bg-blue-100/20 px-2 py-1" aria-label="系统工具">
      <NButton quaternary circle :disabled="!fullscreenSupported" :aria-label="fullscreen ? '退出全屏' : '进入全屏'" @click="toggleFullscreen">
        <template #icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path :d="fullscreen ? 'M4 9h5V4m6 0v5h5M4 15h5v5m6 0v-5h5' : 'M9 4H4v5m11-5h5v5M4 15v5h5m6 0h5v-5'" />
          </svg>
        </template>
      </NButton>
      <NPopover trigger="click" placement="bottom-end">
        <template #trigger>
          <NButton quaternary circle :aria-label="`消息通知，${homeProfile.notificationCount} 条演示消息`">
            <NBadge :value="homeProfile.notificationCount" :max="99">
              <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" />
              </svg>
            </NBadge>
          </NButton>
        </template>
        <p class="m-0 text-sm">消息通知为静态演示，暂无消息详情。</p>
      </NPopover>
      <NSwitch :value="dark" aria-label="深色模式" @update:value="emit('update:dark', $event)">
        <template #checked>深色</template>
        <template #unchecked>浅色</template>
      </NSwitch>
      <NPopover trigger="click" placement="bottom-end">
        <template #trigger>
          <NButton quaternary circle :aria-label="`查看${homeProfile.name}的用户信息`">
            <span class="size-6 rounded-full bg-conic from-blue-500 via-blue-100 to-indigo-400 shadow-inner" aria-hidden="true"></span>
          </NButton>
        </template>
        <p class="m-0 font-medium">{{ homeProfile.name }}</p>
        <p class="mt-1 text-xs">ID：{{ homeProfile.id }}</p>
      </NPopover>
    </nav>
    <p v-if="feedback" role="status" class="m-0 w-full text-sm">{{ feedback }}</p>
  </header>
</template>
