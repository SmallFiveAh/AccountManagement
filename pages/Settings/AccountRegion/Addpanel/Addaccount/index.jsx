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
          source: '在线图标',
          color: '#339aff',
          text: ''
        },
        description: ''  // 确保description字段初始化
      });
      setIsEditMode(false);
      setEditingAccountId(null);
    }
  }, [editAccount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData(prev => ({
      ...prev,
      [name]: value
    }));
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
        onSave(accountData, false); // 第二个参数表示是添加操作
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
    onClose();
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
                />
                {/* 将文本输入框移到这里 */}
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