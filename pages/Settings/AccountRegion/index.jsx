import { useState, useEffect, useRef } from 'react'
import Addpanel from './Addpanel';
import ContextMenu from './ContextMenu';
import './index.css'

function AccountRegion() {
  // 当前页码状态
  const [currentPage, setCurrentPage] = useState(0)
  // 存储所有账号的数组，按页组织
  const [pages, setPages] = useState([[]])
  // 页面切换方向：'forward'（向下翻页）或 'backward'（向上翻页）或 'initial'（初始页）
  const [direction, setDirection] = useState('initial')
  // 用于跟踪是否正在翻页动画中
  const [isTransitioning, setIsTransitioning] = useState(false)
  // 节流定时器引用
  const throttleTimerRef = useRef(null)
  
  // 每页最大账号数和最大页数
  const ACCOUNTS_PER_PAGE = 59
  const MAX_PAGES = 50
  
  // 获取当前页的账号列表
  const currentAccounts = pages[currentPage] || []
  
  // 计算总页数
  const totalPages = pages.length

  // 处理账号点击事件，在新标签页中打开URL
  const handleAccountClick = (account) => {
    // 如果账号有URL属性，则在新标签页中打开
    if (account.url) {
      window.open(account.url, '_blank')
    }
  }
  
  
  const handleAddAccount = () => {
    // 检查是否达到最大页数限制
    if (totalPages >= MAX_PAGES && currentAccounts.length >= ACCOUNTS_PER_PAGE) {
      return // 达到最大限制，无法添加更多账号
    }
    
    setPages(prevPages => {
      const newPages = [...prevPages]
      
      // 如果当前页已满，则创建新页
      if (currentAccounts.length >= ACCOUNTS_PER_PAGE) {
        // 检查是否还能添加新页
        if (totalPages >= MAX_PAGES) {
          return prevPages // 已达最大页数限制
        }
        // 添加新的一页
        newPages.push([{
          id: Date.now(), // 使用时间戳作为唯一ID
          name: `账号${newPages.flat().length + 1}`,
          icon: '../resource/img/icon-48.png',
          url: `https://example.com/account/${Date.now()}` // 添加默认URL
        }])
        // 更新到新页
        setCurrentPage(newPages.length - 1)
      } else {
        // 在当前页添加账号
        const newAccount = {
          id: Date.now(),
          name: `账号${newPages.flat().length + 1}`,
          icon: '../resource/img/icon-48.png',
          url: `https://example.com/account/${Date.now()}` // 添加默认URL
        }
        newPages[currentPage] = [...currentAccounts, newAccount]
      }
      
      return newPages
    })
  }

  // 处理页面切换
  const switchPage = (newPage) => {
    // 如果正在切换中，则忽略新的切换请求
    if (isTransitioning) return
    
    if (newPage !== currentPage && newPage >= 0 && newPage < totalPages) {
      // 设置正在切换状态
      setIsTransitioning(true)
      // 设置页面切换方向
      if (newPage > currentPage) {
        setDirection('forward') // 向下翻页
      } else {
        setDirection('backward') // 向上翻页
      }
      setCurrentPage(newPage)
      
      // 动画完成后重置切换状态
      setTimeout(() => {
        setIsTransitioning(false)
      }, 300) // 与动画持续时间匹配
    }
  }

  // 处理鼠标滚轮事件
  const handleWheel = (e) => {
    e.preventDefault()
    
    // 节流处理，避免快速滚动导致连续翻页
    if (throttleTimerRef.current) {
      return
    }
    
    // 如果正在切换中，则忽略滚轮事件
    if (isTransitioning) return
    
    // 设置节流定时器
    throttleTimerRef.current = setTimeout(() => {
      throttleTimerRef.current = null
    }, 300) // 节流时间与动画时间匹配
    
    if (e.deltaY > 0 && currentPage < totalPages - 1) {
      // 向下滚动，切换到下一页
      switchPage(currentPage + 1)
    } else if (e.deltaY < 0 && currentPage > 0) {
      // 向上滚动，切换到上一页
      switchPage(currentPage - 1)
    }
  }

  // 在组件挂载时添加全局滚轮监听器
  useEffect(() => {
    // 添加全局监听器，监听整个文档的滚轮事件
    window.addEventListener('wheel', handleWheel, { passive: false })
    
    // 清理监听器
    return () => {
      window.removeEventListener('wheel', handleWheel)
      // 清理节流定时器
      if (throttleTimerRef.current) {
        clearTimeout(throttleTimerRef.current)
        throttleTimerRef.current = null
      }
    }
  }, [currentPage, totalPages, isTransitioning])
  
  // 重置方向状态，避免动画重复触发
  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection('')
    }, 500) // 与动画持续时间匹配
    
    return () => clearTimeout(timer)
  }, [currentPage])

  return (
    <div 
      className="header-container"
      data-page={currentPage}
      data-direction={direction}
    >
      {currentAccounts.map(account => {
        const label = account.name.length > 5 ? account.name.slice(0, 5) + '...' : account.name
        return (
          <div className="account-container" key={account.id}>
            <div className="icon-container">
              <div className="icon-box">
                <img 
                  src={account.icon} 
                  title={account.name} 
                  alt={account.id} 
                  onClick={() => handleAccountClick(account)}
                  style={{ cursor: 'pointer' }}
                />
                <span>{label}</span>
              </div>
            </div>
          </div>
        )
      })}
      <div className="add-account-container">
        <div className="add-btn" onClick={handleAddAccount}>
          <div className="add-icon-btn">
            <svg
              width={32}
              height={32}
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "white", opacity: "0.5" }}
            >
              {/* 水平线 */}
              <line
                x1={3}
                y1={8}
                x2={13}
                y2={8}
                stroke="currentColor"
                strokeWidth={1}
              />
              {/* 垂直线 */}
              <line
                x1={8}
                y1={3}
                x2={8}
                y2={13}
                stroke="currentColor"
                strokeWidth={1}
              />
            </svg>
          </div>
        </div>
        <Addpanel />
      </div>
      <ContextMenu />
    </div>
  )
}

export default AccountRegion;