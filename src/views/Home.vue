<script setup lang="ts">
import { homeProfile } from '../data/home'
import HomeHeader from '../components/home/HomeHeader.vue'
import ApplicationPanel from '../components/home/ApplicationPanel.vue'
import HomeSidebar from '../components/home/HomeSidebar.vue'
import HelpPanel from '../components/home/HelpPanel.vue'

defineOptions({ name: 'EnergyHome' })
defineProps<{ dark: boolean }>()
const emit = defineEmits<{ 'update:dark': [value: boolean] }>()
</script>

<template>
  <div class="min-h-svh">
    <HomeHeader :dark="dark" @update:dark="emit('update:dark', $event)" />

    <main class="mx-auto max-w-[1440px] space-y-6 px-4 py-6 sm:px-6 lg:px-10" aria-label="首页">
      <header class="space-y-2 pt-3 sm:pt-5">
        <h1 class="m-0 text-lg leading-relaxed font-semibold text-inherit">{{ homeProfile.greeting }}</h1>
        <p class="m-0 flex flex-wrap gap-x-4 gap-y-1 text-xs opacity-70">
          <span>上次登录时间：{{ homeProfile.lastLoginTime }}</span>
          <span>上次登录 IP：{{ homeProfile.lastLoginIp }}</span>
        </p>
        <p class="m-0 text-xs opacity-70">本地静态演示</p>
      </header>

      <div class="grid min-w-0 items-start gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(260px,1fr)]">
        <div class="min-w-0 space-y-4">
          <ApplicationPanel />

          <HelpPanel />
        </div>

        <HomeSidebar />
      </div>
    </main>
  </div>
</template>
