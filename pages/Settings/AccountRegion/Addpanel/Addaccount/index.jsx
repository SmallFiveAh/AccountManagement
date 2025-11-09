import { useState } from 'react';
import './index.css';

function Addaccount({ isOpen, onClose, onSave }) {
  const [accountData, setAccountData] = useState({
    name: '',
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
        url: '',
        icon: '../resource/img/icon-48.png',
        description: ''
      });
    }
  };

  const handleClose = () => {
    setAccountData({
      name: '',
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
            <h2 style={{ textAlign: 'center', color: '#1c1f22de', marginTop: '10px' }}>添加账号</h2>
            <form onSubmit={handleSubmit} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '15px',
              marginTop: '20px'
            }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#1c1f22de' }}>账号名称 *</label>
                    <input
                        type="text"
                        name="name"
                        value={accountData.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#1c1f22de' }}>账号</label>
                    <input
                        type="text"
                        name="name"
                        value={accountData.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#1c1f22de' }}>密码</label>
                    <input
                        type="text"
                        name="name"
                        value={accountData.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#1c1f22de' }}>网址</label>
                    <input
                        type="text"
                        name="url"
                        value={accountData.url}
                        onChange={handleChange}
                        placeholder="https://example.com"
                        className="input-field"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#1c1f22de' }}>图标路径</label>
                    <input
                        type="text"
                        name="icon"
                        value={accountData.icon}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#1c1f22de' }}>说明</label>
                    <div style={{ position: 'relative' }}>
                        <textarea
                            name="description"
                            value={accountData.description}
                            onChange={handleChange}
                            placeholder="请输入账号说明..."
                            className="input-field"
                            style={{
                                width: '100%',
                                height: '100px',
                                padding: '8px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                resize: 'vertical',
                                fontFamily: 'inherit',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                        />
                        <div style={{ 
                            position: 'absolute', 
                            bottom: '5px', 
                            right: '8px', 
                            fontSize: '12px', 
                            color: '#666',
                            pointerEvents: 'none'
                        }}>
                            {accountData.description.length} 字
                        </div>
                    </div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: '10px',
                  marginTop: '10px'
                }}>
                    <button 
                        type="button" 
                        onClick={handleClose}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            backgroundColor: '#f0f0f0',
                            cursor: 'pointer'
                        }}
                    >
                        取消
                    </button>
                    <button 
                        type="submit"
                        style={{
                            padding: '8px 16px',
                            borderRadius: '5px',
                            border: 'none',
                            backgroundColor: '#4a7afe',
                            color: 'white',
                            cursor: 'pointer'
                        }}
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