import { useState, useEffect, useRef } from 'react';
import Deleteaccount from './Deleteaccount';
import './index.css';

function ContextMenu({ show, position, onClose, selectedAccount, onDeleteAccount }) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    // 保存选中的账户信息，确保在确认删除时可以访问到
    const [accountToDelete, setAccountToDelete] = useState(null);
    // 阻止菜单内点击冒泡，避免触发外部点击关闭菜单
    const handleMenuClick = (e) => {
        e.stopPropagation();
    };

    const handleCopyData = () => {
        if (selectedAccount) {
            let accounts = localStorage.getItem('accounts')
            ? JSON.parse(localStorage.getItem('accounts'))
            : [];
            const account = accounts.find(acc => acc.id === selectedAccount.id);
            if (account) {
                // 使用 JSON.stringify 的第三个参数来格式化输出，使其具有美化效果
                const formattedAccountData = JSON.stringify(account, null, 2);
                navigator.clipboard.writeText(formattedAccountData).then(() => {
                    // 复制成功后调用Monitor组件显示通知
                    if (window.Monitor && typeof window.Monitor.showMessage === 'function') {
                        window.Monitor.showMessage('账号数据已复制到剪贴板');
                    }
                }).catch(err => {
                    console.error('复制失败:', err);
                    if (window.Monitor && typeof window.Monitor.showMessage === 'function') {
                        window.Monitor.showMessage('复制失败，请手动复制');
                    }
                });
            }
            
        }
        onClose(); // 关闭上下文菜单
    };

    const handleDeleteClick = () => {
        // 在打开确认对话框前保存要删除的账户信息
        setAccountToDelete(selectedAccount);
        setShowDeleteConfirm(true);
        onClose(); // 关闭上下文菜单
    };

    const handleDeleteConfirm = () => {
        if (accountToDelete && onDeleteAccount) {
            onDeleteAccount(accountToDelete);
        }
        setShowDeleteConfirm(false);
        // 清除保存的账户信息
        setAccountToDelete(null);
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(false);
        // 清除保存的账户信息
        setAccountToDelete(null);
    };

    // 当selectedAccount变化时更新内部状态
    useEffect(() => {
        if (selectedAccount) {
            setAccountToDelete(selectedAccount);
        }
    }, [selectedAccount]);

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
            <div className="option-item" onClick={handleCopyData}>
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
            onConfirm={handleDeleteConfirm}
        />
      </>
    );
}

export default ContextMenu;