<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { NConfigProvider, NGlobalStyle, darkTheme, dateZhCN, useOsTheme, zhCN } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'

const Home = defineAsyncComponent(() => import('./views/Home.vue'))
const osTheme = useOsTheme()
const darkOverride = ref<boolean | null>(null)
const dark = computed({
  get: () => darkOverride.value ?? osTheme.value === 'dark',
  set: value => { darkOverride.value = value },
})
const theme = computed(() => dark.value ? darkTheme : null)
const themeOverrides = computed<GlobalThemeOverrides>(() => ({
  common: {
    primaryColor: dark.value ? '#80aaff' : '#3567de',
    primaryColorHover: dark.value ? '#a4c1ff' : '#2855be',
    primaryColorPressed: dark.value ? '#6597ff' : '#2149a4',
    borderRadius: '6px',
  },
  Card: {
    color: dark.value ? 'rgba(30, 46, 75, 0.92)' : 'rgba(244, 247, 255, 0.76)',
    borderColor: dark.value ? 'rgba(148, 179, 230, 0.12)' : 'rgba(255, 255, 255, 0.3)',
  },
}))
</script>

<template>
  <NConfigProvider :theme="theme" :theme-overrides="themeOverrides" :locale="zhCN" :date-locale="dateZhCN">
    <NGlobalStyle />
    <Home v-model:dark="dark" />
  </NConfigProvider>
</template>
