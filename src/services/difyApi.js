/**
 * Dify API 服务 - 处理与 AI 聊天的接口
 * 
 * 配置优先级：
 * 1. 系统环境变量 (VITE_DIFY_API_KEY, VITE_DIFY_BASE_URL)
 * 2. .env 文件中的变量
 * 3. 默认值（如果有）
 */

/**
 * 获取 API 配置，支持多种来源
 * @returns {Object} API 配置对象
 */
function getApiConfig() {
  // Vite 会自动从以下来源读取环境变量（按优先级）：
  // 1. 系统环境变量
  // 2. .env.local 文件
  // 3. .env.[mode] 文件
  // 4. .env 文件
  
  const API_KEY = import.meta.env.VITE_DIFY_API_KEY
  const BASE_URL = import.meta.env.VITE_DIFY_BASE_URL || 'https://api.dify.ai/v1/chat-messages'
  
  return {
    API_KEY,
    BASE_URL,
    isValid: !!(API_KEY && BASE_URL)
  }
}

/**
 * 获取配置信息用于调试
 * @returns {Object} 配置来源信息
 */
export function getConfigInfo() {
  const config = getApiConfig()
  
  return {
    hasApiKey: !!config.API_KEY,
    hasBaseUrl: !!config.BASE_URL,
    baseUrl: config.BASE_URL,
    apiKeyLength: config.API_KEY ? config.API_KEY.length : 0,
    configSources: [
      'System Environment Variables (highest priority)',
      '.env.local file',
      '.env.[mode] file', 
      '.env file (lowest priority)'
    ]
  }
}

/**
 * 发送聊天消息到 Dify API
 * @param {string} query - 用户查询内容
 * @param {Object} options - 可选参数
 * @returns {Promise<Object>} API 响应结果
 */
export async function sendChatMessage(query, options = {}) {
  const {
    inputs = {},
    response_mode = "blocking",
    conversation_id = "",
    user = "abc-123",
    files = null
  } = options

  // 获取 API 配置
  const config = getApiConfig()

  if (!config.isValid) {
    const configInfo = getConfigInfo()
    throw new Error(
      `Missing API configuration. Please set VITE_DIFY_API_KEY and VITE_DIFY_BASE_URL in:\n` +
      `- System environment variables, or\n` +
      `- .env file in project root\n\n` +
      `Current status:\n` +
      `- API Key: ${configInfo.hasApiKey ? 'Set' : 'Missing'}\n` +
      `- Base URL: ${configInfo.hasBaseUrl ? 'Set' : 'Missing'}`
    )
  }

  const headers = {
    "Authorization": `Bearer ${config.API_KEY}`,
    "Content-Type": "application/json"
  }

  const payload = {
    inputs,
    query,
    response_mode,
    conversation_id,
    user,
    ...(files && { files })
  }

  try {
    const response = await fetch(config.BASE_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    
    // 解析返回的答案，期望是 JSON 格式
    if (result.answer) {
      try {
        const parsedAnswer = JSON.parse(result.answer)
        return {
          success: true,
          data: {
            elon_chat: parsedAnswer.elon_chat || '',
            elon_x: parsedAnswer.elon_x || null,
            elon_score: parsedAnswer.elon_score || 5
          },
          raw: result
        }
      } catch (parseError) {
        // 如果不是 JSON 格式，作为普通聊天回复处理
        return {
          success: true,
          data: {
            elon_chat: result.answer,
            elon_x: null,
            elon_score: 5
          },
          raw: result
        }
      }
    }

    return {
      success: false,
      error: 'No valid response received',
      raw: result
    }

  } catch (error) {
    console.error('Dify API error:', error)
    return {
      success: false,
      error: error.message,
      data: {
        elon_chat: 'Sorry, I cannot respond right now. Please try again later.',
        elon_x: null,
        elon_score: 5
      }
    }
  }
}

/**
 * 验证 API 配置是否正确
 * @returns {boolean} 配置是否有效
 */
export function validateApiConfig() {
  const config = getApiConfig()
  return config.isValid
}
