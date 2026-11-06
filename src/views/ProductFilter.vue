<template>
  <main class="product-filter">
    <header>
      <h1>商品筛选</h1>
      <p>按条件查找所需商品。</p>
    </header>

    <section class="panel" aria-labelledby="filter-heading">
      <h2 id="filter-heading">筛选条件</h2>
      <p>筛选条件将在后续任务中添加。</p>
    </section>

    <section class="panel" aria-labelledby="results-heading">
      <h2 id="results-heading">商品列表</h2>
      <p>暂未接入商品数据。</p>
    </section>
  </main>
</template>

<style scoped>
.product-filter {
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
</style>
