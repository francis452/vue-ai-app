<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { NConfigProvider, NGlobalStyle, darkTheme, dateZhCN, useOsTheme, zhCN } from 'naive-ui'

const ProductFilter = defineAsyncComponent(() => import('./views/ProductFilter.vue'))
const osTheme = useOsTheme()
const theme = computed(() => osTheme.value === 'dark' ? darkTheme : null)
</script>

<template>
  <NConfigProvider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <NGlobalStyle />
    <ProductFilter />
  </NConfigProvider>
</template>
