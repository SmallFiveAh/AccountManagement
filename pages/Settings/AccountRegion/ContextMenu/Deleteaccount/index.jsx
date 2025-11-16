import React from 'react';
import './index.css';

function Deleteaccount({ show, onClose, onConfirm }) {
    if (!show) return null;

    // 修改确认函数，添加Monitor调用
    const handleConfirm = () => {
        onConfirm();
        // 调用Monitor显示删除成功消息
        if (window.Monitor && typeof window.Monitor.showMessage === 'function') {
            window.Monitor.showMessage('删除成功');
        }
    };

    return (
        <div className="delete-confirm-overlay">
            <div className="delete-confirm-modal">
                <div className="delete-confirm-message">
                    您是否想清楚要删除该账号？
                </div>
                <div className="delete-confirm-buttons">
                    <button className="delete-confirm-btn delete-confirm-cancel" onClick={onClose}>
                        取消
                    </button>
                    {/* 修改确认按钮的点击处理函数 */}
                    <button className="delete-confirm-btn delete-confirm-ok" onClick={handleConfirm}>
                        确认
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Deleteaccount;