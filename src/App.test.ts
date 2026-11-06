import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import { NConfigProvider, darkTheme, dateZhCN, useOsTheme, zhCN } from 'naive-ui'
import App from './App.vue'

vi.mock('naive-ui', async importOriginal => ({
  ...await importOriginal<typeof import('naive-ui')>(),
  useOsTheme: vi.fn(),
}))

enableAutoUnmount(afterEach)
const osTheme = ref<'light' | 'dark' | null>('light')

beforeEach(() => {
  osTheme.value = 'light'
  vi.mocked(useOsTheme).mockReturnValue(osTheme)
})

describe('App 主题配置', () => {
  it('使用中文组件及日期语言，跟随系统明暗变化', async () => {
    const wrapper = mount(App, { global: { stubs: { Home: true } } })
    const provider = wrapper.getComponent(NConfigProvider)
    expect(provider.props('locale')).toBe(zhCN)
    expect(provider.props('dateLocale')).toBe(dateZhCN)
    expect(provider.props('theme')).toBeNull()
    expect(wrapper.findComponent({ name: 'Home' }).exists()).toBe(true)

    osTheme.value = 'dark'
    await nextTick()
    expect(provider.props('theme')).toBe(darkTheme)

    osTheme.value = 'light'
    await nextTick()
    expect(provider.props('theme')).toBeNull()
  })
})
