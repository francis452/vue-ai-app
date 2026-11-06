import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import HelloWorld from './HelloWorld.vue'

enableAutoUnmount(afterEach)

describe('HelloWorld', () => {
  it('初始显示空状态，并通过可见文本提供按钮名称', () => {
    const wrapper = mount(HelloWorld)

    expect(wrapper.text()).toContain('还没有点击')
    const button = wrapper.get('button')
    expect(button.attributes('type')).toBe('button')
    expect(button.text()).toBe('点击次数：0')
  })

  it('点击后隐藏空状态，并持续更新计数', async () => {
    const wrapper = mount(HelloWorld)
    const button = wrapper.get('button')

    await button.trigger('click')
    expect(wrapper.text()).not.toContain('还没有点击')
    expect(button.text()).toBe('点击次数：1')

    await button.trigger('click')
    expect(button.text()).toBe('点击次数：2')
  })
})
