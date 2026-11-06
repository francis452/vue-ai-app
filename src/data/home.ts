export interface HomeEntry {
  id: string
  title: string
  description: string
  iconPath: string
}

// 首页本地演示数据，不代表真实用户或登录记录。
export const homeProfile = {
  systemName: '智慧能源管理系统',
  greeting: '上午好，系统管理员～',
  lastLoginTime: '2024-10-09 12:12:12',
  lastLoginIp: 'XXX.XXXX',
  name: '咸菜超人',
  id: '78365494764',
  notificationCount: 32,
}

export const businessApps: HomeEntry[] = [
  { id: 'energy', iconPath: 'M12 2 4 7v10l8 5 8-5V7ZM12 2v20M4 7l8 5 8-5', title: '能碳管理系统', description: '提升能源管理效率，降本增效' },
  { id: 'dispatch', iconPath: 'M3 4h18v14H3ZM7 11l3-4 4 7 3-4M8 22h8m-4-4v4', title: '智控优化调度系统', description: '实时监控系统状态' },
  { id: 'maintenance', iconPath: 'M12 3a6 6 0 0 0-6 6c0 5 6 10 6 10s6-5 6-10a6 6 0 0 0-6-6ZM9 9h6m-3-3v6M4 21h16', title: '智能运维系统', description: '丰富的运维工具，提升运维效率' },
  { id: 'microgrid', iconPath: 'M3 10h7v11H3Zm11-7h7v18h-7ZM5 13h3m-3 4h3m8-10h3m-3 4h3m-3 4h3M10 16h4', title: '光储充微网运行优化系统', description: '提升运行效率，提高收益' },
  { id: 'virtual-power', iconPath: 'M3 6h18v14H3ZM7 3v3m10-3v3M13 9l-4 5h4l-2 4 5-6h-4Z', title: '虚拟电厂', description: '实时调整、灵活高效' },
  { id: 'cooling', iconPath: 'M12 2v20M3 7l18 10M3 17 21 7M8 4l4 4 4-4M8 20l4-4 4 4M3 11l5-2-1-5m14 9-5 2 1 5', title: '冷热源智控系统', description: '实时调整、灵活高效' },
  { id: 'solar-forecast', iconPath: 'M4 13h16l2 8H2ZM6 17h12m-6-4v8M12 2v3M4 6l2 2m14-2-2 2M8 10a4 4 0 0 1 8 0', title: '光伏高精度功率预测系统', description: '精准发电预测，提升电站效益' },
  { id: 'preventive-test', iconPath: 'M5 7h14v14H5ZM8 3h8v4H8ZM8 13h8m-8 4h5', title: '预防性试验', description: '精准发电预测，提升电站效益' },
  { id: 'safety', iconPath: 'M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6ZM8 12l3 3 5-6', title: '安全管理平台', description: '精准发电预测，提升电站效益' },
  { id: 'storage', iconPath: 'M4 5h16v16H4ZM9 2h6M8 9v8m4-8v8m4-8v8', title: '储能智能运维管理系统', description: '精准发电预测，提升电站效益' },
]

export const platformApps: HomeEntry[] = [
  { id: 'foundation', iconPath: 'M12 3a4 4 0 0 0-4 4H4v4a4 4 0 0 0 0 8v2h16v-6a4 4 0 0 1 0-8h-4a4 4 0 0 0-4-4Z', title: '系统基础应用', description: '提供系统基础功能支持' },
  { id: 'modeling', iconPath: 'M12 2 3 7v10l9 5 9-5V7ZM3 7l9 5 9-5m-9 5v10M7 5l10 6', title: '综合能源建模', description: '对项目进行多维度数字孪生建模' },
  { id: 'iot', iconPath: 'M8 8h8v8H8ZM3 3h3v3H3Zm15 0h3v3h-3ZM3 18h3v3H3Zm15 0h3v3h-3ZM6 6l2 2m8 8 2 2M6 18l2-2m8-8 2-2', title: '物联网平台 XIoT', description: '配置和接入物联网设备' },
  { id: 'turing', iconPath: 'M3 3h6v6H3Zm12 0h6v6h-6ZM3 15h6v6H3Zm12 0h6v6h-6ZM9 6h6m-9 3v6m12-6v6m-9 3h6', title: '图灵 Turing', description: '绘制系统组态图' },
  { id: 'compute', iconPath: 'M7 7h10v10H7ZM4 4h16v16H4ZM8 1v3m4-3v3m4-3v3M8 20v3m4-3v3m4-3v3M1 8h3m-3 4h3m-3 4h3m16-8h3m-3 4h3m-3 4h3', title: '计算引擎', description: '提供高效计算能力' },
  { id: 'workflow', iconPath: 'M8 2h8v5H8ZM2 17h8v5H2Zm12 0h8v5h-8ZM12 7v5M6 17v-5h12v5', title: '流程引擎', description: '可视化设计，自动化执行' },
  { id: 'forms', iconPath: 'M3 3h18v18H3ZM3 9h18M9 3v18m0-6h12m-8-3h5', title: '动态表单', description: '实时调整、灵活高效' },
  { id: 'reports', iconPath: 'M3 3v18h18M7 17v-5h3v5Zm5 0V8h3v9Zm5 0V4h3v13Z', title: '报表工具', description: '支持自定义设计和生成各类报表' },
]

export const helpDocuments = [
  { id: 'initial-password', title: '如何获取云服务器的初始密码？' },
  { id: 'traffic-statistics', title: '为什么控制台用量统计中展示的流量数据与日志计算不同？' },
  { id: 'password-help', title: '如何获取云服务器的初始密码？' },
]

export const homeContact = {
  title: '联系我们',
  description: '任何问题我们都会全力为您解答',
}
