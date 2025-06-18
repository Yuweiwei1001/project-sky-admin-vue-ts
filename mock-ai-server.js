// // AI聊天API的测试服务配置
// // 该文件演示了如何在开发环境中模拟AI聊天API

// const express = require('express')
// const cors = require('cors')
// const app = express()

// app.use(cors())
// app.use(express.json())

// // 模拟的会话存储
// const conversations = new Map()

// // 生成随机ID
// function generateId() {
//   return Date.now().toString(36) + Math.random().toString(36).substr(2)
// }

// // 智能回复生成器
// function generateAIReply(message, context = []) {
//   const responses = {
//     '营业': '根据今日数据显示，营业额较昨日增长15%，外卖订单占比62%，堂食订单占比38%。建议继续优化外卖配送效率。',
//     '菜品': '目前最受欢迎的菜品TOP3：\n1. 宫保鸡丁 - 日销量156份\n2. 麻婆豆腐 - 日销量142份\n3. 糖醋里脊 - 日销量138份\n\n建议增加库存并考虑推出相关套餐。',
//     '满意度': '提升客户满意度建议：\n✅ 优化出餐速度（目标15分钟内）\n✅ 严格食材质检，确保新鲜度\n✅ 完善服务培训，提升员工素质\n✅ 建立快速反馈渠道\n✅ 定期收集客户建议',
//     '库存': '智能库存管理方案：\n📊 建立预警系统（低于安全库存自动提醒）\n📈 基于历史数据预测需求\n🤝 与供应商建立稳定合作关系\n🔄 采用先进先出原则\n📝 定期盘点，减少损耗',
//     '员工': '员工管理优化建议：\n👥 完善员工培训体系\n⏰ 合理安排工作时间\n💰 建立激励机制\n📋 定期绩效评估\n🎯 明确岗位职责',
//     '订单': '订单管理数据分析：\n📊 今日订单总数：286单\n⏰ 平均处理时间：12分钟\n📈 环比增长：+8.5%\n🔄 退单率：2.1%（行业平均3.2%）'
//   }

//   // 寻找匹配的关键词
//   for (const [keyword, response] of Object.entries(responses)) {
//     if (message.includes(keyword)) {
//       return response
//     }
//   }

//   // 默认回复
//   return `感谢您的咨询："${message}"。\n\n作为苍穹外卖智能助手，我可以帮助您：\n• 查看营业数据分析\n• 获取菜品销量统计\n• 了解客户满意度情况\n• 管理库存和员工\n• 分析订单趋势\n\n请告诉我您需要了解哪方面的信息？`
// }

// // API路由

// // 发送消息
// app.post('/api/ai/chat/send', (req, res) => {
//   try {
//     const { message, conversationId, context } = req.body

//     if (!message) {
//       return res.json({
//         code: 0,
//         msg: '消息内容不能为空'
//       })
//     }

//     // 获取或创建会话
//     let convId = conversationId
//     if (!convId) {
//       convId = generateId()
//       conversations.set(convId, [])
//     }

//     // 生成AI回复
//     const reply = generateAIReply(message, context)
//     const messageId = generateId()
//     const timestamp = Date.now()

//     // 保存消息记录
//     const conversation = conversations.get(convId) || []
//     conversation.push(
//       { role: 'user', content: message, timestamp },
//       { role: 'assistant', content: reply, timestamp: timestamp + 1 }
//     )
//     conversations.set(convId, conversation)

//     // 模拟网络延迟
//     setTimeout(() => {
//       res.json({
//         code: 1,
//         msg: '成功',
//         data: {
//           reply,
//           conversationId: convId,
//           messageId,
//           timestamp
//         }
//       })
//     }, 800 + Math.random() * 1200) // 0.8-2秒随机延迟

//   } catch (error) {
//     res.json({
//       code: 0,
//       msg: '服务器内部错误',
//       data: null
//     })
//   }
// })

// // 获取聊天历史
// app.get('/api/ai/chat/history', (req, res) => {
//   const { conversationId } = req.query

//   if (!conversationId) {
//     return res.json({
//       code: 1,
//       msg: '成功',
//       data: []
//     })
//   }

//   const history = conversations.get(conversationId) || []

//   res.json({
//     code: 1,
//     msg: '成功',
//     data: history
//   })
// })

// // 创建新会话
// app.post('/api/ai/chat/conversation', (req, res) => {
//   const conversationId = generateId()
//   conversations.set(conversationId, [])

//   res.json({
//     code: 1,
//     msg: '成功',
//     data: {
//       conversationId
//     }
//   })
// })

// // 清空会话记录
// app.post('/api/ai/chat/clear', (req, res) => {
//   const { conversationId } = req.query

//   if (conversationId && conversations.has(conversationId)) {
//     conversations.set(conversationId, [])
//   }

//   res.json({
//     code: 1,
//     msg: '会话记录已清空'
//   })
// })

// // 获取AI配置信息
// app.get('/api/ai/config', (req, res) => {
//   res.json({
//     code: 1,
//     msg: '成功',
//     data: {
//       modelName: '苍穹外卖智能助手',
//       version: '1.0.0',
//       capabilities: [
//         '营业数据分析',
//         '菜品销量统计',
//         '客户满意度管理',
//         '库存管理建议',
//         '员工管理优化',
//         '订单趋势分析'
//       ],
//       maxTokens: 2048,
//       temperature: 0.7
//     }
//   })
// })

// // 健康检查
// app.get('/api/health', (req, res) => {
//   res.json({
//     code: 1,
//     msg: 'AI聊天服务运行正常',
//     timestamp: Date.now()
//   })
// })

// const PORT = process.env.PORT || 3001

// app.listen(PORT, () => {
//   console.log(`🤖 AI聊天测试服务器已启动`)
//   console.log(`📡 服务地址: http://localhost:${PORT}`)
//   console.log(`🔗 健康检查: http://localhost:${PORT}/api/health`)
//   console.log(`💬 开始与苍穹外卖智能助手对话吧！`)
// })

// module.exports = app
