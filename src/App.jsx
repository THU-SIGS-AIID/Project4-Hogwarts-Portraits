import { useEffect, useState, useRef } from 'react'
import ChatPanel from './components/ChatPanel'
import ImagePanel from './components/ImagePanel'
import TweetsPanel from './components/TweetsPanel'
import { useLocalStorage } from './hooks/useLocalStorage'
import { initialTweets, muskProfile } from './data/musk'
import { sendChatMessage, validateApiConfig } from './services/difyApi'

export default function App() {
  const [messages, setMessages] = useState([
    { side: 'right', text: 'Hey Elon! What are you working on today?' },
    { side: 'left', text: 'Hey there! Just wrapped up a Starship meeting. We\'re making incredible progress on the next launch. Always exciting to push the boundaries of what\'s possible! What\'s on your mind?' },
  ])

  const [tweets, setTweets] = useLocalStorage('musk.tweets', initialTweets)
  const [activeTab, setActiveTab] = useLocalStorage('musk.activeTab', 'Posts')
  const [expressionScore, setExpressionScore] = useState(5)
  const [isLoading, setIsLoading] = useState(false)
  
  // 一次性迁移：确保 commentCount 与 comments.length 一致（修复旧本地缓存）
  useEffect(() => {
    setTweets(prev => {
      let changed = false
      const normalized = prev.map(t => {
        const expected = Array.isArray(t.comments) ? t.comments.length : 0
        const current = typeof t.commentCount === 'number' ? t.commentCount : 0
        if (current !== expected) {
          changed = true
          return { ...t, commentCount: expected }
        }
        return t
      })
      return changed ? normalized : prev
    })
  }, [])

  // 更新推文的评论数据
  const updateTweetComments = (tweetId, newComments) => {
    setTweets(prev => prev.map(tweet => 
      tweet.id === tweetId 
        ? { ...tweet, comments: newComments, commentCount: newComments.length }
        : tweet
    ))
  }
  
  // 面板宽度状态
  const [leftWidth, setLeftWidth] = useState(30) // 百分比
  const [rightWidth, setRightWidth] = useState(30) // 百分比
  const middleWidth = 100 - leftWidth - rightWidth
  
  const [isDragging, setIsDragging] = useState(null)
  const containerRef = useRef(null)

  const handleSend = async (text) => {
    if (isLoading) return
    
    // 检查 API 配置
    if (!validateApiConfig()) {
      alert('Please configure Dify API settings:\n\n1. Click the settings icon (⚙️) in the chat panel, or\n2. Set VITE_DIFY_API_KEY and VITE_DIFY_BASE_URL in environment variables or .env file')
      return
    }
    
    // 添加用户消息
    setMessages(prev => [...prev, { side: 'right', text }])
    setIsLoading(true)
    
    try {
      // 调用 Dify API
      const result = await sendChatMessage(text)
      
      if (result.success && result.data) {
        const { elon_chat, elon_x, elon_score } = result.data
        
        // 添加 AI 回复到聊天
        if (elon_chat) {
          setMessages(prev => [...prev, { side: 'left', text: elon_chat }])
        }
        
        // 更新表情分数
        if (typeof elon_score === 'number' && elon_score >= 0 && elon_score <= 10) {
          setExpressionScore(elon_score)
        }
        
        // 发推特（如果内容不为空且长度大于8个字符）
        if (elon_x && typeof elon_x === 'string' && elon_x.length > 8) {
          setTweets(prev => [
            {
              id: Date.now(),
              text: elon_x,
              likes: 0,
              liked: false,
              time: 'now',
              category: 'Posts',
              commentCount: 0,
              comments: []
            },
            ...prev,
          ])
          setActiveTab('Posts')
        }
      } else {
        // API 调用失败，显示错误消息
        setMessages(prev => [...prev, { 
          side: 'left', 
          text: result.data?.elon_chat || 'Sorry, I cannot respond right now. Please try again later.' 
        }])
      }
    } catch (error) {
      console.error('Send message failed:', error)
      setMessages(prev => [...prev, { 
        side: 'left', 
        text: 'Sorry, there was a system error. Please try again later.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const toggleLike = (id) => {
    setTweets(prev => prev.map(t => t.id === id
      ? { ...t, liked: !t.liked, likes: t.liked ? Math.max(0, t.likes - 1) : t.likes + 1 }
      : t
    ))
  }

  // 拖拽处理函数
  const handleMouseDown = (divider) => {
    setIsDragging(divider)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return
    
    const containerRect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - containerRect.left
    const percentage = (x / containerRect.width) * 100
    
    if (isDragging === 'left') {
      const newLeftWidth = Math.max(15, Math.min(60, percentage))
      setLeftWidth(newLeftWidth)
    } else if (isDragging === 'right') {
      const newRightWidth = Math.max(15, Math.min(60, 100 - percentage))
      setRightWidth(newRightWidth)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(null)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  return (
    <div ref={containerRef} className="flex h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* 左侧面板 */}
      <div className="min-w-0" style={{ width: `${leftWidth}%` }}>
        <ChatPanel messages={messages} onSend={handleSend} isLoading={isLoading} />
      </div>
      
      {/* 左侧拖拽条 */}
      <div 
        className="w-1 bg-gray-700 hover:bg-gray-500 cursor-col-resize flex-shrink-0"
        onMouseDown={() => handleMouseDown('left')}
      />
      
      {/* 中间面板 */}
      <div className="min-w-0" style={{ width: `${middleWidth}%` }}>
        <ImagePanel expressionScore={expressionScore} />
      </div>
      
      {/* 右侧拖拽条 */}
      <div 
        className="w-1 bg-gray-700 hover:bg-gray-500 cursor-col-resize flex-shrink-0"
        onMouseDown={() => handleMouseDown('right')}
      />
      
      {/* 右侧面板 */}
      <div className="min-w-0" style={{ width: `${rightWidth}%` }}>
      <TweetsPanel
        profile={muskProfile}
        tweets={tweets}
        onToggleLike={toggleLike}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onUpdateComments={updateTweetComments}
      />
      </div>
    </div>
  )
}
