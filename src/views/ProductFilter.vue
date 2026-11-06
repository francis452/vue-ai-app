<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue'
import { NAlert, NButton, NCard, NDataTable, NEmpty, NForm, NFormItem, NInput, NSelect } from 'naive-ui'
import type { DataTableColumns, FormInst, FormRules } from 'naive-ui'
import { products } from '../data/products'
import type { Product } from '../data/products'

const emptyFilters = () => ({ keyword: '', category: '', minPrice: '', maxPrice: '' })
const filters = reactive(emptyFilters())
const appliedFilters = ref(emptyFilters())
const error = ref('')
const errorElement = ref<HTMLElement | null>(null)
const form = ref<FormInst | null>(null)
const categories = [
  { label: '全部分类', value: '' },
  ...[...new Set(products.map(product => product.category))].map(category => ({ label: category, value: category })),
]
const filteredProducts = computed(() => {
  const { keyword, category, minPrice, maxPrice } = appliedFilters.value
  return products.filter(product =>
    product.name.toLocaleLowerCase().includes(keyword.trim().toLocaleLowerCase())
    && (!category || product.category === category)
    && (!minPrice.trim() || product.price >= Number(minPrice))
    && (!maxPrice.trim() || product.price <= Number(maxPrice)),
  )
})

function priceError() {
  const prices = [filters.minPrice.trim(), filters.maxPrice.trim()]
  return prices.some(price => price !== ''
    && (!/^\d+(\.\d+)?$/.test(price) || !Number.isFinite(Number(price))))
    ? '价格请输入大于或等于 0 的有效数字。'
    : prices[0] && prices[1] && Number(prices[0]) > Number(prices[1])
      ? '最低价不能大于最高价。'
      : ''
}

const rules: FormRules = Object.fromEntries(['minPrice', 'maxPrice'].map(path => [path, {
  trigger: 'submit',
  validator: () => priceError() ? new Error(priceError()) : true,
}]))

async function search() {
  try {
    await form.value?.validate()
  } catch {
    error.value = priceError()
    await nextTick()
    errorElement.value?.focus()
    return
  }
  error.value = ''
  appliedFilters.value = { ...filters }
}

function reset() {
  Object.assign(filters, emptyFilters())
  appliedFilters.value = emptyFilters()
  error.value = ''
  form.value?.restoreValidation()
}

const currency = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY',
})
const columns: DataTableColumns<Product> = [
  { title: '商品名称', key: 'name', className: 'product-name wrap-anywhere', minWidth: 140 },
  { title: '分类', key: 'category', width: 90 },
  { title: '价格（人民币）', key: 'price', width: 140, render: product => currency.format(product.price) },
]
</script>

<template>
  <main class="mx-auto min-h-svh w-full max-w-6xl min-w-0 space-y-6 px-4 py-8 text-left sm:px-6">
    <header>
      <h1 class="m-0 mb-3 text-3xl leading-tight font-semibold text-inherit">商品筛选</h1>
      <p>按条件查找所需商品。</p>
    </header>

    <NCard class="min-w-0" tag="section" aria-labelledby="filter-heading">
      <template #header><h2 class="m-0 text-xl font-medium text-inherit" id="filter-heading">筛选条件</h2></template>
      <NForm ref="form" :model="filters" :rules="rules" label-placement="top" @submit.prevent="search" @reset.prevent="reset">
        <div class="grid grid-cols-1 gap-x-6 min-[601px]:grid-cols-2">
          <NFormItem label="商品名称" :label-props="{ for: 'keyword' }" path="keyword">
            <NInput v-model:value="filters.keyword" :input-props="{ id: 'keyword' }" placeholder="输入关键词" />
          </NFormItem>
          <NFormItem label="商品分类" :label-props="{ for: 'category' }" path="category">
            <NSelect v-model:value="filters.category" :options="categories" :input-props="{ id: 'category', 'aria-label': '商品分类' }" />
          </NFormItem>
          <NFormItem label="最低价（元）" :label-props="{ for: 'min-price' }" path="minPrice">
            <NInput v-model:value="filters.minPrice" :input-props="{ id: 'min-price', inputmode: 'decimal', 'aria-describedby': 'price-help' }" placeholder="不限" />
          </NFormItem>
          <NFormItem label="最高价（元）" :label-props="{ for: 'max-price' }" path="maxPrice">
            <NInput v-model:value="filters.maxPrice" :input-props="{ id: 'max-price', inputmode: 'decimal', 'aria-describedby': 'price-help' }" placeholder="不限" />
          </NFormItem>
        </div>
        <p id="price-help" class="mt-2 text-sm">价格范围包含最低价和最高价，留空表示不限。</p>
        <div v-if="error" ref="errorElement" class="mt-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2" role="alert" tabindex="-1">
          <NAlert type="error" :show-icon="false">{{ error }}</NAlert>
        </div>
        <div class="mt-4 flex flex-wrap gap-3">
          <NButton type="primary" attr-type="submit">查询</NButton>
          <NButton attr-type="reset">重置</NButton>
        </div>
      </NForm>
    </NCard>

    <NCard class="min-w-0" tag="section" aria-labelledby="results-heading">
      <template #header><h2 class="m-0 text-xl font-medium text-inherit" id="results-heading">商品列表</h2></template>
      <p role="status">本地演示数据 · 共 {{ filteredProducts.length }} 件商品</p>
      <div v-if="filteredProducts.length" class="mt-4 min-w-0">
        <NDataTable :columns="columns" :data="filteredProducts" :row-key="(product: Product) => product.id" :pagination="false" :scroll-x="370" aria-label="商品名称、分类与价格（人民币）" />
      </div>
      <NEmpty v-else class="py-8" :description="products.length ? '没有符合条件的商品，请调整筛选条件或重置。' : '暂无商品'" />
    </NCard>
  </main>
</template>
