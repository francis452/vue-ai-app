<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue'
import { products } from '../data/products'

const emptyFilters = () => ({ keyword: '', category: '', minPrice: '', maxPrice: '' })
const filters = reactive(emptyFilters())
const appliedFilters = ref(emptyFilters())
const error = ref('')
const errorElement = ref<HTMLElement | null>(null)
const categories = [...new Set(products.map(product => product.category))]
const filteredProducts = computed(() => {
  const { keyword, category, minPrice, maxPrice } = appliedFilters.value
  return products.filter(product =>
    product.name.toLocaleLowerCase().includes(keyword.trim().toLocaleLowerCase())
    && (!category || product.category === category)
    && (!minPrice.trim() || product.price >= Number(minPrice))
    && (!maxPrice.trim() || product.price <= Number(maxPrice)),
  )
})

async function search() {
  const prices = [filters.minPrice.trim(), filters.maxPrice.trim()]
  error.value = prices.some(price => price !== ''
    && (!/^\d+(\.\d+)?$/.test(price) || !Number.isFinite(Number(price))))
    ? '价格请输入大于或等于 0 的有效数字。'
    : prices[0] && prices[1] && Number(prices[0]) > Number(prices[1])
      ? '最低价不能大于最高价。'
      : ''
  if (error.value) {
    await nextTick()
    errorElement.value?.focus()
    return
  }
  appliedFilters.value = { ...filters }
}

function reset() {
  Object.assign(filters, emptyFilters())
  appliedFilters.value = emptyFilters()
  error.value = ''
}

const currency = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY',
})
</script>

<template>
  <main class="product-filter">
    <header>
      <h1>商品筛选</h1>
      <p>按条件查找所需商品。</p>
    </header>

    <section class="panel" aria-labelledby="filter-heading">
      <h2 id="filter-heading">筛选条件</h2>
      <form @submit.prevent="search" @reset.prevent="reset">
        <div class="filter-fields">
          <div class="field">
            <label for="keyword">商品名称</label>
            <input id="keyword" v-model="filters.keyword" type="search" placeholder="输入关键词" />
          </div>
          <div class="field">
            <label for="category">商品分类</label>
            <select id="category" v-model="filters.category">
              <option value="">全部分类</option>
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>
          </div>
          <div class="field">
            <label for="min-price">最低价（元）</label>
            <input id="min-price" v-model="filters.minPrice" inputmode="decimal" aria-describedby="price-help" />
          </div>
          <div class="field">
            <label for="max-price">最高价（元）</label>
            <input id="max-price" v-model="filters.maxPrice" inputmode="decimal" aria-describedby="price-help" />
          </div>
        </div>
        <p id="price-help" class="form-help">价格范围包含最低价和最高价，留空表示不限。</p>
        <p v-if="error" ref="errorElement" class="form-error" role="alert" tabindex="-1">{{ error }}</p>
        <div class="actions">
          <button type="submit">查询</button>
          <button type="reset">重置</button>
        </div>
      </form>
    </section>

    <section class="panel" aria-labelledby="results-heading">
      <h2 id="results-heading">商品列表</h2>
      <p role="status">本地演示数据 · 共 {{ filteredProducts.length }} 件商品</p>
      <div v-if="filteredProducts.length" class="table-container">
        <table>
          <caption class="table-caption">商品名称、分类与价格（人民币）</caption>
          <thead>
            <tr>
              <th scope="col">商品名称</th>
              <th scope="col">分类</th>
              <th scope="col">价格</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in filteredProducts" :key="product.id">
              <td class="product-name">{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>{{ currency.format(product.price) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="empty-state">{{ products.length ? '没有符合条件的商品，请调整筛选条件或重置。' : '暂无商品' }}</p>
    </section>
  </main>
</template>

<style scoped>
.product-filter {
  min-width: 0;
  padding: 32px 20px;
  text-align: left;
}

h1 {
  margin: 0 0 12px;
  font-size: 32px;
  line-height: 1.3;
}

.panel {
  margin-top: 24px;
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 8px;
}

.table-container {
  margin-top: 16px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

.table-caption {
  text-align: left;
  margin-bottom: 8px;
}

th,
td {
  padding: 12px;
  border-bottom: 1px solid var(--border);
  vertical-align: top;
}

td:not(.product-name) {
  white-space: nowrap;
}

.product-name {
  overflow-wrap: anywhere;
}

.empty-state {
  margin-top: 16px;
}

.filter-fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

input,
select,
button {
  box-sizing: border-box;
  min-height: 44px;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font: inherit;
  color: var(--text-h);
  background: var(--bg);
}

input,
select {
  width: 100%;
  min-width: 0;
}

button {
  cursor: pointer;
}

:is(input, select, button):focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.form-help,
.form-error,
.actions {
  margin-top: 16px;
}

.form-error {
  color: var(--text-h);
  border-left: 3px solid var(--accent);
  padding-left: 12px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 600px) {
  .filter-fields {
    grid-template-columns: minmax(0, 1fr);
  }

  .panel {
    padding: 16px;
  }

  th,
  td {
    padding: 8px 4px;
  }
}
</style>
