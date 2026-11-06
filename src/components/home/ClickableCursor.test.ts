import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { compile } from 'tailwindcss'
import { businessApps } from '../../data/home'
import AppEntryCard from './AppEntryCard.vue'
import HelpPanel from './HelpPanel.vue'

enableAutoUnmount(afterEach)
let stylesheet: HTMLStyleElement | undefined
afterEach(() => stylesheet?.remove())

async function loadCursorStyles(root: Element) {
  const candidates = [root, ...root.querySelectorAll('[class]')]
    .flatMap(element => (element.getAttribute('class') ?? '').split(/\s+/))
    .filter(candidate => candidate.startsWith('cursor-'))
  const compiler = await compile('@tailwind utilities;')
  stylesheet = document.createElement('style')
  stylesheet.textContent = compiler.build(candidates)
  document.head.append(stylesheet)
}

describe('首页可点击区域的光标提示', () => {
  it('应用入口按钮显示手形，并保持选择事件', async () => {
    const entry = businessApps[0]!
    const wrapper = mount(AppEntryCard, { props: { entry }, attachTo: document.body })
    await loadCursorStyles(wrapper.element)
    expect(getComputedStyle(wrapper.get('button').element).cursor).toBe('pointer')
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('select')).toEqual([[entry]])
  })

  it('所有文档按钮显示手形，区域标题不采用手形', async () => {
    const wrapper = mount(HelpPanel, { attachTo: document.body })
    await loadCursorStyles(wrapper.element)
    const buttons = wrapper.findAll('li button')
    expect(buttons).toHaveLength(9)
    for (const button of buttons) {
      expect(getComputedStyle(button.element).cursor).toBe('pointer')
    }
    expect(getComputedStyle(wrapper.get('h2').element).cursor).not.toBe('pointer')
  })
})
