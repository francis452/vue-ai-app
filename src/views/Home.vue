<script setup lang="ts">
import { computed } from 'vue'
import { NConfigProvider } from 'naive-ui'
import { homeProfile } from '../data/home'
import HomeHeader from '../components/home/HomeHeader.vue'
import ApplicationPanel from '../components/home/ApplicationPanel.vue'
import HomeSidebar from '../components/home/HomeSidebar.vue'
import HelpPanel from '../components/home/HelpPanel.vue'
import background from '../assets/home/background.svg'

defineOptions({ name: 'EnergyHome' })
const props = defineProps<{ dark: boolean }>()
const emit = defineEmits<{ 'update:dark': [value: boolean] }>()
const themeOverrides = computed(() => props.dark ? undefined : { Card: { color: '#ffffff' } })
</script>

<template>
  <NConfigProvider abstract :theme-overrides="themeOverrides">
  <div class="relative isolate min-h-svh" :class="dark ? 'dark bg-[#101a30] text-slate-100' : 'bg-[#dce6fd] text-slate-800'">
    <img :src="background" alt="" class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[660px] w-full object-cover object-top opacity-80 dark:opacity-15" />
    <a href="#home-main" class="sr-only rounded-md bg-white p-3 text-blue-800 focus:not-sr-only focus:absolute focus:top-2 focus:left-4 focus:z-50">跳转到首页内容</a>
    <HomeHeader :dark="dark" @update:dark="emit('update:dark', $event)" />
    <main id="home-main" tabindex="-1" class="mx-auto max-w-[1440px] space-y-4 px-4 py-6 sm:px-6 lg:px-10" aria-label="首页">
      <header class="space-y-2 pt-3 sm:pt-5">
        <h1 class="m-0 text-lg leading-relaxed font-semibold tracking-normal text-inherit">{{ homeProfile.greeting }}</h1>
        <p class="m-0 flex flex-wrap gap-x-4 gap-y-1 text-xs opacity-70">
          <span>上次登录时间：{{ homeProfile.lastLoginTime }}</span>
          <span>上次登录 IP：{{ homeProfile.lastLoginIp }}</span>
        </p>
        <p class="sr-only">本地静态演示</p>
      </header>

      <div class="grid min-w-0 items-stretch gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(260px,1fr)]">
        <div class="flex min-w-0 flex-col gap-4 lg:contents">
          <ApplicationPanel class="lg:col-start-1 lg:row-start-1" />

          <HelpPanel class="lg:col-start-1 lg:row-start-2 lg:mt-0!" />
        </div>

        <HomeSidebar />
      </div>
    </main>
  </div>
  </NConfigProvider>
</template>
