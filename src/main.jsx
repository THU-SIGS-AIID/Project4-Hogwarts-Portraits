import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// fontawesome + tailwind via npm; fontawesome we keep via CDN link in index.html? No: we'll inject link tag dynamically here to avoid extra HTML edits.
const fa = document.createElement('link')
fa.rel = 'stylesheet'
fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
document.head.appendChild(fa)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

