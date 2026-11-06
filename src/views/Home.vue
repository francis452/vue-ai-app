<script setup lang="ts">
import { NCard, NEmpty } from 'naive-ui'
import { helpDocuments, homeContact, homeProfile } from '../data/home'
import HomeHeader from '../components/home/HomeHeader.vue'
import ApplicationPanel from '../components/home/ApplicationPanel.vue'

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

          <NCard tag="section" aria-labelledby="help-heading">
            <h2 id="help-heading" class="m-0 mb-4 text-lg font-medium text-inherit">新手文档</h2>
            <ul class="m-0 list-disc space-y-2 pl-5 text-sm">
              <li v-for="document in helpDocuments" :key="document.id">{{ document.title }}</li>
            </ul>
          </NCard>
        </div>

        <aside class="min-w-0 space-y-4" aria-label="用户与服务">
          <NCard tag="section" aria-labelledby="profile-heading">
            <h2 id="profile-heading" class="m-0 text-base font-semibold text-inherit">{{ homeProfile.name }}</h2>
            <p class="mt-2 text-sm">ID：{{ homeProfile.id }}</p>
          </NCard>

          <NCard tag="section" aria-labelledby="work-orders-heading">
            <h2 id="work-orders-heading" class="m-0 text-base font-medium text-inherit">我的工单</h2>
            <div class="flex min-h-48 items-center justify-center lg:min-h-96">
              <NEmpty description="暂无我的工单" />
            </div>
          </NCard>

          <NCard tag="section" aria-labelledby="contact-heading">
            <h2 id="contact-heading" class="m-0 text-lg font-medium text-inherit">{{ homeContact.title }}</h2>
            <p class="mt-2 text-sm">{{ homeContact.description }}</p>
          </NCard>
        </aside>
      </div>
    </main>
  </div>
</template>
