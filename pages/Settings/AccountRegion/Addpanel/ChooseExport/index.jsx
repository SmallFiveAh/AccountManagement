import { useState } from 'react';
import './index.css';

function ChooseExport({ onClose, Currentpagedata }) {
    // 导出为JSON格式
    const exportAsJSON = () => {
        const dataStr = JSON.stringify(Currentpagedata, null, 2);
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
        const headers = ['id', 'username', 'password', 'name', 'usageCount', 'description', 'url', 'icon', 'iconConfig'];
        const escapeCsvField = (field) => {
            if (typeof field === 'string' && (field.includes(',') || field.includes('"') || field.includes('\n'))) {
                return `"${field.replace(/"/g, '""')}"`;
            }
            return field;
        };
        const rows = Currentpagedata.map(account => [
            account.id,
            escapeCsvField(account.username),
            escapeCsvField(account.password),
            escapeCsvField(account.name),
            account.usageCount,
            escapeCsvField(account.description),
            escapeCsvField(account.url),
            escapeCsvField(account.icon),
            escapeCsvField(JSON.stringify(account.iconConfig))
        ].join(','));
        const csvContent = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
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
        Currentpagedata.forEach(account => {
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