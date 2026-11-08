import { afterEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { NModal, NPopover } from 'naive-ui'
import { helpDocuments } from '../../data/home'
import HelpPanel from './HelpPanel.vue'

enableAutoUnmount(afterEach)

describe('新手文档面板', () => {
  it('文档标题单行省略并支持悬停查看完整名称', async () => {
    const wrapper = mount(HelpPanel, { attachTo: document.body })
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(helpDocuments.length * 3)
    expect(buttons[0]!.text()).toBe(helpDocuments[0]!.title)
    for (const button of buttons) {
      expect(button.classes()).toContain('truncate')
      expect(button.classes()).not.toContain('wrap-anywhere')
    }

    const popovers = wrapper.findAllComponents(NPopover)
    expect(popovers).toHaveLength(helpDocuments.length * 3)
    expect(popovers.every(popover => popover.props('trigger') === 'hover')).toBe(true)

    await buttons[0]!.trigger('mouseenter')
    await flushPromises()
    await vi.waitFor(() => {
      const popover = [...document.querySelectorAll('.n-popover')]
        .find(el => el.textContent?.includes(helpDocuments[0]!.title))
      expect(popover).toBeDefined()
    })
  })

  it('点击文档标题仍打开详情弹窗', async () => {
    const wrapper = mount(HelpPanel, { attachTo: document.body })
    await wrapper.get('button').trigger('click')
    await flushPromises()
    expect(wrapper.getComponent(NModal).props('show')).toBe(true)
    expect(wrapper.getComponent(NModal).props('title')).toBe(helpDocuments[0]!.title)
  })
})