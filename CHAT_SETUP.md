# 🤖 AI 聊天功能配置指南

## 📁 创建 .env 文件

在项目根目录创建 `.env` 文件（已在 .gitignore 中）：

```bash
# Dify API 配置
VITE_DIFY_API_KEY=
VITE_DIFY_BASE_URL=
```

## 🎯 功能说明

### 1. **聊天对话** (左侧面板)
- 与 AI 进行实时对话
- 支持加载状态显示
- 回车发送，Shift+回车换行

### 2. **动态表情** (中间面板)
- 根据 AI 返回的 `elon_score` (1-10) 动态切换表情
- 表情图片位置：`src/assets/elon_expression/`
- 格式：`{score}_{variant}.png` (如：5_1.png, 10_2.png)
- 自动随机选择同分数的不同变体

### 3. **自动发推** (右侧面板)
- 当 AI 返回 `elon_x` 字段且长度 > 8 字符时自动发推
- 推文会出现在 Posts 标签页
- 自动切换到 Posts 标签

## 🔄 API 返回格式

AI 需要返回以下 JSON 格式：

```json
{
  "elon_chat": "Hey. What's on your mind? We've got a lot of stuff to get done...",
  "elon_x": "Just had an amazing conversation about space exploration! 🚀",
  "elon_score": 8
}
```

### 字段说明：
- **elon_chat**: 聊天回复内容（必需）
- **elon_x**: 推特内容（可选，null 或长度 > 8 的字符串）
- **elon_score**: 表情分数（1-10，默认 5）

## 🎨 表情系统

### 可用表情分数对应：
- **0**: 😐 中性
- **1**: 😒 不满  
- **5**: 😊 默认开心
- **10**: 🤩 超级兴奋

### 添加新表情：
1. 将图片放入 `src/assets/elon_expression/`
2. 命名格式：`{score}_{variant}.png`
3. 系统会自动识别和随机选择

## 🚀 使用流程

1. **配置环境**：创建 .env 文件
2. **启动应用**：`npm run dev`
3. **开始聊天**：在左侧输入消息
4. **观察反馈**：
   - 中间头像表情会根据 AI 情绪变化
   - 右侧可能会自动发布新推文
   - 聊天记录保存在左侧

## ⚠️ 注意事项

- 确保 Dify API 服务正常运行
- .env 文件不会被提交到 Git
- 如果 API 调用失败，会显示友好的错误提示
- 表情分数超出 0-10 范围会使用默认值 5

## 🛠️ 故障排除

1. **"请先配置 .env 文件"** → 检查 .env 文件是否存在且格式正确
2. **表情不变化** → 检查 `src/assets/elon_expression/` 目录下是否有对应分数的图片
3. **推文不发布** → 确认 `elon_x` 字段长度 > 8 字符

---

💡 **提示**: 这是一个完全本地化的 AI 聊天系统，所有数据都存储在浏览器本地存储中！
