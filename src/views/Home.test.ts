import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import Home from './Home.vue'

enableAutoUnmount(afterEach)

describe('能源管理首页', () => {
  it('组合各模块，提供主标题、正文跳转和静态演示说明', () => {
    const wrapper = mount(Home, { props: { dark: false } })
    expect(wrapper.findAll('main')).toHaveLength(1)
    expect(wrapper.findAll('h1')).toHaveLength(1)
    expect(wrapper.get('h1').text()).toBe('上午好，系统管理员～')
    expect(wrapper.get('a').attributes('href')).toBe(`#${wrapper.get('main').attributes('id')}`)
    expect(wrapper.get('main').attributes('tabindex')).toBe('-1')
    expect(wrapper.findAll('[aria-labelledby="business-heading"] li button')).toHaveLength(10)
    expect(wrapper.findAll('[aria-labelledby="platform-heading"] li button')).toHaveLength(8)
    expect(wrapper.get('aside').attributes('aria-label')).toBe('用户与服务')
    expect(wrapper.text()).toContain('本地静态演示')
  })

  it('顶部栏主题操作传递给首页，并反映父级主题状态', async () => {
    const wrapper = mount(Home, { props: { dark: false } })
    await wrapper.get('[role="switch"]').trigger('click')
    expect(wrapper.emitted('update:dark')).toEqual([[true]])
    await wrapper.setProps({ dark: true })
    expect(wrapper.get('[role="switch"]').attributes('aria-checked')).toBe('true')
  })
})
