# 三栏 React 应用（Chat / Image / Elon Musk Tweets）

使用 React + Vite + Tailwind 重构的三栏界面：
- 左栏：聊天（发送一条消息，右栏会新增一条“马斯克”推文）。
- 中栏：图片居中显示（保持原布局）。
- 右栏：推特式流，支持标签切换（Posts/Replies/Highlights/Media），推文可点赞（不可评论、转发）。

## 结构
- 入口：index.html（Vite 必需的最小入口）
- 应用：src/App.jsx
- 组件：
  - src/components/ChatPanel.jsx
  - src/components/ImagePanel.jsx
  - src/components/TweetsPanel.jsx
  - src/components/TweetCard.jsx

## 开发运行
1. 安装依赖：`npm install`
2. 启动开发服务器：`npm run dev`
3. 打开控制台输出的本地地址（通常是 http://localhost:5173）

## 构建
`npm run build` 后使用 `npm run preview` 进行本地预览。

## 已完成的增强（1,2,3,4）
- 本地持久化：推文与点赞状态保存在 `localStorage`（键：`musk.tweets`、`musk.activeTab`）。
- 数据拆分：`src/data/musk.js`（Musk 资料与初始推文），`src/data/images.js`（中栏图集）。
- 图片查看：中栏支持上一张/下一张、缩放（滚轮或按钮）、拖拽平移、重置。
- E2E 测试（Playwright）：`tests/e2e.spec.ts` 验证“发消息→生成推文→点赞”和图片浏览功能。

运行 E2E（可选，需要网络安装依赖）
1) 安装 Playwright：`npm install`（首次会一并安装 @playwright/test）
2) 运行：`npm run test:e2e`

故障排查
- 想恢复初始推文：清空浏览器 `localStorage` 中的 `musk.*` 键后刷新。
- 图标不显示：确保可以访问 Font Awesome CDN（在 `src/main.jsx` 动态注入）。
# Project4-Hogwarts-Portraits
Hogwarts Portraits Assignment Template
