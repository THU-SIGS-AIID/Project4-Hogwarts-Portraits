import { useState, useRef, useEffect, useMemo } from 'react'
import { avatarImage, pinterestImages } from '../data/images'
import { getExpressionByScore, getDefaultExpression } from '../utils/expressionManager'

// 图片弹窗组件
function ImageModal({ image, isOpen, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onPrev, onNext])

  if (!isOpen || !image) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      {/* 背景遮罩 */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* 关闭按钮 */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200"
        aria-label="Close"
      >
        <i className="fas fa-times text-lg"></i>
      </button>

      {/* 上/下一张 */}
      <button 
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200"
        aria-label="Previous"
      >
        <i className="fas fa-chevron-left text-lg"></i>
      </button>
      <button 
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200"
        aria-label="Next"
      >
        <i className="fas fa-chevron-right text-lg"></i>
      </button>

      {/* 只显示图片本身 */}
      <div className="relative max-w-[95vw] max-h-[90vh] m-4">
        <img 
          src={image.url}
          alt={image.title}
          className="max-w-full max-h-[90vh] object-contain select-none"
          draggable={false}
        />
      </div>
    </div>
  )
}

// Pinterest风格的瀑布流布局组件
function PinterestGrid({ images, onImageClick }) {
  const [columns, setColumns] = useState(3)
  const containerRef = useRef(null)
  const GAP = 12 // px, gap-3

  // 预加载图片尺寸，用于自适应选择 1:1 或 3:4（竖图）
  const [sizes, setSizes] = useState({}) // {id: {w,h}}
  useEffect(() => {
    let mounted = true
    const loaders = images.map(img => new Promise(resolve => {
      const im = new Image()
      im.onload = () => resolve({ id: img.id, w: im.naturalWidth, h: im.naturalHeight })
      im.onerror = () => resolve({ id: img.id, w: 1, h: 1 })
      im.src = img.url
    }))
    Promise.all(loaders).then(list => {
      if (!mounted) return
      const map = {}
      list.forEach(it => { map[it.id] = { w: it.w, h: it.h } })
      setSizes(map)
    })
    return () => { mounted = false }
  }, [images])

  // 响应式列数调整
  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return
      const width = containerRef.current.offsetWidth
      if (width < 400) setColumns(2)
      else if (width < 600) setColumns(3)
      else if (width < 800) setColumns(4)
      else setColumns(5)
    }
    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  // 计算列宽
  const colWidth = useMemo(() => {
    if (!containerRef.current) return 0
    const totalGap = GAP * (columns - 1)
    return Math.max(0, (containerRef.current.offsetWidth - totalGap) / columns)
  }, [columns])

  // 目标比例：方形 1:1；竖图 3:4（高度更大）。根据源图尺寸选择。
  const chooseRatio = (img) => {
    const s = sizes[img.id]
    if (!s) return '1:1'
    const ratio = s.h / s.w
    return ratio >= 1.1 ? '3:4' : '1:1' // 高图用竖图，其余方形
  }

  // 为布局计算每张图的“估算高度”
  const estimatedHeight = (ratio) => {
    if (ratio === '3:4') return colWidth * (4 / 3)
    return colWidth // 1:1
  }

  // 将图片分配到不同的列中（基于估算高度做瀑布流）
  const imageColumns = useMemo(() => {
    const cols = Array.from({ length: columns }, () => [])
    const colHeights = Array(columns).fill(0)
    images.forEach(img => {
      const ratio = chooseRatio(img)
      const h = estimatedHeight(ratio)
      const idx = colHeights.indexOf(Math.min(...colHeights))
      cols[idx].push({ ...img, __ratio: ratio })
      colHeights[idx] += h + GAP
    })
    return cols
  }, [images, columns, sizes, colWidth])

  return (
    <div ref={containerRef} className="flex gap-3 h-full">
      {imageColumns.map((column, colIndex) => (
        <div key={colIndex} className="flex-1 flex flex-col gap-3">
          {column.map((image) => {
            const isSquare = image.__ratio !== '3:4'
            const aspect = isSquare ? '1 / 1' : '3 / 4'
            return (
              <div
                key={image.id}
                onClick={() => onImageClick && onImageClick(image)}
                className="relative group bg-gray-800 rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/50"
                style={{ aspectRatio: aspect }}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm font-medium mb-1">{image.title}</p>
                    <div className="flex items-center gap-2 text-white/80 text-xs">
                      <i className="fas fa-heart"></i>
                      <span>{Math.floor(Math.random() * 100) + 10}</span>
                      <i className="fas fa-bookmark ml-2"></i>
                    </div>
                  </div>
                </div>
                {/* 保存按钮 */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Save
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

// 主要的头像 + 瀑布流面板
export default function ImagePanel({ expressionScore = 5 }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentExpression, setCurrentExpression] = useState(getDefaultExpression())

  // 监听表情分数变化
  useEffect(() => {
    const newExpression = getExpressionByScore(expressionScore)
    setCurrentExpression(newExpression)
  }, [expressionScore])

  const handleImageClick = (image) => {
    setSelectedImage(image)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedImage(null)
  }

  const showPrevImage = () => {
    if (!selectedImage) return
    const currentIndex = pinterestImages.findIndex(img => img.id === selectedImage.id)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : pinterestImages.length - 1
    setSelectedImage(pinterestImages[prevIndex])
  }

  const showNextImage = () => {
    if (!selectedImage) return
    const currentIndex = pinterestImages.findIndex(img => img.id === selectedImage.id)
    const nextIndex = currentIndex < pinterestImages.length - 1 ? currentIndex + 1 : 0
    setSelectedImage(pinterestImages[nextIndex])
  }

  return (
    <div className="w-full h-screen bg-gray-900 text-white flex flex-col min-w-0">
      {/* 头像区域 */}
      <div className="flex-shrink-0 p-8 flex items-center justify-center border-b border-gray-700 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="relative">
          {/* 头像主体 - 动态表情 */}
          <div className="w-48 h-48 rounded-2xl overflow-hidden bg-gray-800 border-4 border-gray-600 shadow-2xl ring-4 ring-gray-700/50">
            <img
              src={currentExpression}
              alt="Elon Musk Expression"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* 表情分数指示器 */}
          <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-500 rounded-full border-4 border-gray-900 shadow-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">{expressionScore}</span>
          </div>
          
          {/* 在线状态指示器 */}
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 shadow-lg">
            <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
          </div>
          
          {/* 用户信息 */}
          <div className="mt-4 text-center">
            <h3 className="text-xl font-bold text-white mb-1">Elon Musk</h3>
            <p className="text-gray-400 text-sm">CEO of Tesla, SpaceX</p>
            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <i className="fas fa-camera"></i>
                86.4K photos
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <i className="fas fa-heart"></i>
                226.7M likes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 瀑布流区域 */}
      <div className="flex-1 p-4 overflow-y-auto min-h-0">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Gallery</h2>
          <p className="text-gray-400 text-sm">Discover beautiful images</p>
        </div>
        
        <PinterestGrid images={pinterestImages} onImageClick={handleImageClick} />
      </div>

      {/* 图片弹窗 */}
      <ImageModal 
        image={selectedImage}
        isOpen={modalOpen}
        onClose={closeModal}
        onPrev={showPrevImage}
        onNext={showNextImage}
      />
    </div>
  )
}
