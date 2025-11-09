import { useState } from 'react';
import Addaccount from './Addaccount';
import './index.css';


function AddPanel() {
    const [showAddAccount, setShowAddAccount] = useState(false);
    
    // 处理关闭Addaccount组件
    const handleCloseAddAccount = () => {
        setShowAddAccount(false);
    };
    
    return (
        <>
            <div className="add-options-panel">
                <div className="option-item">
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
                    <div className="option-text" onClick={() => setShowAddAccount(true)}>添加账号</div>
                </div>
                <div className="option-item">
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
                    <div className="option-text">添加账号</div>
                </div>
            </div>
            {/* 当showAddAccount为true时显示Addaccount组件 */}
            {showAddAccount && (
                <Addaccount onClose={handleCloseAddAccount} />
            )}
      </>
    )
}

export default AddPanel;