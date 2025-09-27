/**
 * 表情管理器 - 动态加载和选择 Elon 表情图片
 */

// 动态导入所有表情图片
const expressionModules = import.meta.glob('../assets/elon_expression/*.png', { 
  eager: true,
  as: 'url'
})

/**
 * 解析表情图片映射
 * @returns {Object} score到图片数组的映射
 */
function parseExpressions() {
  const expressionMap = {}
  
  Object.entries(expressionModules).forEach(([path, url]) => {
    const filename = path.split('/').pop().replace('.png', '')
    const [score] = filename.split('_')
    const scoreNum = parseInt(score)
    
    if (!expressionMap[scoreNum]) {
      expressionMap[scoreNum] = []
    }
    expressionMap[scoreNum].push(url)
  })
  
  return expressionMap
}

/**
 * 根据分数获取对应的表情图片
 * @param {number} score - 1-10的分数
 * @returns {string} 图片URL
 */
export function getExpressionByScore(score = 5) {
  const expressionMap = parseExpressions()
  
  // 确保分数在1-10范围内
  const validScore = Math.max(0, Math.min(10, parseInt(score)))
  
  // 获取对应分数的图片数组
  const expressions = expressionMap[validScore]
  
  if (!expressions || expressions.length === 0) {
    // 如果没有找到对应分数的图片，返回默认图片(5_1)
    console.warn(`未找到分数 ${validScore} 对应的表情图片，使用默认表情`)
    return expressionMap[5]?.[0] || Object.values(expressionMap)[0]?.[0]
  }
  
  // 如果有多个图片，随机选择一个
  const randomIndex = Math.floor(Math.random() * expressions.length)
  return expressions[randomIndex]
}

/**
 * 获取默认表情图片 (5_1.png)
 * @returns {string} 默认图片URL
 */
export function getDefaultExpression() {
  return getExpressionByScore(5)
}

/**
 * 获取所有可用的表情分数
 * @returns {number[]} 分数数组
 */
export function getAvailableScores() {
  const expressionMap = parseExpressions()
  return Object.keys(expressionMap).map(score => parseInt(score)).sort((a, b) => a - b)
}
