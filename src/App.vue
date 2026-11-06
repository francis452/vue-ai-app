<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { NConfigProvider, NGlobalStyle, darkTheme, dateZhCN, useOsTheme, zhCN } from 'naive-ui'

const Home = defineAsyncComponent(() => import('./views/Home.vue'))
const osTheme = useOsTheme()
const darkOverride = ref<boolean | null>(null)
const dark = computed({
  get: () => darkOverride.value ?? osTheme.value === 'dark',
  set: value => { darkOverride.value = value },
})
const theme = computed(() => dark.value ? darkTheme : null)
</script>

<template>
  <NConfigProvider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <NGlobalStyle />
    <Home v-model:dark="dark" />
  </NConfigProvider>
</template>
