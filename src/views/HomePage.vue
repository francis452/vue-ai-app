<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../stores/app'

const appStore = useAppStore()
const { appName, visitCount } = storeToRefs(appStore)

onMounted(() => {
  appStore.incrementVisitCount()
})
</script>

<template>
  <main class="home-page">
    <section class="home-hero">
      <p class="eyebrow">Vue Router + Pinia ready</p>
      <h1>{{ appName }}</h1>
      <p class="intro">
        这是项目首页。路由已经挂载，Pinia 也已经接入，可以继续添加页面、 全局状态和业务模块。
      </p>
      <div class="status-row">
        <span>当前路由：/</span>
        <span>首页访问计数：{{ visitCount }}</span>
      </div>
    </section>
  </main>
</template>
