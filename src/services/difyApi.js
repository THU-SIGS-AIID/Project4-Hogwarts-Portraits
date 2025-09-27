/**
 * Dify API 服务 - 处理与 AI 聊天的接口
 */

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

  // 从环境变量获取配置
  const API_KEY = import.meta.env.VITE_DIFY_API_KEY
  const BASE_URL = import.meta.env.VITE_DIFY_BASE_URL

  if (!API_KEY || !BASE_URL) {
    throw new Error('Please configure VITE_DIFY_API_KEY and VITE_DIFY_BASE_URL environment variables')
  }

  const headers = {
    "Authorization": `Bearer ${API_KEY}`,
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
    const response = await fetch(BASE_URL, {
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
  const API_KEY = import.meta.env.VITE_DIFY_API_KEY
  const BASE_URL = import.meta.env.VITE_DIFY_BASE_URL
  
  return !!(API_KEY && BASE_URL)
}
