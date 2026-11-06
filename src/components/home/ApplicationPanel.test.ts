import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { NModal } from 'naive-ui'
import { businessApps, platformApps } from '../../data/home'
import ApplicationPanel from './ApplicationPanel.vue'
import AppEntryCard from './AppEntryCard.vue'

enableAutoUnmount(afterEach)

describe('ApplicationPanel', () => {
  it('按原顺序显示 10 个业务应用和 8 个数字底座入口', () => {
    const wrapper = mount(ApplicationPanel)
    const lists = wrapper.findAll('ul')
    expect(lists[0]!.findAll('button')).toHaveLength(10)
    expect(lists[1]!.findAll('button')).toHaveLength(8)
    expect(wrapper.findAllComponents(AppEntryCard).map(card => card.props('entry').id))
      .toEqual([...businessApps, ...platformApps].map(entry => entry.id))
    expect(wrapper.get('img').attributes('alt')).toBe('')
  })

  it('应用入口和驾驶舱按钮展示本地演示弹窗，并支持关闭', async () => {
    const wrapper = mount(ApplicationPanel, { attachTo: document.body })
    await wrapper.get('button[aria-label="查看能碳管理系统"]').trigger('click')
    await flushPromises()
    expect(wrapper.getComponent(NModal).props('show')).toBe(true)
    expect(wrapper.getComponent(NModal).props('title')).toBe('能碳管理系统')
    expect(document.body.textContent).toContain('当前为本地静态演示。')

    const close = [...document.querySelectorAll('button')].find(button => button.textContent === '关闭')
    expect(close).toBeDefined()
    close!.click()
    await flushPromises()
    expect(wrapper.getComponent(NModal).props('show')).toBe(false)

    const cockpit = wrapper.findAll('button').find(button => button.text().includes('即刻查看'))
    await cockpit!.trigger('click')
    await flushPromises()
    expect(wrapper.getComponent(NModal).props('title')).toBe('运营驾驶舱')
    expect(wrapper.getComponent(NModal).props('show')).toBe(true)
  })
})
