import { useState, useEffect } from 'react';
import './index.css';

function Mergecoverage() { 
    // 处理合并逻辑
    const handleMerge = () => {
        console.log('执行合并操作');
        // 这里将实现合并逻辑
    };

    // 处理覆盖逻辑
    const handleOverride = () => {
        console.log('执行覆盖操作');
        // 这里将实现覆盖逻辑
    };

    return (
        <div className="container-Mergecoverage">
            <div className="main-Mergecoverage">
                <div className="header-Mergecoverage">
                    <div className="header-title">将本地数据合并到Gist中,将Gist数据覆盖到本地中</div>
                </div>
                <div className="button-Mergecoverage">
                    <button className="merge-button" onClick={handleMerge}>
                        合并
                    </button>
                    <button className="override-button" onClick={handleOverride}>
                        覆盖
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Mergecoverage;