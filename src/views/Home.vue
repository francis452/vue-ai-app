<script setup lang="ts">
import { NCard, NEmpty } from 'naive-ui'
import { businessApps, helpDocuments, homeContact, homeProfile, platformApps } from '../data/home'

defineOptions({ name: 'EnergyHome' })
</script>

<template>
  <div class="min-h-svh">
    <header class="border-b border-current/10 px-4 py-4 sm:px-6">
      <p class="m-0 text-lg font-semibold">{{ homeProfile.systemName }}</p>
    </header>

    <main class="mx-auto max-w-[1440px] space-y-6 px-4 py-6 sm:px-6 lg:px-10" aria-label="首页">
      <header class="space-y-2">
        <h1 class="m-0 text-xl font-semibold text-inherit">{{ homeProfile.greeting }}</h1>
        <p class="m-0 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <span>上次登录时间：{{ homeProfile.lastLoginTime }}</span>
          <span>上次登录 IP：{{ homeProfile.lastLoginIp }}</span>
        </p>
        <p class="m-0 text-xs">本地静态演示</p>
      </header>

      <div class="grid min-w-0 items-start gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(260px,1fr)]">
        <div class="min-w-0 space-y-4">
          <NCard tag="section" aria-labelledby="applications-heading">
            <h2 id="applications-heading" class="m-0 mb-4 text-lg font-medium text-inherit">应用中心</h2>
            <section class="rounded-lg bg-blue-500/10 p-4" aria-labelledby="cockpit-heading">
              <h3 id="cockpit-heading" class="m-0 text-lg font-semibold">运营驾驶舱</h3>
              <p class="mt-2 text-sm">数据一屏掌控 · 业务统一指挥 · 资源及时调度</p>
            </section>

            <section v-for="group in [{ id: 'business', title: '业务应用', entries: businessApps }, { id: 'platform', title: '数字底座', entries: platformApps }]" :key="group.id" class="mt-6" :aria-labelledby="`${group.id}-heading`">
              <h3 :id="`${group.id}-heading`" class="m-0 mb-3 text-base font-medium">{{ group.title }}</h3>
              <ul class="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 xl:grid-cols-4">
                <li v-for="entry in group.entries" :key="entry.id" class="min-w-0 rounded-lg bg-blue-500/5 p-3">
                  <p class="m-0 text-sm font-medium wrap-anywhere">{{ entry.title }}</p>
                  <p class="mt-1 text-xs wrap-anywhere">{{ entry.description }}</p>
                </li>
              </ul>
            </section>
          </NCard>

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
