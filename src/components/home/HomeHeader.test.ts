import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import HomeHeader from './HomeHeader.vue'

enableAutoUnmount(afterEach)

describe('HomeHeader', () => {
  it('显示系统名称，并为工具按钮提供名称', () => {
    const wrapper = mount(HomeHeader, { props: { dark: false } })
    expect(wrapper.text()).toContain('智慧能源管理系统')
    expect(wrapper.get('nav').attributes('aria-label')).toBe('系统工具')
    expect(wrapper.get('button[aria-label="进入全屏"]').attributes('disabled')).toBeDefined()
    expect(wrapper.get('button[aria-label*="消息通知"]').attributes('aria-label')).toContain('32 条演示消息')
    expect(wrapper.find('button[aria-label*="用户信息"]').exists()).toBe(true)
  })

  it('消息和头像按钮可打开本地演示内容', async () => {
    const wrapper = mount(HomeHeader, { props: { dark: false }, attachTo: document.body })
    await wrapper.get('button[aria-label*="消息通知"]').trigger('click')
    await flushPromises()
    expect(document.body.textContent).toContain('消息通知为静态演示，暂无消息详情。')
    await wrapper.get('button[aria-label*="用户信息"]').trigger('click')
    await flushPromises()
    expect(document.body.textContent).toContain('ID：78365494764')
  })
})
