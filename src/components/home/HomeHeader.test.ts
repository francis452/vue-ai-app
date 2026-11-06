import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { homeProfile } from '../../data/home'
import HomeHeader from './HomeHeader.vue'

enableAutoUnmount(afterEach)
const initialCount = homeProfile.notificationCount
afterEach(() => { homeProfile.notificationCount = initialCount })

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

  it.each([[0, ''], [32, '32'], [120, '99+']])('通知数为 %i 时保留正确展示与可访问名称', (count, label) => {
    homeProfile.notificationCount = count
    const wrapper = mount(HomeHeader, { props: { dark: false } })
    const button = wrapper.get('button[aria-label*="消息通知"]')
    expect(button.attributes('aria-label')).toContain(`${count} 条演示消息`)
    const badge = button.find('sup')
    if (label) {
      const digits = badge.findAll('.n-base-slot-machine-current-number__inner')
      expect(digits.map(digit => digit.text()).join('')).toBe(label)
    }
    else expect(badge.exists()).toBe(false)
  })

  it('紧凑开关保留名称、键盘操作和受控主题状态', async () => {
    const wrapper = mount(HomeHeader, { props: { dark: false } })
    const control = wrapper.get('[role="switch"]')
    expect(control.attributes('aria-label')).toBe('深色模式')
    expect(control.attributes('aria-checked')).toBe('false')
    expect((control.element as HTMLElement).style.getPropertyValue('--n-rail-height')).toBe('18px')
    expect(control.text()).not.toContain('浅色')
    await control.trigger('keydown', { key: ' ' })
    await control.trigger('keyup', { key: ' ' })
    expect(wrapper.emitted('update:dark')).toEqual([[true]])
    await wrapper.setProps({ dark: true })
    expect(control.attributes('aria-checked')).toBe('true')
  })
})
