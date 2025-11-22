import { useState,  useEffect } from 'react';
import { syncFromGist, syncToGist } from '../../GistAPI';
import './index.css';

function Mergecoverage() {
    // 添加状态来控制组件显示/隐藏
    const [isVisible, setIsVisible] = useState(true);

    // 处理合并逻辑
    const handleMerge = async () => {
        // 将本地数据合并到Gist中
        try {
            // 从本地存储获取账户数据
            const localAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
            // 将本地数据同步到 Gist
            await syncToGist(localAccounts);
            // 关闭组件
            setIsVisible(false);
            // 调用Monitor显示合并成功消息
            if (window.Monitor && typeof window.Monitor.showMessage === 'function') {
                window.Monitor.showMessage('合并成功');
            }
            // 刷新页面以更新数据
            window.location.reload();
        } catch (error) {
            // 调用Monitor显示合并失败消息
            if (window.Monitor && typeof window.Monitor.showMessage === 'function') {
                window.Monitor.showMessage('合并失败');
            }
            console.error('合并失败:', error);
        }
    };


    // 处理覆盖逻辑
    const handleOverride = async () => {
        // 将Gist数据覆盖到本地中
        try {
            // 从 Gist 同步数据
            const gistAccounts = await syncFromGist();
            // 直接用 Gist 数据覆盖本地数据（这才是真正的覆盖）
            localStorage.setItem('accounts', JSON.stringify(gistAccounts));
            // 关闭组件
            setIsVisible(false);
            // 调用Monitor显示覆盖成功消息
            if (window.Monitor && typeof window.Monitor.showMessage === 'function') {
                window.Monitor.showMessage('覆盖成功');
            }
            // 刷新页面以更新数据
            window.location.reload();
        } catch (error) {
            // 调用Monitor显示覆盖失败消息
            if (window.Monitor && typeof window.Monitor.showMessage === 'function') {
                window.Monitor.showMessage('覆盖失败');
            }
            console.error('覆盖失败:', error);
        }

    };
    if (!isVisible) {
        return null;
    }
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