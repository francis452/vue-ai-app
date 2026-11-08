<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NCard, NModal } from 'naive-ui'
import { businessApps, platformApps } from '../../data/home'
import AppEntryCard from './AppEntryCard.vue'
import cockpitBanner from '../../assets/home/cockpit-banner.svg'

const groups = [
  { id: 'business', title: '业务应用', entries: businessApps },
  { id: 'platform', title: '数字底座', entries: platformApps },
]
const cockpit = { title: '运营驾驶舱', description: '数据一屏掌控 · 业务统一指挥 · 资源及时调度' }
const selected = ref<{ title: string; description: string } | null>(null)
</script>

<template>
  <NCard tag="section" class="flex min-h-0 flex-col" content-class="flex min-h-0 flex-1 flex-col gap-5" aria-labelledby="applications-heading">
    <h2 id="applications-heading" class="sr-only">应用中心</h2>
    <section class="relative isolate flex min-h-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-blue-300/30 bg-blue-100/60 px-3 py-2" aria-labelledby="cockpit-heading">
      <img :src="cockpitBanner" alt="" class="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-80" />
      <div class="max-w-full rounded-lg bg-white/70 px-3 py-2 text-slate-800 sm:bg-white/40">
        <div class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <h3 id="cockpit-heading" class="m-0 text-xl font-bold tracking-wider">{{ cockpit.title }}</h3>
          <NButton size="small" round color="#3567de" text-color="#ffffff" @click="selected = cockpit">即刻查看 <span aria-hidden="true">»</span></NButton>
        </div>
        <p class="m-0 mt-2 text-center text-xs leading-5">{{ cockpit.description }}</p>
      </div>
    </section>

    <div
      data-testid="application-groups-scroll"
      role="region"
      aria-label="应用入口列表"
      tabindex="0"
      class="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto overscroll-contain rounded-sm pr-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-300"
    >
      <section v-for="group in groups" :key="group.id" :aria-labelledby="`${group.id}-heading`">
        <h3 :id="`${group.id}-heading`" class="m-0 mb-3 text-sm font-semibold">{{ group.title }}</h3>
        <ul class="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4 p-0">
          <li v-for="entry in group.entries" :key="entry.id" class="min-w-0">
            <AppEntryCard :entry="entry" @select="selected = $event" />
          </li>
        </ul>
      </section>
    </div>

    <NModal :show="!!selected" preset="card" :title="selected?.title" class="w-[90vw]! max-w-lg" @update:show="show => { if (!show) selected = null }">
      <p class="m-0">{{ selected?.description }}</p>
      <p class="mt-3 text-sm opacity-70">当前为本地静态演示。</p>
      <template #footer><NButton @click="selected = null">关闭</NButton></template>
    </NModal>
  </NCard>
</template>
