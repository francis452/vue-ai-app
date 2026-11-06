export interface Product {
  id: number
  name: string
  category: string
  price: number
}

// 本地演示数据，价格单位为人民币元。
export const products: Product[] = [
  { id: 1, name: '无线蓝牙耳机', category: '数码', price: 199 },
  { id: 2, name: '便携式多接口桌面扩展坞（支持高清显示与快速数据传输）', category: '数码', price: 329.9 },
  { id: 3, name: '纯棉短袖 T 恤', category: '服饰', price: 89 },
  { id: 4, name: '轻量双肩背包', category: '服饰', price: 159 },
  { id: 5, name: '不锈钢保温杯', category: '家居', price: 79.9 },
  { id: 6, name: '桌面收纳盒', category: '家居', price: 29.9 },
]
