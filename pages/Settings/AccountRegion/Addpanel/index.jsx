import { useState } from 'react';
import './index.css';


function AddPanel({ onAddAccount, onAddCategory, onExportData, onImportData }) {
    return (
        <>
            <div className="add-options-panel">
                <div className="option-item" onClick={onAddAccount}>
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
                <div className="option-item" onClick={onAddCategory}>
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
                    <div className="option-text">添加分类</div>
                </div>
                <div className="option-item" onClick={onExportData}>
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
                    <div className="option-text">导出数据</div>
                </div>
                <div className="option-item" onClick={onImportData}>
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
                    <div className="option-text">导入数据</div>
                </div>
            </div>
        </>
    )
}

export default AddPanel;