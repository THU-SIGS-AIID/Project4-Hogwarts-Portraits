import { useState, useEffect } from 'react'

export default function ChatPanel({ messages, onSend, isLoading = false }) {
  const [text, setText] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [baseUrl, setBaseUrl] = useState('')

  // 加载保存的设置
  useEffect(() => {
    const savedApiKey = localStorage.getItem('dify_api_key')
    const savedBaseUrl = localStorage.getItem('dify_base_url')
    if (savedApiKey) setApiKey(savedApiKey)
    if (savedBaseUrl) setBaseUrl(savedBaseUrl)
  }, [])

  // 保存设置到 localStorage 和环境变量
  const saveSettings = () => {
    if (apiKey.trim()) {
      localStorage.setItem('dify_api_key', apiKey.trim())
      // 动态设置环境变量（仅在客户端有效）
      window.VITE_DIFY_API_KEY = apiKey.trim()
    } else {
      localStorage.removeItem('dify_api_key')
      delete window.VITE_DIFY_API_KEY
    }

    if (baseUrl.trim()) {
      localStorage.setItem('dify_base_url', baseUrl.trim())
      // 动态设置环境变量（仅在客户端有效）
      window.VITE_DIFY_BASE_URL = baseUrl.trim()
    } else {
      localStorage.removeItem('dify_base_url')
      delete window.VITE_DIFY_BASE_URL
    }

    setShowSettings(false)
    alert('Settings saved! The new configuration will be used for future API calls.')
  }

  const handleSend = () => {
    const t = text.trim()
    if (!t || isLoading) return
    onSend(t)
    setText('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="w-full h-screen border-r border-gray-700 flex flex-col bg-gray-900 text-white min-w-0">
      <div className="p-4 border-b border-gray-700 flex-shrink-0 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Chat with Musk</h2>
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          title="API Settings"
        >
          <i className="fas fa-cog text-gray-400 hover:text-white"></i>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((m, idx) => (
          <div key={idx} className={m.side === 'right' ? 'flex justify-end' : 'flex justify-start'}>
            <div className={`max-w-[70%] p-3 rounded-lg ${m.side === 'right' ? 'bg-blue-600' : 'bg-gray-700'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-700 flex-shrink-0">
        <div className="flex gap-2">
          <input
            data-testid="chat-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={isLoading}
            className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder={isLoading ? "Typing..." : "Type a message..."}
          />
          <button 
            data-testid="send" 
            onClick={handleSend} 
            disabled={isLoading || !text.trim()}
            className={`rounded-[4px] px-4 py-2 whitespace-nowrap transition-colors ${
              isLoading || !text.trim() 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Typing...</span>
              </div>
            ) : (
              'Send'
            )}
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96 max-w-[90vw]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Dify API Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your Dify API Key"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Base URL
                </label>
                <input
                  type="text"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://api.dify.ai/v1/chat-messages"
                />
              </div>

              <div className="text-xs text-gray-400">
                <p>• Settings are saved locally and will override environment variables</p>
                <p>• Leave empty to use environment variables (.env file)</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={saveSettings}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Save Settings
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
