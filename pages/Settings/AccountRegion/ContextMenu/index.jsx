import { useState, useEffect, useRef } from 'react';
import Deleteaccount from './Deleteaccount';
import './index.css';

function ContextMenu({ show, position, onClose, selectedAccount, onDeleteAccount }) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    
    // 阻止菜单内点击冒泡，避免触发外部点击关闭菜单
    const handleMenuClick = (e) => {
        e.stopPropagation();
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
        onClose(); // 关闭上下文菜单
    };

    const handleDeleteConfirm = () => {
        // 添加检查确保 selectedAccount 存在
        if (selectedAccount && onDeleteAccount) {
            onDeleteAccount(selectedAccount);
        }
        setShowDeleteConfirm(false);
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(false);
    };

    return (
      <>
        <div 
            className="add-options-panel-sdwf" 
            style={{ 
                display: show ? 'flex' : 'none',
                position: 'fixed',
                left: position?.left || 0,
                top: position?.top || 0,
                zIndex: 1000
            }}
            onClick={handleMenuClick}
        >
            <div className="option-item" onClick={onClose}>
                <div className="option-icon">
                    <svg
                        width={24}
                        height={24}
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                        cx={8}
                        cy={6}
                        r={3}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1}
                        />
                        <path
                        d="M3 14 L13 14"
                        stroke="currentColor"
                        strokeWidth={1}
                        fill="none"
                        />
                        <path
                        d="M8 9 L8 14"
                        stroke="currentColor"
                        strokeWidth={1}
                        fill="none"
                        />
                    </svg>
                </div>
                <div className="option-text">复制数据</div>
            </div>
            <div className="option-item" onClick={onClose}>
                <div className="option-icon">
                    <svg
                        width={24}
                        height={24}
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                        cx={8}
                        cy={6}
                        r={3}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1}
                        />
                        <path
                        d="M3 14 L13 14"
                        stroke="currentColor"
                        strokeWidth={1}
                        fill="none"
                        />
                        <path
                        d="M8 9 L8 14"
                        stroke="currentColor"
                        strokeWidth={1}
                        fill="none"
                        />
                    </svg>
                </div>
                <div className="option-text">编辑账号</div>
            </div>
            <div className="option-item delete-option" onClick={handleDeleteClick}>
                <div className="option-icon">
                    <svg
                        width={24}
                        height={24}
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                        cx={8}
                        cy={6}
                        r={3}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1}
                        />
                        <path
                        d="M3 14 L13 14"
                        stroke="currentColor"
                        strokeWidth={1}
                        fill="none"
                        />
                        <path
                        d="M8 9 L8 14"
                        stroke="currentColor"
                        strokeWidth={1}
                        fill="none"
                        />
                    </svg>
                </div>
                <div className="option-text">删除账号</div>
            </div>
        </div>
        
        <Deleteaccount 
            show={showDeleteConfirm}
            onClose={handleDeleteCancel}
            onConfirm={() => handleDeleteConfirm()} // 确保传递正确的回调函数
            accountName={selectedAccount?.name}
        />
      </>
    );
}

export default ContextMenu;