import { useState, useEffect, useRef } from 'react';
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
    description: ''
  });

  // 添加编辑模式的状态
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAccountId, setEditingAccountId] = useState(null);
  // 添加密码可见性状态
  const [showPassword, setShowPassword] = useState(false);
  // 添加图标检索结果状态
  const [retrievedIcons, setRetrievedIcons] = useState([]);
  
  // 添加图标定制相关状态
  const [iconData, setIconData] = useState({
    source: '在线图标',
    color: '#339aff',
    text: ''
  });
  const [selectedOnlineIcon, setSelectedOnlineIcon] = useState(null);
  const [localIcon, setLocalIcon] = useState(null);
  const fileInputRef = useRef(null);
  // 添加对图标容器的引用
  const onlineIconsContainerRef = useRef(null);
  
  // 定义颜色选项数组
  const colorOptions = [
    '#339aff', '#3ac47d', '#00bfa5', 
    '#9bdb07ff', '#6c6cff', '#ec407a', 
    '#ff5f57', '#a19494ff', '#8b6868ff',
    '#4e0606ff', '#808080', '#a01b8eff',
    '#000', '#096e96ff', '#d400ffff',
    '#5c0d9cff', '#00ff4cff', '#554a92ff',
    '#295242ff', '#ff2effff', '#6269ccff',
    '#4da512ff', '#02596eff', '#3a066bff',
    '#c49c2fff', '#69cf0aff', '#20dff8ff'
  ];

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
      
      // 初始化图标配置状态
      if (editAccount.iconConfig) {
        setIconData(editAccount.iconConfig);
        if (editAccount.iconConfig.source === '在线图标') {
          setSelectedOnlineIcon(editAccount.icon);
        } else if (editAccount.iconConfig.source === '本地上传') {
          setLocalIcon(editAccount.icon);
        }
      }
    } else {
      // 重置为添加模式
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
      
      // 重置图标相关状态
      setIconData({
        source: '在线图标',
        color: '#339aff',
        text: ''
      });
      setSelectedOnlineIcon(null);
      setLocalIcon(null);
    }
  }, [editAccount]);

  // 创建一个useEffect来处理图标数据生成
  useEffect(() => {
    generateIconData(iconData);
  }, [iconData]);

  // 添加useEffect来添加滚轮事件监听器
  useEffect(() => {
    const handleWheel = (e) => {
        e.preventDefault();
        if (onlineIconsContainerRef.current) {
            onlineIconsContainerRef.current.scrollBy({
                top: e.deltaY,
                behavior: 'smooth'
            });
        }
    };

    // 延迟执行确保DOM已渲染
    const timeoutId = setTimeout(() => {
      const container = onlineIconsContainerRef.current;
      if (container) {
          container.addEventListener('wheel', handleWheel, { passive: false });
      }
    }, 0);

    return () => {
        clearTimeout(timeoutId);
        const container = onlineIconsContainerRef.current;
        if (container) {
            container.removeEventListener('wheel', handleWheel);
        }
    };
  }, [retrievedIcons]); // 当retrievedIcons变化时重新绑定事件

  // 添加一个函数来转义HTML/XML特殊字符
  const escapeHtml = (unsafe) => {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
  };

  const generateIconData = (data) => {
    if (data.source === '纯色图标') {
      // 生成纯色图标，使用转义后的文本
      const escapedText = escapeHtml(data.text.substring(0, 2));
      const svgString = `
        <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="15" fill="${data.color}" />
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
                font-family="Arial, sans-serif" font-size="30" fill="white">
            ${escapedText}
          </text>
        </svg>
      `;
      const base64Icon = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
      // 更新账户数据中的图标信息
      setAccountData(prev => ({
        ...prev,
        icon: base64Icon,
        iconConfig: data
      }));
    } else if (data.source === '在线图标' && retrievedIcons && retrievedIcons.length > 0) {
      // 使用检索到的第一个图标作为默认图标
      const iconUrl = selectedOnlineIcon || retrievedIcons[0].url;
      setAccountData(prev => ({
        ...prev,
        icon: iconUrl,
        iconConfig: data
      }));
    } else if (data.source === '本地上传' && localIcon) {
      // 使用本地上传的图标
      setAccountData(prev => ({
        ...prev,
        icon: localIcon,
        iconConfig: data
      }));
    } else {
      // 其他情况使用默认图标
      setAccountData(prev => ({
        ...prev,
        icon: '../resource/img/icon-48.png',
        iconConfig: data
      }));
    }
  };

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
          setRetrievedIcons(icons);
        } catch (error) {
          console.error('图标检索失败:', error);
        }
      }, 500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (accountData.name.trim()) {
      // 修改生成ID的方式，确保唯一性
      const uniqueId = Date.now() + Math.random();
      
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
          id: uniqueId, // 使用更强的唯一ID生成方式
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
      
      // 重置图标相关状态
      setIconData({
        source: '在线图标',
        color: '#339aff',
        text: ''
      });
      setSelectedOnlineIcon(null);
      setLocalIcon(null);
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
    
    // 重置图标相关状态
    setIconData({
      source: '在线图标',
      color: '#339aff',
      text: ''
    });
    setSelectedOnlineIcon(null);
    setLocalIcon(null);
    onClose();
  };

  // 处理图标源切换
  const handleSourceChange = (value) => {
    const newData = { ...iconData, source: value };
    setIconData(newData);
    // 切换源时清除选中的在线图标
    if (value !== '在线图标') {
      setSelectedOnlineIcon(null);
    }
    // 切换到本地上传时重置文件输入
    if (value === '本地上传' && fileInputRef.current) {
      fileInputRef.current.value = '';
      setLocalIcon(null);
    }
  };

  // 处理颜色更改
  const handleColorChange = (color) => {
    const newData = { ...iconData, color };
    setIconData(newData);
  };

  // 处理自定义颜色选择
  const handleCustomColorChange = (event) => {
    const newData = { ...iconData, color: event.target.value };
    setIconData(newData);
  };

  // 处理在线图标选择
  const handleOnlineIconSelect = (iconUrl) => {
    // 设置选中的在线图标
    setSelectedOnlineIcon(iconUrl);
    setAccountData(prev => ({
      ...prev,
      icon: iconUrl,
      iconConfig: {
        source: '在线图标',
        color: iconData.color,
        text: iconData.text
      }
    }));
  };

  // 处理本地文件上传
  const handleLocalFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLocalIcon(e.target.result);
        setAccountData(prev => ({
          ...prev,
          icon: e.target.result,
          iconConfig: {
            source: '本地上传',
            color: iconData.color,
            text: iconData.text
          }
        }));
      };
      reader.readAsDataURL(file);
    }
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
    
    // 添加去重逻辑，过滤掉URL相同的图标，保留第一个出现的
    const uniqueIcons = [];
    const seenUrls = new Set();
    
    for (const icon of icons) {
      if (!seenUrls.has(icon.url)) {
        seenUrls.add(icon.url);
        uniqueIcons.push(icon);
      }
    }
    
    return uniqueIcons;
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
        <div className="Add-Account-Panel" onClick={(e) => e.stopPropagation()}>
            <div className="complete-btn" title="关闭" onClick={handleClose}>&times;</div>
            <h2 className="panel-title">{isEditMode ? '编辑账号' : '添加账号'}</h2>
            <form onSubmit={handleSubmit}>
                {/* 图标定制功能区域 */}
                <div className="customize-icons">
                    <div className="source-selection">
                        <button 
                            onClick={() => handleSourceChange('在线图标')} 
                            className={iconData.source === '在线图标' ? 'selected' : ''}
                            type="button"
                        >
                            在线图标
                        </button>
                        <button 
                            onClick={() => handleSourceChange('纯色图标')} 
                            className={iconData.source === '纯色图标' ? 'selected' : ''}
                            type="button"
                        >
                            纯色图标
                        </button>
                        <button 
                            onClick={() => handleSourceChange('本地上传')} 
                            className={iconData.source === '本地上传' ? 'selected' : ''}
                            type="button"
                        >
                            本地上传
                        </button>
                    </div>

                    {/* 只有当不是在线图标时才显示selected-icon区域 */}
                    {iconData.source !== '在线图标' && iconData.source !== '本地上传' && (
                        <div className="selected-icon" style={{ backgroundColor: iconData.color }}>
                            {/* 根据不同的source显示不同的内容 */}
                            {iconData.source === '纯色图标' && <span>{iconData.text.substring(0, 2)}</span>}
                        </div>
                    )}

                    {/* 显示在线图标选项 */}
                    {iconData.source === '在线图标' && retrievedIcons && retrievedIcons.length > 0 && (
                      <div className="online-icons-section-container">
                        {/* 直接在滚动容器上应用ref，简化结构 */}
                        <div 
                          className="online-icons-container-scroll" 
                          ref={onlineIconsContainerRef}
                        >
                            {retrievedIcons.map((icon, index) => (
                                <div 
                                    key={index}
                                    onClick={() => handleOnlineIconSelect(icon.url)}
                                    className={`online-icon-option ${selectedOnlineIcon === icon.url ? 'selected' : ''}`}
                                >
                                    <img src={icon.url} alt={`Icon ${index}`} />
                                </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* 本地上传功能 */}
                    {iconData.source === '本地上传' && (
                        <div className="local-upload-container">
                            {localIcon ? (
                                <img src={localIcon} alt="Uploaded icon" className="local-preview" />
                            ) : (
                                <label className="local-upload-label" htmlFor="local-icon-upload">
                                    <span>点击上传图标</span>
                                </label>
                            )}
                            <input
                                ref={fileInputRef}
                                id="local-icon-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleLocalFileUpload}
                                className="local-upload-input"
                            />
                        </div>
                    )}

                    {iconData.source !== '在线图标' && iconData.source !== '本地上传' && (
                        <div className="color-selection">
                            {/* 颜色选择器 */}
                            {colorOptions.map((color, index) => (
                                <div 
                                    key={index}
                                    onClick={() => handleColorChange(color)} 
                                    style={{ backgroundColor: color }}
                                    className={iconData.color === color ? 'selected' : ''}
                                ></div>
                            ))}
                            {/* 自定义颜色选择器 */}
                            <div 
                                className={`custom-color-picker ${iconData.color === 'custom' ? 'selected' : ''}`}
                                title="自定义颜色"
                            >
                                <input 
                                    type="color" 
                                    value={iconData.color} 
                                    onChange={handleCustomColorChange}
                                    className="custom-color-input"
                                />
                            </div>
                        </div>
                    )}
                </div>
                
                {/* 只有当图标来源不是"在线图标"时才显示文本输入框 */}
                {iconData.source !== '在线图标' && iconData.source !== '本地上传' && (
                    <div className="form-group">
                        <div className="input-with-icon">
                            <i className="icon-iconpath">🔤</i>
                            <input 
                                type="text" 
                                value={iconData.text}
                                onChange={(e) => {
                                    const updatedIconConfig = { ...iconData, text: e.target.value };
                                    setIconData(updatedIconConfig);
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