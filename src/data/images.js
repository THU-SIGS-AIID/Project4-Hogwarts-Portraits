// 头像图片 - 使用项目中的 Elon Musk 头像
import avatarImg from '../assets/avatar.jpg'
export const avatarImage = avatarImg

// 动态导入 fake_pinterest 目录下的所有图片文件
const imageModules = import.meta.glob('../assets/fake_pinterest/*.(jpg|jpeg|png|webp|avif)', { 
  eager: true,
  as: 'url'
})

// 根据文件名生成标题 - 直接使用文件名（去掉扩展名）
const generateTitle = (filename) => {
  return filename.replace(/\.(jpg|jpeg|png|webp|avif)$/, '')
}

// 生成随机高度的函数
const generateRandomHeight = () => {
  const heights = [150, 180, 200, 220, 240, 280, 300, 340, 350, 380, 400, 420, 450, 480, 520]
  return heights[Math.floor(Math.random() * heights.length)]
}

// 动态生成 Pinterest 图片数据
export const pinterestImages = Object.entries(imageModules).map(([path, url], index) => {
  const filename = path.split('/').pop()
  return {
    id: index + 1,
    url: url,
    height: generateRandomHeight(),
    title: generateTitle(filename)
  }
})

// 保持向后兼容
export const galleryImages = pinterestImages.map(img => img.url)

