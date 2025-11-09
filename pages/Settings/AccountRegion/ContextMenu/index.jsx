import { useState, useEffect, useRef } from 'react';
import './index.css';

function ContextMenu() {
    return (
      <div className="add-options-panel-sdwf">
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
                <div className="option-text">复制数据</div>
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
                <div className="option-text">编辑账号</div>
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
                <div className="option-text">删除账号</div>
            </div>
      </div>
    );
}

export default ContextMenu;