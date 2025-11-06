import { useState, useEffect, useRef } from 'react';
import './index.css';

function ContextMenu({ isVisible, position, account, elementRect, onClose, onEdit, onDelete, onOpen }) {
    const menuRef = useRef(null);

    // 点击编辑账号
    const handleEditAccount = () => {
        if (onEdit && account) {
            onEdit(account);
        }
        onClose();
    };

    // 点击删除账号
    const handleDeleteAccount = () => {
        if (onDelete && account) {
            onDelete(account);
        }
        onClose();
    };

    // 点击打开账号
    const handleOpenAccount = () => {
        if (onOpen && account) {
            onOpen(account);
        }
        onClose();
    };

    // 点击菜单外部关闭菜单
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, onClose]);

    if (!isVisible || !account) return null;

    // 计算菜单的位置，使其相对于元素定位，类似于Addpanel的定位方式
    const menuStyle = elementRect ? {
        transform: 'translateX(-50%)', // 水平居中
        display: 'flex'
    } : {
        // 降级方案：如果没有元素位置信息，使用鼠标坐标
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: 'none',
        display: 'flex'
    };

    return (
        <div 
            ref={menuRef}
            className="add-options-panel context-menu"
            style={menuStyle}
        >
            <div className="option-item" onClick={handleOpenAccount}>
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
                <div className="option-text">打开账号</div>
            </div>
            <div className="option-item" onClick={handleEditAccount}>
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
            <div className="option-item" onClick={handleDeleteAccount}>
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
    );
}

export default ContextMenu;