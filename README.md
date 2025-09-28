# Elon Musk Interactive Dashboard

A sophisticated three-panel React application that simulates an interactive experience with Elon Musk, featuring real-time AI chat, dynamic image galleries, and a fully functional Twitter-like interface.

## 🚀 Features

### Left Panel - AI Chat Interface
- **Real-time AI Conversation**: Chat with an AI-powered Elon Musk persona using Dify API
- **Dynamic Expression System**: Visual feedback based on conversation sentiment (1-10 scale)
- **Persistent Chat History**: All conversations are saved locally
- **Loading States**: Visual indicators during API calls

### Center Panel - Dynamic Image Gallery
- **User Avatar Display**: Large profile image with online status indicator
- **Pinterest-style Waterfall Layout**: Responsive masonry grid with varying image heights
- **Interactive Image Modal**: Full-screen image viewer with navigation controls
- **Expression-based Reactions**: Gallery responds to chat sentiment scores

### Right Panel - Twitter-like Interface
- **Complete Twitter UI**: Authentic Elon Musk profile with verified badges
- **Multiple Tab Views**: Posts, Replies, Subs, Highlights, Media
- **Interactive Comments**: Click any tweet to open comment modal
- **AI-powered Tweets**: Chat responses can generate new tweets automatically
- **Persistent Data**: All tweets, comments, and interactions saved locally

## 🏗️ Architecture

### Project Structure
```
src/
├── components/           # React components
│   ├── ChatPanel.jsx    # Left panel - AI chat interface
│   ├── ImagePanel.jsx   # Center panel - image gallery
│   ├── TweetsPanel.jsx  # Right panel - Twitter interface
│   └── TweetCard.jsx    # Individual tweet component
├── data/                # Static data and configurations
│   ├── musk.js         # Elon Musk profile and tweet data
│   └── images.js       # Image gallery data
├── hooks/              # Custom React hooks
│   └── useLocalStorage.js # Persistent storage hook
├── services/           # External API integrations
│   └── difyApi.js      # Dify AI API service
├── assets/             # Static assets
│   ├── avatar.jpg      # Elon Musk avatar
│   └── background.jpg  # Profile background
└── lib/                # Utility functions
    └── format.js       # Number formatting utilities
```

### Technology Stack
- **Frontend Framework**: React 18.3.1 with Vite 5.4.8
- **Styling**: Tailwind CSS 3.4.13
- **State Management**: React Hooks + localStorage persistence
- **AI Integration**: Dify API for conversational AI
- **Testing**: Playwright for E2E testing
- **Build Tool**: Vite with hot module replacement

### Key Components

#### App.jsx - Main Application
- **Resizable Panels**: Drag borders to adjust panel widths (15%-60% range)
- **State Orchestration**: Manages global state for tweets, comments, and chat
- **API Integration**: Handles Dify API calls and response processing
- **Persistent Storage**: Automatic data synchronization with localStorage

#### ChatPanel.jsx - AI Chat Interface
- **Message Management**: Handles user input and AI responses
- **Loading States**: Visual feedback during API processing
- **Auto-scroll**: Automatic scrolling to latest messages
- **Input Validation**: Prevents empty messages and handles API errors

#### TweetsPanel.jsx - Twitter Interface
- **Tab Navigation**: Posts, Replies, Subs, Highlights, Media views
- **Comment System**: Full-featured comment modal with replies
- **Real-time Updates**: Dynamic tweet generation from chat responses
- **Subscription UI**: Authentic Twitter subscription interface

#### ImagePanel.jsx - Gallery Interface
- **Responsive Grid**: Auto-adjusting columns based on screen size
- **Modal Viewer**: Full-screen image viewing with keyboard navigation
- **Expression Integration**: Visual changes based on chat sentiment
- **Pinterest Layout**: Masonry grid with natural image flow

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Dify API access (optional, for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Project4-Hogwarts-Portraits
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure AI Integration (Optional)**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_DIFY_API_KEY=your_dify_api_key_here
   VITE_DIFY_BASE_URL=https://api.dify.ai/v1
   ```
   
   **Note**: Without API configuration, the chat will show configuration prompts, but all other features work normally.

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:8080` or `http://0.0.0.0:8080` (or the URL shown in terminal)
   
   **Network Access**: The server binds to `0.0.0.0:8080`, allowing access from:
   - Local: `http://localhost:8080`
   - Network: `http://[your-ip]:8080` (e.g., `http://192.168.1.100:8080`)

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Testing

```bash
# Run E2E tests
npm run test:e2e
```

## 🔧 Configuration

### Environment Variables
- `VITE_DIFY_API_KEY`: Your Dify API key for AI chat functionality
- `VITE_DIFY_BASE_URL`: Dify API base URL (default: https://api.dify.ai/v1)

### Local Storage Keys
- `musk.tweets`: Tweet data and comments
- `musk.activeTab`: Currently selected tab in Twitter panel
- Chat messages are managed in component state

### API Integration

The application integrates with Dify API for AI-powered conversations. Expected API response format:

```json
{
  "success": true,
  "data": {
    "elon_chat": "AI response for chat",
    "elon_x": "Optional tweet content",
    "elon_score": 7
  }
}
```

## 🎨 Features in Detail

### Resizable Panels
- Drag the borders between panels to adjust widths
- Minimum width: 15% per panel
- Maximum width: 60% per panel
- Smooth animations and visual feedback

### Comment System
- Click any tweet to open comment modal
- Pre-populated with realistic team member comments
- AI responses from Elon Musk persona
- Persistent storage of all interactions

### Expression System
- Chat sentiment affects visual elements
- Score range: 1-10 (1=negative, 10=positive)
- Dynamic avatar expressions and gallery reactions

### Media Gallery
- Responsive masonry layout
- Full-screen modal viewer
- Keyboard navigation (arrow keys, escape)
- Pinterest-style hover effects

## 🐛 Troubleshooting

### Common Issues

1. **API Configuration Errors**
   - Ensure `.env` file is in root directory
   - Check API key validity
   - Verify network connectivity

2. **Local Storage Issues**
   - Clear browser localStorage for fresh start
   - Check browser storage limits
   - Verify localStorage is enabled

3. **Build Issues**
   - Clear `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check Node.js version compatibility
   - Verify all dependencies are installed

4. **Performance Issues**
   - Reduce image gallery size in `src/data/images.js`
   - Clear browser cache
   - Check for memory leaks in browser dev tools

### Reset Application State

To reset all data to initial state:
1. Open browser Developer Tools (F12)
2. Go to Application/Storage tab
3. Clear localStorage entries starting with `musk.`
4. Refresh the page

## 📝 License

This project is part of the Hogwarts Portraits Assignment Template.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Note**: This application is designed for demonstration purposes and simulates interactions with public figures. All AI responses are generated and do not represent actual communications.
