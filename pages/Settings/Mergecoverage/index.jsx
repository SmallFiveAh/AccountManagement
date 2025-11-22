import { useState } from 'react';
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
            // 从本地存储获取现有账户数据
            const localAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
            // 合并逻辑：将 Gist 数据与本地数据合并（去重）
            const mergedAccounts = [...localAccounts];
            const existingIds = new Set(localAccounts.map(acc => acc.id));
            gistAccounts.forEach(account => {
                if (!existingIds.has(account.id)) {
                    mergedAccounts.push(account);
                }
            });
            // // 保存合并后的数据到本地存储
            localStorage.setItem('accounts', JSON.stringify(mergedAccounts));
            // 关闭组件
            setIsVisible(false);
            // 调用Monitor显示覆盖成功消息
            if (window.Monitor && typeof window.Monitor.showMessage === 'function') {
                window.Monitor.showMessage('覆盖成功');
            }
        } catch (error) {
            // 调用Monitor显示覆盖失败消息
            if (window.Monitor && typeof window.Monitor.showMessage === 'function') {
                window.Monitor.showMessage('覆盖失败');
            }
            console.error('覆盖失败:', error);
        }

    };

    // 如果不可见则不渲染组件
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