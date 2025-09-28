import { useMemo, useState, useEffect, useRef } from 'react'
import TweetCard from './TweetCard'
import { mediaImages } from '../data/musk'

// 评论弹窗组件
function CommentModal({ tweet, isOpen, onClose, profile, onUpdateComments }) {
  // 使用推文中的预设评论数据
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const [selectedDate, setSelectedDate] = useState('') // yyyy-mm-dd
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [isComposing, setIsComposing] = useState(false)

  // 当打开弹窗时，加载推文的评论数据
  useEffect(() => {
    if (isOpen && tweet) {
      if (tweet.comments && Array.isArray(tweet.comments)) {
        setComments([...tweet.comments])
      } else {
        setComments([])
      }
    } else {
      setComments([])
    }
  }, [tweet, isOpen])

  const handleSubmitComment = () => {
    if (!newComment.trim()) return
    
    // Add user comment
    const userComment = {
      id: Date.now(),
      author: 'You',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
      text: newComment,
      time: 'now',
      likes: 0,
      scheduledFor: selectedDate || undefined,
    }
    
    const updatedComments = [...comments, userComment]
    setComments(updatedComments)
    setNewComment('')
    setShowEmoji(false)
    setSelectedDate('')
    
    // 持久化保存评论到推文数据
    if (onUpdateComments && tweet) {
      onUpdateComments(tweet.id, updatedComments)
    }
    
    // Simulate Elon Musk's auto reply after 2 seconds
    setTimeout(() => {
      const elonReplies = [
        'Thanks for the feedback! Always working to improve. 🚀',
        'Interesting perspective! The future is going to be wild.',
        'Absolutely! Innovation never stops. 🔧',
        'Great point! We\'re pushing the boundaries every day.',
        'Exactly what I was thinking! Let\'s make it happen. ⚡',
        'The engineering challenges are what make it fun! 🛠️',
        'This is just the beginning. Much more to come! 🌟',
        'Love the enthusiasm! Mars, here we come! 🔴'
      ]
      
      const randomReply = elonReplies[Math.floor(Math.random() * elonReplies.length)]
      
      const elonReply = {
        id: Date.now() + 1,
        author: 'Elon Musk',
        avatar: profile?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
        text: randomReply,
        time: 'now',
        likes: Math.floor(Math.random() * 50) + 10,
        isVerified: true
      }
      
      const finalComments = [...updatedComments, elonReply]
      setComments(finalComments)
      
      // 持久化保存包含 Elon 回复的评论
      if (onUpdateComments && tweet) {
        onUpdateComments(tweet.id, finalComments)
      }
    }, 2000)
  }

  // 禁止弹窗打开时的页面滚动，关闭时恢复
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow || 'auto'
      document.body.style.overflow = 'hidden'
      return () => { 
        document.body.style.overflow = prev
      }
    }
  }, [isOpen])

  if (!isOpen || !tweet) return null

  const emojis = ['😀','😄','😂','😉','😊','😍','🤔','😮','😎','🙌','👍','🚀','🔥','✨','⚡','🌟','💡','🎉','❤️']

  const handlePickEmoji = (emo) => {
    setNewComment(prev => prev + emo)
    setShowEmoji(false)
  }

  // 图片功能已取消

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm overscroll-none">
      {/* 背景遮罩 */}
      <div className="absolute inset-0 z-0" onClick={onClose}></div>
      
      {/* 弹窗内容 */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] mx-4 bg-gray-900 rounded-2xl overflow-visible shadow-2xl border border-gray-700 flex flex-col min-h-0">
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-800 flex items-center justify-center transition-colors"
            >
              <i className="fas fa-times text-gray-400"></i>
            </button>
            <h3 className="text-white font-bold text-lg">Post</h3>
          </div>
          <span className="text-blue-400 text-sm">Drafts</span>
        </div>

        {/* 原推文 */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={profile?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop'} 
                alt="Elon Musk" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop'
                }}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-white">Elon Musk</span>
                <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.540.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/>
                </svg>
                <svg className="w-4 h-4 text-white bg-black rounded-sm" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-gray-500">@elonmusk · {tweet.time}</span>
              </div>
              <p className="text-white text-lg mb-3">{tweet.replyText || tweet.text || 'No text available'}</p>
              {tweet.quotedTweet && (
                <div className="mt-3 p-3 border border-gray-600 rounded-xl bg-gray-800">
                  <div className="flex items-center gap-2 mb-1">
                    <img src={tweet.quotedTweet.avatar} alt={tweet.quotedTweet.author} className="w-4 h-4 rounded-full" />
                    <span className="text-sm font-bold text-white">{tweet.quotedTweet.author}</span>
                    <span className="text-sm text-gray-500">{tweet.quotedTweet.handle} · {tweet.quotedTweet.time}</span>
                  </div>
                  <p className="text-white text-sm">{tweet.quotedTweet.text}</p>
                </div>
              )}
              {tweet.image && (
                <div className="rounded-xl overflow-hidden border border-gray-700 mb-3">
                  <img src={tweet.image} alt="tweet media" className="w-full h-auto object-cover" />
                </div>
              )}
              <div className="text-gray-500 text-sm mb-3">
                Replying to <span className="text-blue-400">@elonmusk</span>
              </div>
            </div>
          </div>
        </div>

        {/* 评论列表：填满中间区域并可滚动；阻止滚动串联到背景 */}
        <div className="flex-1 overflow-y-auto overscroll-contain min-h-0 p-4 space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={comment.avatar} 
                  alt={comment.author} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop'
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white">{comment.author}</span>
                  {comment.isVerified && (
                    <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.540.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/>
                    </svg>
                  )}
                  <span className="text-gray-500">· {comment.time}</span>
                  {comment.scheduledFor && (
                    <span className="ml-2 text-gray-400">on {comment.scheduledFor}</span>
                  )}
                </div>
                <p className="text-white mb-2">{comment.text}</p>
                {/* 图片功能取消，评论不再展示图片 */}
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <button className="hover:text-red-500 flex items-center gap-1">
                    <i className="far fa-heart"></i>
                    {comment.likes}
                  </button>
                  <button className="hover:text-blue-500">
                    <i className="far fa-comment"></i>
                  </button>
                  <button className="hover:text-green-500">
                    <i className="fas fa-retweet"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 评论输入区域 */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" 
                alt="Your avatar" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/100x100/374151/ffffff?text=U'
                }}
              />
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Post your reply"
                className="w-full bg-transparent text-white text-xl placeholder-gray-500 resize-none focus:outline-none min-h-[100px]"
                rows={3}
                onKeyDown={(e) => {
                  if (isComposing) return
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmitComment()
                  }
                }}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
              />
              {/* 图片功能取消，移除选中图片预览 */}
              {selectedDate && (
                <div className="mt-2 text-sm text-gray-400">Scheduled on {selectedDate}</div>
              )}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2 text-blue-400">
                  {/* 图片功能取消，不再提供上传按钮 */}
                  {/* 表情选择 */}
                  <div className="relative">
                    <button className="hover:bg-gray-800 p-2 rounded-full" onClick={() => setShowEmoji(v => !v)} title="Emoji">
                      <i className="far fa-smile"></i>
                    </button>
                    {showEmoji && (
                      <div className="absolute left-0 bottom-full mb-2 z-20 p-2 bg-gray-800 border border-gray-700 rounded-xl grid grid-cols-6 gap-1 shadow-xl w-64">
                        {emojis.map(e => (
                          <button key={e} className="w-8 h-8 text-xl hover:bg-gray-700 rounded flex items-center justify-center" onClick={() => handlePickEmoji(e)}>{e}</button>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* 日期选择 */}
                  <div className="relative">
                    <button 
                      className="hover:bg-gray-800 p-2 rounded-full"
                      title="Pick date"
                      type="button"
                      onClick={() => setShowDatePicker(v => !v)}
                    >
                      <i className="far fa-calendar"></i>
                    </button>
                    {showDatePicker && (
                      <div className="absolute bottom-full mb-2 z-30 p-2 bg-gray-800 border border-gray-700 rounded-xl shadow-xl">
                        <input 
                          type="date" 
                          className="bg-transparent text-white p-2 rounded border border-gray-700 focus:outline-none"
                          value={selectedDate}
                          onChange={(e) => { setSelectedDate(e.target.value); setShowDatePicker(false) }}
                          onBlur={() => setShowDatePicker(false)}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className={`px-6 py-2 rounded-full font-bold transition-colors ${
                    newComment.trim()
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TABS = ['Posts', 'Replies', 'Subs', 'Highlights', 'Media']

function MuskHeader({ profile }) {
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <button className="hover:bg-gray-800 rounded-full p-2"><i className="fas fa-arrow-left text-xl" /></button>
          <div>
            <div className="font-bold text-xl">Elon Musk</div>
            <div className="text-gray-500 text-sm">{profile.posts}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="hover:bg-gray-800 rounded-full p-2"><i className="fas fa-edit text-xl" /></button>
          <button className="hover:bg-gray-800 rounded-full p-2"><i className="fas fa-search text-xl" /></button>
        </div>
      </div>

      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl font-bold text-gray-400 mb-2">Grok</div>
            <div className="text-gray-500 text-lg tracking-wider">TO UNDERSTAND</div>
          </div>
        </div>
        <div className="absolute left-4 bottom-0 transform translate-y-1/2">
          <div className="w-32 h-32 rounded-full border-4 border-gray-900 overflow-hidden">
            <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="h-16" />
      </div>

      <div className="p-4 flex justify-end relative">
        <button 
          onClick={handleSubscribeClick}
          className={`rounded-[4px] bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 whitespace-nowrap font-bold transition-all duration-300 relative overflow-hidden ${
            subscribeEffect ? 'animate-pulse shadow-lg shadow-blue-500/50 bg-blue-600' : ''
          }`}
        >
          Subscribe
          {subscribeEffect && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-30 animate-ping"></div>
          )}
        </button>
        
        {/* 笑脸弹出特效 */}
        {emojiEffect && (
          <div className="absolute top-0 right-0 pointer-events-none">
            <div className="animate-bounce text-4xl">😊</div>
            <div className="animate-ping absolute top-2 right-2 text-2xl">✨</div>
            <div className="animate-pulse absolute top-1 right-8 text-xl">💖</div>
          </div>
        )}
      </div>

      <div className="px-4 mb-4">
        <h1 className="text-xl font-bold flex items-center gap-1">
          {profile.name}
          <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.540.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/>
          </svg>
          <svg className="w-4 h-4 text-white bg-black rounded-sm" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </h1>
        <div className="text-gray-500">{profile.handle}</div>
        {profile.website && (
          <div className="mt-2">
            <a href={`https://${profile.website}`} className="text-blue-400 hover:underline">{profile.website}</a>
          </div>
        )}
        <div className="flex items-center gap-4 mt-3 text-gray-500 text-sm">
          <div className="flex items-center gap-1">
            <i className="fas fa-calendar-alt" />
            <span>{profile.joined}</span>
          </div>
        </div>
        <div className="flex gap-5 mt-3">
          <div className="flex items-center gap-1">
            <span className="font-bold text-white">{profile.following}</span>
            <span className="text-gray-500">Following</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold text-white">{profile.followers}</span>
            <span className="text-gray-500">Followers</span>
          </div>
        </div>
        {profile.followedBy && (
          <div className="mt-2 text-gray-500 text-sm flex items-center gap-1">
            <div className="flex -space-x-1">
              <div className="w-4 h-4 bg-gray-600 rounded-full border border-gray-900"></div>
              <div className="w-4 h-4 bg-gray-600 rounded-full border border-gray-900"></div>
            </div>
            <span>{profile.followedBy}</span>
          </div>
        )}
      </div>
    </>
  )
}

export default function TweetsPanel({ profile, tweets, onToggleLike, activeTab, setActiveTab, onUpdateComments }) {
  const filtered = useMemo(() => tweets.filter(t => t.category === activeTab), [tweets, activeTab])
  const [selectedTweet, setSelectedTweet] = useState(null)
  const [commentModalOpen, setCommentModalOpen] = useState(false)
  const [subscribeEffect, setSubscribeEffect] = useState(false)
  const [emojiEffect, setEmojiEffect] = useState(false)

  const handleTweetClick = (tweet) => {
    setSelectedTweet(tweet)
    setCommentModalOpen(true)
  }

  const closeCommentModal = () => {
    setCommentModalOpen(false)
    setSelectedTweet(null)
  }

  const handleSubscribeClick = () => {
    // 触发发光特效
    setSubscribeEffect(true)
    
    // 触发笑脸弹出特效
    setEmojiEffect(true)
    
    // 重置特效
    setTimeout(() => {
      setSubscribeEffect(false)
    }, 600)
    
    setTimeout(() => {
      setEmojiEffect(false)
    }, 1500)
  }

  return (
    <div className="w-full h-screen bg-gray-900 text-white overflow-y-auto min-w-0">
      {/* 整个面板都可以滚动 */}
      <div className="min-h-full">
        <MuskHeader profile={profile} />

        {/* 可滚动的标签栏 */}
        <div className="sticky top-0 bg-gray-900 z-10 flex border-b border-gray-700 font-bold overflow-x-auto scrollbar-hide">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-3 py-4 hover:bg-gray-800 text-center whitespace-nowrap text-sm ${activeTab === tab ? 'border-b-2 border-blue-500 text-white' : 'text-gray-500'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 推文列表 / 媒体网格 */}
        <div className="pb-4">
          {activeTab === 'Subs' ? (
            // Subs 标签页显示订阅内容
            <div className="p-8 text-center relative">
              <div className="max-w-md mx-auto">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Unlock more with Subscriptions
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                  @elonmusk has shared 11 Subscriber-only posts. Subscribe to see their exclusive posts and bonus content.
                </p>
                <button 
                  onClick={handleSubscribeClick}
                  className={`bg-white text-black font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 relative overflow-hidden ${
                    subscribeEffect 
                      ? 'animate-pulse shadow-2xl shadow-yellow-400/50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
                      : 'hover:bg-gray-200'
                  }`}
                >
                  Subscribe
                  {subscribeEffect && (
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 opacity-40 animate-ping"></div>
                  )}
                </button>
              </div>
              
              {/* 大型笑脸弹出特效 - 仅在 Subs 页面 */}
              {emojiEffect && activeTab === 'Subs' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-8xl animate-bounce">🎉</div>
                  <div className="absolute top-1/3 left-1/3 text-6xl animate-ping">😄</div>
                  <div className="absolute top-1/2 right-1/3 text-5xl animate-pulse">🌟</div>
                  <div className="absolute bottom-1/3 left-1/2 text-4xl animate-bounce delay-150">💫</div>
                  <div className="absolute top-1/4 right-1/4 text-3xl animate-spin">✨</div>
                </div>
              )}
            </div>
          ) : activeTab === 'Media' ? (
            <div className="p-2 sm:p-4">
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                {mediaImages.map(img => (
                  <div key={img.id} className="w-full aspect-square overflow-hidden rounded-md border border-gray-700 bg-gray-800">
                    <img src={img.url} alt={`media-${img.id}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No content available</div>
          ) : (
            filtered.map(t => (
              <TweetCard 
                key={t.id} 
                tweet={t} 
                onToggleLike={onToggleLike}
                onTweetClick={handleTweetClick}
              />
            ))
          )}
        </div>
      </div>

      {/* 评论弹窗 */}
      <CommentModal 
        tweet={selectedTweet}
        isOpen={commentModalOpen}
        onClose={closeCommentModal}
        profile={profile}
        onUpdateComments={onUpdateComments}
      />
    </div>
  )
}
