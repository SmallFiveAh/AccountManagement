import React from 'react';
import './index.css';

function Deleteaccount({ show, onClose, onConfirm, accountName }) {
    if (!show) return null;

    return (
        <div className="delete-confirm-overlay" onClick={onClose}>
            <div className="delete-confirm-modal" onClick={(e) => e.stopPropagation()}>
                <div className="delete-confirm-message">
                    您是否想清楚要删除该账号？
                </div>
                <div className="delete-confirm-buttons">
                    <button className="delete-confirm-btn delete-confirm-cancel" onClick={onClose}>
                        取消
                    </button>
                    <button className="delete-confirm-btn delete-confirm-ok" onClick={onConfirm}>
                        确认
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Deleteaccount;