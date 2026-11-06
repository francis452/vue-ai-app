import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { NModal } from 'naive-ui'
import HomeSidebar from './HomeSidebar.vue'
import HelpPanel from './HelpPanel.vue'

enableAutoUnmount(afterEach)

describe('首页用户与帮助模块', () => {
  it('展示个人信息、工单空状态并打开联系说明', async () => {
    const wrapper = mount(HomeSidebar, { attachTo: document.body })
    expect(wrapper.text()).toContain('暂无我的工单')
    await wrapper.findAll('button').find(button => button.text() === '个人信息')!.trigger('click')
    await flushPromises()
    expect(wrapper.getComponent(NModal).props('title')).toBe('个人信息')
    expect(document.body.textContent).toContain('78365494764')
    wrapper.getComponent(NModal).vm.$emit('update:show', false)
    await flushPromises()
    expect(wrapper.getComponent(NModal).props('show')).toBe(false)

    await wrapper.findAll('button').find(button => button.text() === '联系我们')!.trigger('click')
    await flushPromises()
    expect(wrapper.getComponent(NModal).props('title')).toBe('联系我们')
    expect(document.body.textContent).toContain('暂未提供在线客服联系方式')
  })

  it('文档按三组展示，点击后显示对应演示内容', async () => {
    const wrapper = mount(HelpPanel, { attachTo: document.body })
    expect(wrapper.findAll('ul')).toHaveLength(3)
    expect(wrapper.findAll('li button')).toHaveLength(9)
    await wrapper.findAll('li button')[1]!.trigger('click')
    await flushPromises()
    expect(wrapper.getComponent(NModal).props('title')).toContain('流量数据')
    expect(document.body.textContent).toContain('请核对统计时间范围、流量方向和计量单位')
    wrapper.getComponent(NModal).vm.$emit('update:show', false)
    await flushPromises()
    expect(wrapper.getComponent(NModal).props('show')).toBe(false)
  })
})
