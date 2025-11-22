import { useState, useEffect, useRef } from 'react'
import Addaccount from './Addpanel/Addaccount';
import Addpanel from './Addpanel';
import ContextMenu from './ContextMenu';
import { syncToGist } from '../../GistAPI';
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
  // 上下文菜单状态
  const [showContextMenu, setShowContextMenu] = useState(false)
  // 上下文菜单位置状态
  const [contextMenuPosition, setContextMenuPosition] = useState({ left: 0, top: 0 })
  // 当前选中的账号
  const [selectedAccount, setSelectedAccount] = useState(null)
  // 显示添加账号面板状态
  const [showAddAccount, setShowAddAccount] = useState(false);
  // 编辑中的账号数据
  const [editAccount, setEditAccount] = useState(null);
  // 防抖定时器引用
  const syncDebounceRef = useRef(null);

  // 初始化时从本地存储加载账号数据
  useEffect(() => {
    const savedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    if (savedAccounts.length > 0) {
      // 将账号数据转换为页面结构
      const loadedPages = [];
      for (let i = 0; i < savedAccounts.length; i += 59) {
        const pageAccounts = savedAccounts.slice(i, i + 59).map(account => ({
          id: account.id,
          name: account.name,
          description: account.description,
          username: account.username,
          password: account.password,
          icon: account.icon,
          iconConfig: account.iconConfig || {
            source: '在线图标',
            color: '#339aff',
            text: ''
          },
          url: account.url || `https://example.com/account/${account.id}`,
          // 添加这一行以确保 usageCount 被正确加载
          usageCount: account.usageCount || 0
        }));
        loadedPages.push(pageAccounts);
      }
      setPages(loadedPages);
    }
  }, []);

  // 防抖同步函数
  const debounceSyncToGist = (accounts) => {
    // 检查是否存在accountTokenInfo，如果不存在则不执行同步
    const accountTokenInfo = localStorage.getItem('accountTokenInfo');
    if (!accountTokenInfo) {
      return; // 没有token信息，不执行同步
    }
    
    // 检查accounts是否存在且不为空
    if (!accounts || accounts.length === 0) {
      return; // 没有账户数据，不执行同步
    }
    
    // 清除之前的定时器
    if (syncDebounceRef.current) {
      clearTimeout(syncDebounceRef.current);
    }
    
    // 设置新的定时器，延迟500ms执行同步
    syncDebounceRef.current = setTimeout(() => {
      syncToGist(accounts).catch(error => {
        console.error('同步到 Gist 失败:', error);
      });
    }, 500);
  };

  // 处理关闭Addaccount组件
  const handleCloseAddAccount = () => {
      setShowAddAccount(false);
      setEditAccount(null); // 关闭时清除编辑状态
  };

  // 处理保存账号
  const handleSaveAccount = (accountData, isEdit = false) => {
    // 检查是否达到最大页数限制
    if (pages.length >= 50 && pages[pages.length - 1].length >= 59 && !isEdit) {
      return; // 达到最大限制，无法添加更多账号
    }
    
    setPages(prevPages => {
      const newPages = [...prevPages];
      const currentPageIndex = newPages.length - 1;
      const currentPage = newPages[currentPageIndex] || [];
      
      if (isEdit) {
        // 编辑模式：更新现有账号
        const allAccounts = newPages.flat();
        const updatedAccounts = allAccounts.map(account => 
          account.id === accountData.id ? accountData : account
        );
        
        // 重新组织为页面结构
        const updatedPages = [];
        for (let i = 0; i < updatedAccounts.length; i += 59) {
          updatedPages.push(updatedAccounts.slice(i, i + 59));
        }
        
        localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
        // 使用防抖同步
        debounceSyncToGist(updatedAccounts);
        return updatedPages;
      } else {
        // 添加模式：添加新账号
        // 如果当前页已满，则创建新页
        if (currentPage.length >= 59) {
          // 检查是否还能添加新页
          if (newPages.length >= 50) {
            return prevPages; // 已达最大页数限制
          }
          // 添加新的一页
          newPages.push([{
            id: accountData.id, // 使用传入的id
            username: accountData.username,
            password: accountData.password,
            description: accountData.description,
            name: accountData.name,
            icon: accountData.icon,
            iconConfig: accountData.iconConfig,
            url: accountData.url || `https://example.com/account/${accountData.id}`
          }]);
          // 切换到新页面
          setCurrentPage(newPages.length - 1);
        } else {
          // 在当前页添加账号
          const newAccount = {
            id: accountData.id,
            username: accountData.username,
            password: accountData.password,
            description: accountData.description,
            name: accountData.name,
            icon: accountData.icon,
            iconConfig: accountData.iconConfig,
            url: accountData.url || `https://example.com/account/${accountData.id}`
          };
          newPages[currentPageIndex] = [...currentPage, newAccount];
        }
        // 保存到本地存储
        const allAccounts = newPages.flat();
        localStorage.setItem('accounts', JSON.stringify(allAccounts));
        // 使用防抖同步
        debounceSyncToGist(allAccounts);
        return newPages;
      }
    });
    
    setShowAddAccount(false);
    setEditAccount(null); // 保存后清除编辑状态
  };

  // 每页最大账号数和最大页数
  const ACCOUNTS_PER_PAGE = 59
  const MAX_PAGES = 50
  
  // 获取当前页的账号列表
  // 修复：确保即使pages[currentPage]不存在也返回空数组
  const currentAccounts = (pages && pages[currentPage]) ? pages[currentPage] : []
  
  // 计算总页数
  const totalPages = pages.length

  // 处理账号点击事件，在新标签页中打开URL
  const handleAccountClick = (account) => {
    // 增加使用次数
    const updatedAccount = {
      ...account,
      usageCount: (account.usageCount || 0) + 1
    };
    // 更新本地存储中的账号数据
    const savedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    const accountIndex = savedAccounts.findIndex(acc => acc.id === account.id);
    if (accountIndex !== -1) {
      savedAccounts[accountIndex] = updatedAccount;
      localStorage.setItem('accounts', JSON.stringify(savedAccounts));
      
      // 使用防抖同步
      debounceSyncToGist(savedAccounts);
      
      // 更新当前页面状态以反映最新的使用次数
      setPages(prevPages => {
        const newPages = [...prevPages];
        const currentPageIndex = currentPage;
        const updatedAccountsInPage = newPages[currentPageIndex].map(acc => 
          acc.id === account.id ? updatedAccount : acc
        );
        newPages[currentPageIndex] = updatedAccountsInPage;
        return newPages;
      });
    }
    
    // 如果账号有URL属性，则在新标签页中打开
    if (account.url) {
      window.open(account.url, '_blank')
    }
  }

  // 处理右键菜单显示
  const handleContextMenu = (e, account) => {
    e.preventDefault()
    // 获取鼠标右键点击的绝对坐标（相对于视口）
    const { pageX, pageY } = e
    // 显示上下文菜单
    setShowContextMenu(true)
    // 设置上下文菜单的位置
    setContextMenuPosition({ left: pageX, top: pageY })
    // 设置当前选中的账号
    setSelectedAccount(account)
  }

  // 关闭上下文菜单
  const handleCloseContextMenu = () => {
    setShowContextMenu(false)
    setSelectedAccount(null)
  }
  
  // 删除账号
  const handleDeleteAccount = (accountToDelete) => {
    // 检查 accountToDelete 是否存在
    if (!accountToDelete || !accountToDelete.id) {
      console.error('Invalid account to delete:', accountToDelete);
      return;
    }
    
    // 直接从localStorage中删除账号
    const savedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    const updatedAccounts = savedAccounts.filter(account => account.id !== accountToDelete.id);
    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
    
    // 使用防抖同步
    debounceSyncToGist(updatedAccounts);
    
    // 重新加载页面数据
    if (updatedAccounts.length > 0) {
      // 将账号数据转换为页面结构
      const loadedPages = [];
      for (let i = 0; i < updatedAccounts.length; i += 59) {
        const pageAccounts = updatedAccounts.slice(i, i + 59).map(account => ({
          id: account.id,
          name: account.name,
          icon: account.icon,
          description: account.description,
          username: account.username,
          password: account.password,
          iconConfig: account.iconConfig || {
            source: '在线图标',
            color: '#339aff',
            text: ''
          },
          url: account.url || `https://example.com/account/${account.id}`,
          // 添加这一行以确保 usageCount 被正确加载
          usageCount: account.usageCount || 0
        }));
        loadedPages.push(pageAccounts);
      }
      setPages(loadedPages);
      
      // 如果当前页变空且不是第一页，调整当前页索引
      if (loadedPages.length > 0 && (loadedPages[currentPage] === undefined || loadedPages[currentPage].length === 0)) {
        const newCurrentPage = Math.min(currentPage, loadedPages.length - 1);
        setCurrentPage(newCurrentPage);
      }
    } else {
      // 如果没有账号了，重置为初始状态
      setPages([[]]);
      setCurrentPage(0);
    }
    
    // 关闭上下文菜单
    handleCloseContextMenu();
  };
  
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
          description: '',
          username: '',
          password: '',
          iconConfig: {
            source: '在线图标',
            color: '#339aff',
            text: ''
          },
          url: `https://example.com/account/${Date.now()}`, // 添加默认URL
          // 添加这一行以初始化 usageCount
          usageCount: 0 // 初始化使用次数为0
        }])
        // 更新到新页
        setCurrentPage(newPages.length - 1)
      } else {
        // 在当前页添加账号
        const newAccount = {
          id: Date.now(),
          name: `账号${newPages.flat().length + 1}`,
          icon: '../resource/img/icon-48.png',
          description: '',
          username: '',
          password: '',
          iconConfig: {
            source: '在线图标',
            color: '#339aff',
            text: ''
          },
          url: `https://example.com/account/${Date.now()}`, // 添加默认URL
          // 添加这一行以初始化 usageCount
          usageCount: 0 // 初始化使用次数为0
        }
        newPages[currentPage] = [...currentAccounts, newAccount]
      }
      // 保存到本地存储
      const allAccounts = newPages.flat();
      localStorage.setItem('accounts', JSON.stringify(allAccounts));
      return newPages
    })
  }

  const handleAddAccountClick = () => {
    setShowAddAccount(true);
  };

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
    
    // 点击其他区域关闭上下文菜单
    const handleClickOutside = () => {
      if (showContextMenu) {
        setShowContextMenu(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    
    // 清理监听器
    return () => {
      window.removeEventListener('wheel', handleWheel)
      document.removeEventListener('click', handleClickOutside)
      // 清理节流定时器
      if (throttleTimerRef.current) {
        clearTimeout(throttleTimerRef.current)
        throttleTimerRef.current = null
      }
      // 清理同步防抖定时器
      if (syncDebounceRef.current) {
        clearTimeout(syncDebounceRef.current);
        syncDebounceRef.current = null;
      }
    }
  }, [currentPage, totalPages, isTransitioning, showContextMenu])
  
  // 重置方向状态，避免动画重复触发
  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection('')
    }, 500) // 与动画持续时间匹配
    
    return () => clearTimeout(timer)
  }, [currentPage])

  // 处理编辑账号
  const handleEditAccount = (e) => {
    if (e.target.name === 'edit-account') {
      setEditAccount(e.target.value);
      setShowAddAccount(true);
    }
  };

  return (
    <>
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
                    onContextMenu={(e) => handleContextMenu(e, account)}
                    style={{ cursor: 'pointer' }}
                  />
                  <span>{label}</span>
                </div>
              </div>
            </div>
          )
        })}
        <div className="add-account-container">
          <div className="add-btn">
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
          <Addpanel onAddAccount={handleAddAccountClick} />
        </div>
      </div>
      <ContextMenu 
        show={showContextMenu} 
        position={contextMenuPosition} 
        onClose={handleCloseContextMenu}
        selectedAccount={selectedAccount}
        onDeleteAccount={handleDeleteAccount}
        onEditAccount={handleEditAccount}
      />
      <Addaccount 
        isOpen={showAddAccount}
        onClose={handleCloseAddAccount}
        onSave={handleSaveAccount}
        editAccount={editAccount}
      />
    </>
  )
}

export default AccountRegion;