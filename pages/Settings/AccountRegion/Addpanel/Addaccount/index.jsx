import { useState } from 'react';
import Customizeicons from './Customizeicons';
import './index.css';

function Addaccount({ isOpen, onClose, onSave }) {
  const [accountData, setAccountData] = useState({
    name: '',
    username: '',
    password: '',
    url: '',
    icon: '../resource/img/icon-48.png',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (accountData.name.trim()) {
      onSave(accountData);
      setAccountData({
        name: '',
        username: '',
        password: '',
        url: '',
        icon: '../resource/img/icon-48.png',
        description: ''
      });
    }
  };

  const handleClose = () => {
    setAccountData({
      name: '',
      username: '',
      password: '',
      url: '',
      icon: '../resource/img/icon-48.png',
      description: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
        <div className="Add-Account-Panel" onClick={(e) => e.stopPropagation()}>
            <div className="complete-btn" title="关闭" onClick={handleClose}>&times;</div>
            <h2 className="panel-title">添加账号</h2>
            <form onSubmit={handleSubmit}>
                <Customizeicons />
                
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
                            type="password"
                            name="password"
                            value={accountData.password}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="请输入密码"
                        />
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
                            placeholder="https://example.com"
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
                            placeholder="请输入账号说明..."
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
                        保存
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default Addaccount;