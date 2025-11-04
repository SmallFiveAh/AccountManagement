import { useState, useEffect } from 'react'
import Addpanel from './Addpanel';
import './index.css'

function AccountRegion() {
  // 当前页码状态
  const [currentPage, setCurrentPage] = useState(0)
  // 存储所有账号的数组，按页组织
  const [pages, setPages] = useState([[]])
  // 动画状态
  const [isAnimating, setIsAnimating] = useState(false)
  // 动画方向
  const [animationDirection, setAnimationDirection] = useState('') 
  
  // 每页最大账号数和最大页数
  const ACCOUNTS_PER_PAGE = 59
  const MAX_PAGES = 50
  
  // 获取当前页的账号列表
  const currentAccounts = pages[currentPage] || []
  
  // 计算总页数
  const totalPages = pages.length

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
          icon: '../../../public/resource/img/icon-48.png'
        }])
        // 更新到新页
        setCurrentPage(newPages.length - 1)
      } else {
        // 在当前页添加账号
        const newAccount = {
          id: Date.now(),
          name: `账号${newPages.flat().length + 1}`,
          icon: '../../../public/resource/img/icon-48.png'
        }
        newPages[currentPage] = [...currentAccounts, newAccount]
      }
      
      return newPages
    })
  }

  // 处理页面切换动画
  const switchPage = (newPage) => {
    if (newPage !== currentPage && newPage >= 0 && newPage < totalPages) {
      setIsAnimating(true)
      // 根据滚动方向设置动画类型
      setAnimationDirection(newPage > currentPage ? 'slide-up' : 'slide-down')
      
      setTimeout(() => {
        setCurrentPage(newPage)
        // 重置动画方向
        setAnimationDirection('')
        
        setTimeout(() => {
          setIsAnimating(false)
        }, 300)
      }, 300)
    }
  }

  // 处理鼠标滚轮事件
  const handleWheel = (e) => {
    e.preventDefault()
    
    if (isAnimating) return
    
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
    }
  }, [currentPage, totalPages, isAnimating])

  return (
    <div 
      className={`header-container ${isAnimating ? `animate-${animationDirection}` : ''}`}
    >
      {currentAccounts.map(account => {
        const label = account.name.length > 5 ? account.name.slice(0, 5) + '...' : account.name
        return (
          <div className="account-container" key={account.id}>
            <div className="icon-container">
              <div className="icon-box">
                <img src={account.icon} title={account.name} alt={account.id} />
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
    </div>
  )
}

export default AccountRegion;