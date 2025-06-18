import request from '@/utils/request';

/**
 * AI聊天API接口
 */

// 定义消息类型接口
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

// 定义发送消息的请求参数
export interface SendMessageRequest {
  message: string;
  conversationId?: string;
}

// 定义AI响应数据结构
export interface AIResponse {
  code: number;
  msg: string | null;
  data: string;
  conversationId: string | null;
  timestamp: number;
  type: 'text' | 'table' | 'echart';
}

// 发送消息到AI后端
export const sendMessageToAI = (params: SendMessageRequest) => {
  return request({
    url: '/ai/chat',
    method: 'post',
    data: params
  });
};

// 获取聊天历史记录
export const getChatHistory = (conversationId?: string) => {
  return request({
    url: '/ai/history',
    method: 'get',
    params: { conversationId }
  });
};

// 创建新的对话
export const createConversation = () => {
  return request({
    url: '/ai/conversation',
    method: 'post'
  });
};

// 删除对话记录
export const deleteConversation = (conversationId: string) => {
  return request({
    url: '/ai/conversation',
    method: 'delete',
    params: { conversationId }
  });
};

// 清空当前对话记录
export const clearChatHistory = (conversationId: string) => {
  return request({
    url: '/ai/clear',
    method: 'post',
    params: { conversationId }
  });
};

// 获取AI模型配置信息
export const getAIModelConfig = () => {
  return request({
    url: '/ai/config',
    method: 'get'
  });
};

// 流式发送消息（支持实时响应）
export const sendMessageStream = (params: SendMessageRequest) => {
  return request({
    url: '/ai/stream',
    method: 'post',
    data: params,
    responseType: 'stream'
  });
};
