export interface HomeEntry {
  id: string
  title: string
  description: string
}

// 首页本地演示数据，不代表真实用户或登录记录。
export const homeProfile = {
  systemName: '智慧能源管理系统',
  greeting: '上午好，系统管理员～',
  lastLoginTime: '2024-10-09 12:12:12',
  lastLoginIp: 'XXX.XXXX',
  name: '咸菜超人',
  id: '78365494764',
}

export const businessApps: HomeEntry[] = [
  { id: 'energy', title: '能碳管理系统', description: '提升能源管理效率，降本增效' },
  { id: 'dispatch', title: '智控优化调度系统', description: '实时监控系统状态' },
  { id: 'maintenance', title: '智能运维系统', description: '丰富的运维工具，提升运维效率' },
  { id: 'microgrid', title: '光储充微网运行优化系统', description: '提升运行效率，提高收益' },
  { id: 'virtual-power', title: '虚拟电厂', description: '实时调整、灵活高效' },
  { id: 'cooling', title: '冷热源智控系统', description: '实时调整、灵活高效' },
  { id: 'solar-forecast', title: '光伏高精度功率预测系统', description: '精准发电预测，提升电站效益' },
  { id: 'preventive-test', title: '预防性试验', description: '精准发电预测，提升电站效益' },
  { id: 'safety', title: '安全管理平台', description: '精准发电预测，提升电站效益' },
  { id: 'storage', title: '储能智能运维管理系统', description: '精准发电预测，提升电站效益' },
]

export const platformApps: HomeEntry[] = [
  { id: 'foundation', title: '系统基础应用', description: '提供系统基础功能支持' },
  { id: 'modeling', title: '综合能源建模', description: '对项目进行多维度数字孪生建模' },
  { id: 'iot', title: '物联网平台 XIoT', description: '配置和接入物联网设备' },
  { id: 'turing', title: '图灵 Turing', description: '绘制系统组态图' },
  { id: 'compute', title: '计算引擎', description: '提供高效计算能力' },
  { id: 'workflow', title: '流程引擎', description: '可视化设计，自动化执行' },
  { id: 'forms', title: '动态表单', description: '实时调整、灵活高效' },
  { id: 'reports', title: '报表工具', description: '支持自定义设计和生成各类报表' },
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
