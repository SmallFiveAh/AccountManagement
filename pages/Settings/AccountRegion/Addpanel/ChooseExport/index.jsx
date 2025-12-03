import { useState } from 'react';
import './index.css';

function ChooseExport({ onClose }) {
    // 模拟账户数据
    const mockAccounts = [
        { id: 1, username: 'user1', email: 'user1@example.com', password: 'pass123' },
        { id: 2, username: 'user2', email: 'user2@example.com', password: 'pass456' },
        { id: 3, username: 'user3', email: 'user3@example.com', password: 'pass789' }
    ];

    // 导出为JSON格式
    const exportAsJSON = () => {
        const dataStr = JSON.stringify(mockAccounts, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'accounts.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    // 导出为CSV格式
    const exportAsCSV = () => {
        const headers = ['ID', 'Username', 'Email', 'Password'];
        const rows = mockAccounts.map(account => 
            `${account.id},${account.username},${account.email},${account.password}`
        );
        const csvContent = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'accounts.csv';
        link.click();
        URL.revokeObjectURL(url);
    };

    // 导出为TXT格式
    const exportAsTXT = () => {
        let txtContent = 'Account List\n=============\n\n';
        mockAccounts.forEach(account => {
            txtContent += `ID: ${account.id}\n`;
            txtContent += `Username: ${account.username}\n`;
            txtContent += `Email: ${account.email}\n`;
            txtContent += `Password: ${account.password}\n`;
            txtContent += '------------------------\n';
        });
        
        const blob = new Blob([txtContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'accounts.txt';
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleChoose = (option) => {
        switch(option) {
            case 'json':
                exportAsJSON();
                break;
            case 'csv':
                exportAsCSV();
                break;
            case 'txt':
                exportAsTXT();
                break;
            default:
                console.log('Unsupported export format');
        }
        onClose();
    };

    return (
        <div className="choose-export-panel" onClick={onClose}>
            <div className="Add-Account-Panel" onClick={(e) => e.stopPropagation()}>
                <div className="complete-btn" title="关闭" onClick={onClose}>&times;</div>
                <h2 className="panel-title">选择导出方式</h2>
                <div className="export-options">
                    <div className="option-item" onClick={() => handleChoose('json')}>
                        <div className="option-icon">📄</div>
                        <div className="option-text">JSON格式</div>
                    </div>
                    <div className="option-item" onClick={() => handleChoose('csv')}>
                        <div className="option-icon">📊</div>
                        <div className="option-text">CSV格式</div>
                    </div>
                    <div className="option-item" onClick={() => handleChoose('txt')}>
                        <div className="option-icon">📝</div>
                        <div className="option-text">TXT格式</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChooseExport;