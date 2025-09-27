import { useEffect, useState, useRef } from 'react'
import ChatPanel from './components/ChatPanel'
import ImagePanel from './components/ImagePanel'
import TweetsPanel from './components/TweetsPanel'
import { useLocalStorage } from './hooks/useLocalStorage'
import { initialTweets, muskProfile } from './data/musk'

export default function App() {
  const [messages, setMessages] = useState([
    { side: 'right', text: 'Hello, I need some help.' },
    { side: 'left', text: 'Hello! I\'m an AI assistant, happy to help you! What can I do for you?' },
  ])

  const [tweets, setTweets] = useLocalStorage('musk.tweets', initialTweets)
  const [activeTab, setActiveTab] = useLocalStorage('musk.activeTab', 'Posts')
  
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

  const handleSend = (text) => {
    // append chat (right)
    setMessages(prev => [...prev, { side: 'right', text }])
    // simple auto response
    setTimeout(() => {
      setMessages(prev => [...prev, { side: 'left', text: 'Got it! I\'ll post this message to the Twitter feed on the right.' }])
    }, 300)

    // add to tweets (Posts) — 新发推文不再自动预置评论
    setTweets(prev => [
      { id: Date.now(), text, likes: 0, liked: false, time: 'now', category: 'Posts' },
      ...prev,
    ])
    setActiveTab('Posts')
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
        <ChatPanel messages={messages} onSend={handleSend} />
      </div>
      
      {/* 左侧拖拽条 */}
      <div 
        className="w-1 bg-gray-700 hover:bg-gray-500 cursor-col-resize flex-shrink-0"
        onMouseDown={() => handleMouseDown('left')}
      />
      
      {/* 中间面板 */}
      <div className="min-w-0" style={{ width: `${middleWidth}%` }}>
        <ImagePanel />
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
