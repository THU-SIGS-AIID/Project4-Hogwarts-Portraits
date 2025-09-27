import { formatCount } from '../lib/format'
import avatarImg from '../assets/avatar.jpg'

export default function TweetCard({ tweet, onToggleLike, onTweetClick }) {
  const handleTweetClick = (e) => {
    // 如果点击的是按钮，不触发推文点击
    if (e.target.closest('button')) {
      return
    }
    onTweetClick && onTweetClick(tweet)
  }

  return (
    <div 
      className="p-4 border-b border-gray-700 hover:bg-gray-800/50 cursor-pointer transition-colors"
      onClick={handleTweetClick}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={avatarImg}
              alt="Elon Musk Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold">Elon Musk</span>
            <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.540.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/>
            </svg>
            <svg className="w-4 h-4 text-white bg-black rounded-sm" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="text-gray-500">@elonmusk · {tweet.time}</span>
          </div>
          <p className="text-base whitespace-pre-wrap mb-3">{tweet.text}</p>
          {tweet.image && (
            <div className="mt-3 rounded-lg overflow-hidden border border-gray-700">
              <img src={tweet.image} alt="tweet media" className="w-full h-auto object-cover" />
            </div>
          )}
          <div className="mt-3 flex justify-between text-gray-500 select-none">
            <button 
              onClick={(e) => {
                e.stopPropagation()
                onTweetClick && onTweetClick(tweet)
              }}
              className="hover:text-blue-500 transition-colors"
            >
              <i className="far fa-comment" /> {tweet.commentCount || 0}
            </button>
            <button disabled className="hover:text-green-500 opacity-50 cursor-not-allowed">
              <i className="fas fa-retweet" /> 0
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation()
                onToggleLike(tweet.id)
              }}
              className={`transition-colors ${tweet.liked ? 'text-red-500' : 'hover:text-red-500'}`}
            >
              <i className={tweet.liked ? 'fas fa-heart' : 'far fa-heart'} /> {formatCount(tweet.likes)}
            </button>
            <button disabled className="hover:text-blue-500 opacity-50 cursor-not-allowed">
              <i className="far fa-share-square" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

