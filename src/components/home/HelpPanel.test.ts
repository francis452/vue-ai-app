import { afterEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { NModal, NPopover } from 'naive-ui'
import { helpDocuments } from '../../data/home'
import HelpPanel from './HelpPanel.vue'

enableAutoUnmount(afterEach)

function mockTruncation(button: HTMLButtonElement, truncated: boolean) {
  Object.defineProperty(button, 'scrollWidth', { value: truncated ? 200 : 100, configurable: true })
  Object.defineProperty(button, 'clientWidth', { value: 100, configurable: true })
}

function findPopover(title: string) {
  return [...document.querySelectorAll('.n-popover')]
    .find(element => element.textContent?.includes(title))
}

describe('新手文档面板', () => {
  it('文档标题单行省略，未截断时悬停不显示气泡', async () => {
    const wrapper = mount(HelpPanel, { attachTo: document.body })
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(helpDocuments.length * 3)
    for (const button of buttons) {
      expect(button.classes()).toContain('truncate')
      expect(button.classes()).not.toContain('wrap-anywhere')
    }
    expect(wrapper.findAllComponents(NPopover)).toHaveLength(helpDocuments.length * 3)

    mockTruncation(buttons[0]!.element as HTMLButtonElement, false)
    await buttons[0]!.trigger('mouseenter')
    await flushPromises()
    expect(findPopover(helpDocuments[0]!.title)).toBeUndefined()
    expect(document.querySelectorAll('.n-popover')).toHaveLength(0)
  })

  it('长标题截断时悬停显示完整名称气泡', async () => {
    const wrapper = mount(HelpPanel, { attachTo: document.body })
    const buttons = wrapper.findAll('button')
    mockTruncation(buttons[0]!.element as HTMLButtonElement, true)

    await buttons[0]!.trigger('mouseenter')
    await flushPromises()
    await vi.waitFor(() => {
      expect(findPopover(helpDocuments[0]!.title)).toBeDefined()
    })
    expect(document.querySelectorAll('.n-popover')).toHaveLength(1)
  })

  it('悬停新的长标题时旧气泡立即隐藏', async () => {
    const wrapper = mount(HelpPanel, { attachTo: document.body })
    const [first, second] = wrapper.findAll('button')
    mockTruncation(first!.element as HTMLButtonElement, true)
    mockTruncation(second!.element as HTMLButtonElement, true)

    await first!.trigger('mouseenter')
    await flushPromises()
    await vi.waitFor(() => {
      expect(findPopover(helpDocuments[0]!.title)).toBeDefined()
    })

    await second!.trigger('mouseenter')
    await flushPromises()
    await vi.waitFor(() => {
      expect(findPopover(helpDocuments[1]!.title)).toBeDefined()
    })
    expect(findPopover(helpDocuments[0]!.title)).toBeUndefined()
    expect(document.querySelectorAll('.n-popover')).toHaveLength(1)
  })

  it('点击文档标题仍打开详情弹窗', async () => {
    const wrapper = mount(HelpPanel, { attachTo: document.body })
    await wrapper.get('button').trigger('click')
    await flushPromises()
    expect(wrapper.getComponent(NModal).props('show')).toBe(true)
    expect(wrapper.getComponent(NModal).props('title')).toBe(helpDocuments[0]!.title)
  })
})