import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { NSelect } from 'naive-ui'
import type { Product } from '../data/products'
import ProductFilter from './ProductFilter.vue'

const { products } = vi.hoisted(() => ({ products: [] as Product[] }))
vi.mock('../data/products', () => ({ products }))

enableAutoUnmount(afterEach)

beforeEach(() => {
  products.length = 0
})

describe('ProductFilter', () => {
  it('展示演示标识、数量及商品名称、分类和人民币价格', () => {
    const name = '便携式多接口桌面扩展坞（支持高清显示与快速数据传输）'
    products.push(
      { id: 1, name, category: '数码', price: 329.9 },
      { id: 2, name: '保温杯', category: '家居', price: 79 },
    )
    const wrapper = mount(ProductFilter)

    expect(wrapper.text()).toContain('本地演示数据 · 共 2 件商品')
    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(2)
    expect(rows[0]!.findAll('td').map(cell => cell.text())).toEqual([name, '数码', '¥329.90'])
    expect(rows[1]!.text()).toContain('¥79.00')
  })

  it('空列表显示零件商品和空状态', () => {
    const wrapper = mount(ProductFilter)

    expect(wrapper.text()).toContain('共 0 件商品')
    expect(wrapper.text()).toContain('暂无商品')
    expect(wrapper.find('table').exists()).toBe(false)
  })

  it('标签关联输入框，并保留查询及重置按钮语义', () => {
    const wrapper = mount(ProductFilter)
    for (const [id, label] of [['keyword', '商品名称'], ['min-price', '最低价（元）'], ['max-price', '最高价（元）']]) {
      expect(wrapper.get(`label[for="${id}"]`).text()).toBe(label)
      expect(wrapper.get(`#${id}`).element.tagName).toBe('INPUT')
    }
    expect(wrapper.get('button[type="submit"]').text()).toBe('查询')
    expect(wrapper.get('button[type="reset"]').text()).toBe('重置')
  })

  function mountCatalog(attachTo?: HTMLElement) {
    products.push(
      { id: 1, name: 'USB 耳机', category: '数码', price: 100 },
      { id: 2, name: '无线耳机', category: '数码', price: 200 },
      { id: 3, name: '耳机收纳袋', category: '家居', price: 20 },
      { id: 4, name: '保温杯', category: '家居', price: 100 },
    )
    return mount(ProductFilter, { attachTo })
  }

  it.each([
    ['#keyword', ' usb ', ['USB 耳机']],
    ['#category', '家居', ['耳机收纳袋', '保温杯']],
    ['#min-price', '200', ['无线耳机']],
    ['#max-price', '20', ['耳机收纳袋']],
  ])('支持单条件查询 %s', async (selector, value, names) => {
    const wrapper = mountCatalog()
    if (selector === '#category') {
      wrapper.getComponent(NSelect).vm.$emit('update:value', value)
    } else {
      await wrapper.get(selector).setValue(value)
    }
    expect(wrapper.findAll('tbody tr')).toHaveLength(4)
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.findAll('tbody tr td:first-child').map(cell => cell.text())).toEqual(names)
    expect(wrapper.get('[role="status"]').text()).toContain(`共 ${names.length} 件商品`)
  })

  it('组合条件同时生效，包含价格边界，重置恢复全部结果', async () => {
    const wrapper = mountCatalog()
    await wrapper.get('#keyword').setValue('耳机')
    wrapper.getComponent(NSelect).vm.$emit('update:value', '数码')
    await wrapper.get('#min-price').setValue('100')
    await wrapper.get('#max-price').setValue('200')
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.findAll('tbody tr td:first-child').map(cell => cell.text())).toEqual(['USB 耳机', '无线耳机'])

    await wrapper.get('form').trigger('reset')
    expect(wrapper.findAll('tbody tr')).toHaveLength(4)
    expect(wrapper.getComponent(NSelect).props('value')).toBe('')
    for (const selector of ['#keyword', '#min-price', '#max-price']) {
      expect((wrapper.get(selector).element as HTMLInputElement).value).toBe('')
    }
  })

  it.each([
    ['-1', '', '有效数字'],
    ['abc', '', '有效数字'],
    ['', '-1', '有效数字'],
    ['200', '100', '最低价不能大于最高价'],
  ])('拦截非法价格 %s / %s，保留上次结果', async (min, max, message) => {
    const wrapper = mountCatalog()
    await wrapper.get('#min-price').setValue(min)
    await wrapper.get('#max-price').setValue(max)
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.get('[role="alert"]').text()).toContain(message)
    expect(wrapper.findAll('tbody tr')).toHaveLength(4)
    await wrapper.get('form').trigger('reset')
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

  it('无匹配结果时提示调整条件，可再次查询恢复结果', async () => {
    const wrapper = mountCatalog()
    await wrapper.get('#keyword').setValue('不存在的商品')
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.get('[role="status"]').text()).toContain('共 0 件商品')
    expect(wrapper.text()).toContain('没有符合条件的商品')
    expect(wrapper.find('table').exists()).toBe(false)
    await wrapper.get('#keyword').setValue('')
    await wrapper.get('#min-price').setValue('0')
    await wrapper.get('#max-price').setValue('100')
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.findAll('tbody tr')).toHaveLength(3)
  })

  it('非法价格保留已筛选结果并聚焦提示，修正后可继续查询', async () => {
    const wrapper = mountCatalog(document.body)
    await wrapper.get('#keyword').setValue('USB')
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.findAll('tbody tr')).toHaveLength(1)

    await wrapper.get('#min-price').setValue('-1')
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.findAll('tbody tr td:first-child').map(cell => cell.text())).toEqual(['USB 耳机'])
    expect(document.activeElement).toBe(wrapper.get('[role="alert"]').element)

    await wrapper.get('#min-price').setValue('100')
    await wrapper.get('#max-price').setValue('100')
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    expect(wrapper.findAll('tbody tr')).toHaveLength(1)
  })

  it('小数价格相等时包含边界，空白条件表示不限', async () => {
    products.push({ id: 1, name: '保温杯', category: '家居', price: 79.9 })
    const wrapper = mount(ProductFilter)
    await wrapper.get('#min-price').setValue('79.9')
    await wrapper.get('#max-price').setValue('79.90')
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.findAll('tbody tr')).toHaveLength(1)
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)

    await wrapper.get('#min-price').setValue(' ')
    await wrapper.get('#max-price').setValue(' ')
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    expect(wrapper.findAll('tbody tr')).toHaveLength(1)
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })
})
