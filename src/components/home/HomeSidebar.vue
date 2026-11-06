<script setup lang="ts">
import { ref } from 'vue'
import { NAvatar, NButton, NCard, NEmpty, NModal } from 'naive-ui'
import { homeContact, homeProfile } from '../../data/home'
import contactIllustration from '../../assets/home/contact.svg'

const dialog = ref<'profile' | 'contact' | null>(null)
</script>

<template>
  <aside class="flex h-full min-w-0 flex-col gap-4" aria-label="用户与服务">
    <NCard tag="section" aria-labelledby="profile-heading">
      <div class="flex flex-wrap items-center gap-3">
        <NAvatar round :size="36" class="shrink-0 bg-conic! from-blue-500 via-blue-100 to-indigo-400" aria-hidden="true" />
        <div class="min-w-0 flex-1">
          <h2 id="profile-heading" class="m-0 text-sm font-semibold text-inherit">{{ homeProfile.name }}</h2>
          <p class="mt-1 text-xs opacity-70">ID：{{ homeProfile.id }}</p>
        </div>
        <NButton size="small" type="primary" @click="dialog = 'profile'">个人信息</NButton>
      </div>
    </NCard>

    <NCard tag="section" class="flex-1" content-class="flex flex-col h-full" aria-labelledby="work-orders-heading">
      <h2 id="work-orders-heading" class="m-0 text-sm font-semibold text-inherit">我的工单</h2>
      <div class="flex min-h-60 flex-1 items-center justify-center py-8 lg:min-h-96">
        <NEmpty description="暂无我的工单">
          <template #icon>
            <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
              <path d="M17 12h44v59H17z" fill="#dbeafe" stroke="#94a3b8" stroke-width="2" />
              <path d="M23 18h32v47H23z" fill="#fff" />
              <path d="M31 7h16v12H31z" fill="#64748b" />
              <path d="M29 29h20m-20 9h16m-16 9h20m-20 9h10" stroke="#a5b4cf" stroke-width="3" />
              <circle cx="61" cy="53" r="14" fill="#487cff" />
              <path d="M56 53h1m4 0h1m4 0h1" stroke="#fff" stroke-width="2" stroke-linecap="round" />
            </svg>
          </template>
        </NEmpty>
      </div>
    </NCard>

    <NCard tag="section" class="relative isolate overflow-hidden" aria-labelledby="contact-heading">
      <img :src="contactIllustration" alt="" class="pointer-events-none absolute right-0 bottom-0 -z-10 h-36 w-40 opacity-65" />
      <div class="min-h-32">
        <h2 id="contact-heading" class="m-0 text-base font-semibold text-inherit">{{ homeContact.title }}</h2>
        <p class="mt-2 max-w-48 text-xs leading-5">{{ homeContact.description }}</p>
        <NButton type="primary" size="small" class="mt-6" @click="dialog = 'contact'">联系我们</NButton>
      </div>
    </NCard>

    <NModal :show="!!dialog" preset="card" :title="dialog === 'profile' ? '个人信息' : '联系我们'" class="w-[90vw]! max-w-lg" @update:show="show => { if (!show) dialog = null }">
      <dl v-if="dialog === 'profile'" class="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
        <dt>姓名</dt><dd class="m-0">{{ homeProfile.name }}</dd>
        <dt>用户 ID</dt><dd class="m-0 wrap-anywhere">{{ homeProfile.id }}</dd>
      </dl>
      <p v-else class="m-0 text-sm">当前为本地静态演示，暂未提供在线客服联系方式。</p>
      <template #footer><NButton @click="dialog = null">关闭</NButton></template>
    </NModal>
  </aside>
</template>
