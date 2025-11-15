import { useState } from 'react';
import './index.css';

function Monitor() {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');

    // 显示操作消息的函数
    const showMessage = (msg) => {
        setMessage(msg);
        setIsVisible(true);
        
        // 3秒后自动隐藏
        setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    };

    // 暴露给外部调用的方法
    window.Monitor = {
        showMessage: showMessage
    };

    return (
        <div className={`monitor ${isVisible ? 'show' : ''}`}>
            <div className="monitor-title">
                {message || ''}
            </div>
        </div>
    )
}

export default Monitor;