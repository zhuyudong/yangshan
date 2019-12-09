const refers = ['阮一峰']

const types = [
  { label: '开源软件&工具', value: 'software' },
  { label: '新闻', value: 'new' },
  { label: '文章', value: 'doc' }
]

const tags = [
  'GO',
  'NPM',
  'CSS',
  'TCP',
  'Vue',
  'NLP',
  'API',
  'HTML',
  'HTTP',
  'React',
  'Nginx',
  'Linux',
  'WebGL',
  'MacOS',
  'Chrome',
  'Canvas',
  'Python',
  'Node.js',
  'Leetcode',
  'Markdown',
  'JavaScript',
  'TypeScript',
  '网站',
  '模板',
  '资讯',
  '数据',
  '规范',
  '框架',
  '协议',
  '加密',
  '算法',
  '教程',
  '游戏',
  '图像',
  '命令行',
  '数据库',
  '服务器',
  '电子书',
  '编辑器',
  '可视化',
  '浏览器',
  '在线工具',
  '搜索引擎',
  '数据结构',
  '人工智能',
  '机器学习',
  '深度学习',
  '自然语言处理'
]
const tagRegs = tags.map(i => ({
  tag: i,
  reg: new RegExp(i, 'i')
}))

exports.refers = refers
exports.types = types
exports.tags = tags
exports.tagRegs = tagRegs
