import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '../src/App.vue'
import HomePage from '../src/views/HomePage.vue'
import { useAppStore } from '../src/stores/app'

let wrapper

afterEach(() => {
  wrapper?.unmount()
})

describe('首页路由与状态', () => {
  it('通过路由渲染首页，展示应用名称，并在每次进入首页时累计访问次数', async () => {
    const pinia = createPinia()
    const store = useAppStore(pinia)
    store.appName = '测试应用'
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: HomePage },
        { path: '/other', component: { template: '<p>其他页面</p>' } },
      ],
    })
    await router.push('/')
    await router.isReady()
    wrapper = mount(App, { global: { plugins: [pinia, router] } })
    await nextTick()

    expect(wrapper.get('h1').text()).toBe('测试应用')
    expect(wrapper.text()).toContain('首页访问计数：1')

    await router.push('/other')
    expect(wrapper.text()).toBe('其他页面')
    await router.push('/')
    await nextTick()

    expect(wrapper.text()).toContain('首页访问计数：2')
    expect(store.visitCount).toBe(2)
  })
})
