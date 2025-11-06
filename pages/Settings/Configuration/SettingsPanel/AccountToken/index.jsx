import { useState } from 'react';
import './index.css'

function AccountToken () {
    const [activeNav, setActiveNav] = useState('个人信息');
    const [userInfo, setUserInfo] = useState({
        nickname: 'qip3890@163.com',
        password: '********',
        phone: '19534125776',
        wechat: '未绑定',
        email: 'qip3890@163.com'
    });
    
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
    
    const handleEdit = (field) => {
        // 编辑功能的实现
        alert(`编辑${field}`);
    };
    
    const handleBind = (field) => {
        // 绑定功能的实现
        alert(`绑定${field}`);
    };

    const handleLogout = () => {
        if (window.confirm('确定要退出登录吗？')) {
            alert('已退出登录');
            // 这里可以添加实际退出登录的逻辑
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
                        <p>{userInfo.email}</p>
                    </div>
                </div>
                
                <div className="info-section">
                    <div className="info-item">
                        <div className="info-content">
                            <div className="info-label">昵称</div>
                            <div className="info-value">{userInfo.nickname}</div>
                        </div>
                        <button className="btn" onClick={() => handleEdit('nickname')}>编辑</button>
                    </div>
                    
                    <div className="info-item">
                        <div className="info-content">
                            <div className="info-label">密码</div>
                            <div className="info-value">{userInfo.password}</div>
                        </div>
                        <button className="btn" onClick={() => handleEdit('password')}>修改</button>
                    </div>
                    
                    <div className="info-item">
                        <div className="info-content">
                            <div className="info-label">手机</div>
                            <div className="info-value">{userInfo.phone}</div>
                        </div>
                        <button className="btn" onClick={() => handleEdit('phone')}>修改</button>
                    </div>
                    
                    <div className="info-item">
                        <div className="info-content">
                            <div className="info-label">微信</div>
                            <div className="info-value">{userInfo.wechat}</div>
                        </div>
                        <button 
                            className={`btn ${userInfo.wechat === '未绑定' ? 'btn-outline' : ''}`}
                            onClick={() => userInfo.wechat === '未绑定' ? handleBind('wechat') : handleEdit('wechat')}
                        >
                            {userInfo.wechat === '未绑定' ? '绑定' : '修改'}
                        </button>
                    </div>
                </div>
                
                <button className="btn logout-btn" onClick={handleLogout}>退出登录</button>
            </div>
        </div>
    )
}

export default AccountToken;