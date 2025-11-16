import { useState, useEffect } from 'react';
import './index.css'

function AccountToken () {
    const [activeNav, setActiveNav] = useState('个人信息');
    
    // 新增Token和Gist相关信息状态
    const [tokenInfo, setTokenInfo] = useState({
        token: '',
        gistId: '',
        gistFilename: ''
    });
    
    // 添加是否有token信息的状态
    const [hasTokenInfo, setHasTokenInfo] = useState(false);
    
    // 简化导航项，适应面板尺寸
    const navItems = [
        { id: '个人信息', icon: '👤' },
        { id: '常规设置', icon: '⚙️' },
        { id: '消息通知', icon: '🔔' },
        { id: '关于我们', icon: 'ℹ️' }
    ];

    // 添加缺失的函数
    const handleNavClick = (navId) => {
        setActiveNav(navId);
        // 这里可以根据不同的导航项显示不同的内容
    };

    // 组件加载时从localStorage读取保存的信息
    useEffect(() => {
        const savedTokenInfo = localStorage.getItem('accountTokenInfo');
        if (savedTokenInfo) {
            try {
                setTokenInfo(JSON.parse(savedTokenInfo));
                setHasTokenInfo(true);
            } catch (e) {
                console.error('Failed to parse token info from localStorage', e);
            }
        }
    }, []);

    const handleLogout = () => {
        if (window.confirm('确定要退出登录吗？')) {
            // 删除与账户令牌相关的本地存储数据
            localStorage.removeItem('accountTokenInfo');
            // 重置状态
            setTokenInfo({
                token: '',
                gistId: '',
                gistFilename: ''
            });
            setHasTokenInfo(false);
        }
    };
    
    // 处理Token信息输入变化
    const handleTokenInfoChange = (field, value) => {
        setTokenInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };
    
    // 保存Token信息到localStorage
    const handleSaveTokenInfo = () => {
        try {
            localStorage.setItem('accountTokenInfo', JSON.stringify(tokenInfo));
            setHasTokenInfo(true);
            // 调用Monitor组件显示保存成功的消息
            if (window.Monitor && typeof window.Monitor.showMessage === 'function') {
                window.Monitor.showMessage('配置成功');
            }
            // 这里可以添加实际保存逻辑
        } catch (e) {
            console.error('Failed to save token info to localStorage', e);
            // 调用Monitor组件显示保存失败的消息
            if (window.Monitor && typeof window.Monitor.showMessage === 'function') {
                window.Monitor.showMessage('配置失败');
            }
        }
    };
    
    return (
        <div className="account-token-container">
            <div className="nav-menu">
                {navItems.map(item => (
                    <div 
                        key={item.id}
                        className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
                        onClick={() => handleNavClick(item.id)}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-text">{item.id}</span>
                        {item.badge && <span className="status-badge free">{item.badge}</span>}
                    </div>
                ))}
            </div>
            
            <div className="content">
                <div className="profile-header">
                    <div className="avatar">👤</div>
                    <div className="profile-info">
                        <h2>个人信息</h2>
                        <p>{tokenInfo.gistFilename || 'AccountManagement'}</p>
                    </div>
                </div>
            
                
                {/* 新增Token信息配置区域 */}
                <div className="info-section">
                    <div className="info-item">
                        <div className="info-content">
                            <div className="info-label">Token</div>
                            <input 
                                type="password"
                                className="input-field"
                                placeholder="请输入Github-Token"
                                value={tokenInfo.token}
                                onChange={(e) => handleTokenInfoChange('token', e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="info-item">
                        <div className="info-content">
                            <div className="info-label">GistID</div>
                            <input 
                                type="text"
                                className="input-field"
                                placeholder="请输入Gist-ID"
                                value={tokenInfo.gistId}
                                onChange={(e) => handleTokenInfoChange('gistId', e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="info-item">
                        <div className="info-content">
                            <div className="info-label">Gist文件名</div>
                            <input 
                                type="text"
                                className="input-field"
                                placeholder="请输入Gist文件名"
                                value={tokenInfo.gistFilename}
                                onChange={(e) => handleTokenInfoChange('gistFilename', e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <button 
                        className="save-btn"
                        onClick={handleSaveTokenInfo}
                        disabled={!tokenInfo.token && !tokenInfo.gistId && !tokenInfo.gistFilename}
                    >
                        保存配置
                    </button>
                </div>
                
                {hasTokenInfo && (
                    <button className="btn logout-btn" onClick={handleLogout}>退出登录</button>
                )}
            </div>
        </div>
    )
}

export default AccountToken;