import { useState, useEffect } from 'react';
import Customizeicons from './Customizeicons';
import './index.css';

function Addaccount({ isOpen, onClose, onSave, editAccount }) {
  const [accountData, setAccountData] = useState({
    name: '',
    username: '',
    password: '',
    url: '',
    icon: '../resource/img/icon-48.png',
    iconConfig: {
      source: '在线图标',
      color: '#339aff',
      text: ''
    },
    description: ''  // 确保description字段初始化
  });

  // 添加编辑模式的状态
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAccountId, setEditingAccountId] = useState(null);
  // 添加密码可见性状态
  const [showPassword, setShowPassword] = useState(false);
  // 添加图标检索结果状态
  const [retrievedIcons, setRetrievedIcons] = useState([]);
  // 当editAccount改变时，初始化编辑模式
  useEffect(() => {
    if (editAccount) {
      setAccountData({
        ...editAccount,
        // 确保iconConfig存在
        iconConfig: editAccount.iconConfig || {
          source: '在线图标',
          color: '#339aff',
          text: ''
        },
        // 确保description字段存在
        description: editAccount.description || ''
      });
      setIsEditMode(true);
      setEditingAccountId(editAccount.id);
    } else {
      // 重置为添加模式
      setAccountData({
        name: '',
        username: '',
        password: '',
        url: '',
        icon: '../resource/img/icon-48.png',
        iconConfig: {
          source: '在线图标', // 确保默认值一致
          color: '#339aff',
          text: ''
        },
        description: ''  // 确保description字段初始化
      });
      setIsEditMode(false);
      setRetrievedIcons([]);
      setEditingAccountId(null);
    }
  }, [editAccount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData(prev => ({
      ...prev,
      [name]: value
    }));

    // 如果是URL字段变化，则尝试获取图标
    if (name === 'url' && value.trim() !== '') {
      // 延迟执行图标检索，避免频繁请求
      clearTimeout(window.iconRetrievalTimeout);
      window.iconRetrievalTimeout = setTimeout(async () => {
        try {
          const icons = await Iconretrieval(value);
          console.log(icons);
          
          setRetrievedIcons(icons);
        } catch (error) {
          console.error('图标检索失败:', error);
        }
      }, 500);
    }
  };

  // 处理图标更改
  const handleIconChange = (iconData) => {
    setAccountData(prev => ({
      ...prev,
      icon: iconData.icon,
      iconConfig: iconData.iconConfig
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (accountData.name.trim()) {
      if (isEditMode && editingAccountId) {
        // 编辑模式：更新现有账户
        const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
        const updatedAccounts = accounts.map(account => 
          account.id === editingAccountId 
            ? { ...accountData, id: editingAccountId } // 保留原ID
            : account
        );
        localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
        onSave(accountData, true); // 第二个参数表示是编辑操作
      } else {
        // 添加模式：添加新账户
        const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
        const newAccount = {
          ...accountData,
          id: Date.now(), // 添加唯一标识符
          createdAt: new Date().toISOString()
        };
        accounts.push(newAccount);
        localStorage.setItem('accounts', JSON.stringify(accounts));
        onSave(newAccount, false); // 第二个参数表示是添加操作
      }
      
      // 重置表单
      setAccountData({
        name: '',
        username: '',
        password: '',
        url: '',
        icon: '../resource/img/icon-48.png',
        iconConfig: {
          source: '在线图标',
          color: '#339aff',
          text: ''
        },
        description: ''
      });
      setIsEditMode(false);
      setRetrievedIcons([]);
      setEditingAccountId(null);
    }
  };

  const handleClose = () => {
    setAccountData({
      name: '',
      username: '',
      password: '',
      url: '',
      icon: '../resource/img/icon-48.png',
      iconConfig: {
        source: '在线图标',
        color: '#339aff',
        text: ''
      },
      description: ''
    });
    setIsEditMode(false);
    setEditingAccountId(null);
    setRetrievedIcons([]);
    onClose();
  };

  const Iconretrieval = async (url) => {
    // 图标检索逻辑
    const icons = [];
    
    // 检查图片是否存在的辅助函数
    const checkImageExists = (imageUrl) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = imageUrl;
      });
    };
    
    try {
      // 验证URL格式
      new URL(url);
    } catch (error) {
      console.warn('无效的URL格式:', url);
      return icons;
    }
    
    // 尝试获取标准favicon.ico
    try {
      const faviconUrl = new URL('/favicon.ico', url).href;
      if (await checkImageExists(faviconUrl)) {
        icons.push({
          url: faviconUrl,
          type: 'ico',
          rel: 'icon',
          sizes: '16x16',
          source: 'standard'
        });
      }
    } catch (error) {
      console.warn('获取标准favicon.ico时出错:', error);
    }
    
    // 尝试获取png格式图标
    try {
      const pngIconUrl = new URL('/favicon.png', url).href;
      if (await checkImageExists(pngIconUrl)) {
        icons.push({
          url: pngIconUrl,
          type: 'png',
          rel: 'icon',
          sizes: '32x32',
          source: 'standard'
        });
      }
    } catch (error) {
      console.warn('获取PNG图标时出错:', error);
    }
    
    // 尝试通过页面head标签获取图标
    try {
      const response = await fetch(url);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // 查找所有link标签中的图标
      const iconLinks = doc.querySelectorAll('link[rel*="icon"]');
      for (let i = 0; i < iconLinks.length; i++) {
        const link = iconLinks[i];
        let iconHref = link.getAttribute('href');
        
        // 处理相对路径
        if (iconHref) {
          try {
            const fullUrl = new URL(iconHref, url).href;
            if (await checkImageExists(fullUrl)) {
              icons.push({
                url: fullUrl,
                type: link.getAttribute('type') || 'image/x-icon',
                rel: link.getAttribute('rel'),
                sizes: link.getAttribute('sizes') || 'any',
                source: 'page'
              });
            }
          } catch (e) {
            console.warn('处理图标链接时出错:', iconHref, e);
          }
        }
      }
    } catch (error) {
      console.warn('通过页面head获取图标时出错:', error);
    }
    
    return icons;
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
        <div className="Add-Account-Panel" onClick={(e) => e.stopPropagation()}>
            <div className="complete-btn" title="关闭" onClick={handleClose}>&times;</div>
            <h2 className="panel-title">{isEditMode ? '编辑账号' : '添加账号'}</h2>
            <form onSubmit={handleSubmit}>
                <Customizeicons 
                  onIconChange={handleIconChange} 
                  initialText={accountData.iconConfig.text}
                  retrievedIcons={retrievedIcons} // 将检索到的图标数据传递给组件
                />
                {/* 只有当图标来源不是"在线图标"时才显示文本输入框 */}
                {accountData.iconConfig.source !== '在线图标' && (
                    <div className="form-group">
                        <div className="input-with-icon">
                            <i className="icon-iconpath">🔤</i>
                            <input 
                                type="text" 
                                value={accountData.iconConfig.text}
                                onChange={(e) => {
                                    const updatedIconConfig = { ...accountData.iconConfig, text: e.target.value };
                                    setAccountData(prev => ({
                                        ...prev,
                                        iconConfig: updatedIconConfig
                                    }));
                                }}
                                placeholder="显示图标文字，可选（建议1~2个字汉字）"
                                className="input-field"
                            />
                        </div>
                    </div>
                )}
                <div className="form-group">
                    <div className="input-with-icon">
                        <i className="icon-name">🌐</i>
                        <input
                            type="text"
                            name="name"
                            value={accountData.name}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="请输入网址名称"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className="input-with-icon">
                        <i className="icon-username">👤</i>
                        <input
                            type="text"
                            name="username"
                            value={accountData.username}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="请输入用户名"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className="input-with-icon">
                        <i className="icon-password">🔒</i>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={accountData.password}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="请输入密码"
                        />
                        <div 
                            className={`password-toggle ${showPassword ? 'visible' : ''}`}
                            onClick={() => setShowPassword(!showPassword)}
                            title={showPassword ? "隐藏密码" : "显示密码"}
                        >
                            {showPassword ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="input-with-icon">
                        <i className="icon-url">🔗</i>
                        <input
                            type="text"
                            name="url"
                            value={accountData.url}
                            onChange={handleChange}
                            placeholder="https://github.com/SmallFiveAh/AccountManagement"
                            className="input-field"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className="textarea-container">
                        <textarea
                            name="description"
                            value={accountData.description}
                            onChange={handleChange}
                            placeholder="请输入该账号使用的说明..."
                            className="input-field textarea-field"
                        />
                        <div className="char-count">
                            {accountData.description.length} 字
                        </div>
                    </div>
                </div>
                
                <div className="form-actions">
                    <button 
                        type="button" 
                        onClick={handleClose}
                        className="btn btn-secondary"
                    >
                        取消
                    </button>
                    <button 
                        type="submit"
                        className="btn btn-primary"
                    >
                        {isEditMode ? '更新' : '保存'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default Addaccount;