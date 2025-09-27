import { useState } from 'react'

export default function ChatPanel({ messages, onSend }) {
  const [text, setText] = useState('')

  const handleSend = () => {
    const t = text.trim()
    if (!t) return
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
      <div className="p-4 border-b border-gray-700 flex-shrink-0">
        <h2 className="text-xl font-semibold">AI Assistant</h2>
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
            className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
          />
          <button data-testid="send" onClick={handleSend} className="rounded-[4px] bg-blue-600 px-4 py-2 hover:bg-blue-700 whitespace-nowrap">Send</button>
        </div>
      </div>
    </div>
  )
}
