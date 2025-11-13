import { useState, useEffect } from 'react';
import './index.css';

function Customizeicons({ onIconChange }) {
    const [iconData, setIconData] = useState({
        source: '纯色图标',
        color: '#339aff',
        text: ''
    });

    // 创建一个useEffect来处理图标数据生成
    useEffect(() => {
        generateIconData(iconData);
    }, [iconData]);

    // 添加一个函数来转义HTML/XML特殊字符
    const escapeHtml = (unsafe) => {
        if (!unsafe) return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    const generateIconData = (data) => {
        if (data.source === '纯色图标') {
            // 生成纯色图标，使用转义后的文本
            const escapedText = escapeHtml(data.text.substring(0, 2));
            const svgString = `
                <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                    <rect width="64" height="64" rx="15" fill="${data.color}" />
                    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
                          font-family="Arial, sans-serif" font-size="30" fill="white">
                        ${escapedText}
                    </text>
                </svg>
            `;
            const base64Icon = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
            onIconChange && onIconChange({...data, icon: base64Icon});
        } else {
            // 其他情况使用默认图标
            onIconChange && onIconChange({...data, icon: '../resource/img/icon-48.png'});
        }
    };

    const handleSourceChange = (value) => {
        const newData = { ...iconData, source: value };
        setIconData(newData);
    };

    const handleColorChange = (color) => {
        const newData = { ...iconData, color };
        setIconData(newData);
    };

    const handleTextChange = (event) => {
        const newData = { ...iconData, text: event.target.value };
        setIconData(newData);
    };

    // 定义颜色选项数组
    const colorOptions = [
        '#339aff', '#3ac47d', '#00bfa5', 
        '#9bdb07ff', '#6c6cff', '#ec407a', 
        '#ff5f57', '#a19494ff', '#8b6868ff',
        '#4e0606ff', '#808080', '#a01b8eff',
        '#000', '#096e96ff', '#d400ffff',
        '#5c0d9cff', '#00ff4cff', '#554a92ff',
        '#295242ff', '#ff2effff', '#6269ccff',
        '#4da512ff', '#02596eff', '#3a066bff',
        '#c49c2fff', '#69cf0aff', '#20dff8ff'
    ];

    // 处理自定义颜色选择
    const handleCustomColorChange = (event) => {
        const newData = { ...iconData, color: event.target.value };
        setIconData(newData);
    };

    return (
        <div className="customize-icons">
            <div className="source-selection">
                <button 
                    onClick={() => handleSourceChange('在线图标')} 
                    className={iconData.source === '在线图标' ? 'selected' : ''}
                >
                    在线图标
                </button>
                <button 
                    onClick={() => handleSourceChange('纯色图标')} 
                    className={iconData.source === '纯色图标' ? 'selected' : ''}
                >
                    纯色图标
                </button>
                <button 
                    onClick={() => handleSourceChange('本地上传')} 
                    className={iconData.source === '本地上传' ? 'selected' : ''}
                >
                    本地上传
                </button>
            </div>

            <div className="selected-icon" style={{ backgroundColor: iconData.color }}>
                {/* 根据不同的source显示不同的内容 */}
                {iconData.source === '纯色图标' && <span>{iconData.text.substring(0, 2)}</span>}
            </div>

            <div className="color-selection">
                {/* 颜色选择器 */}
                {colorOptions.map((color, index) => (
                    <div 
                        key={index}
                        onClick={() => handleColorChange(color)} 
                        style={{ backgroundColor: color }}
                        className={iconData.color === color ? 'selected' : ''}
                    ></div>
                ))}
                {/* 自定义颜色选择器 */}
                <div 
                    className={`custom-color-picker ${iconData.color === 'custom' ? 'selected' : ''}`}
                    title="自定义颜色"
                >
                    <input 
                        type="color" 
                        value={iconData.color} 
                        onChange={handleCustomColorChange}
                        className="custom-color-input"
                    />
                </div>
            </div>

            <div className="text-input">
                <input 
                    type="text" 
                    value={iconData.text} 
                    onChange={handleTextChange} 
                    placeholder="显示图标文字，可选（建议1~2个字汉字）" 
                />
            </div>
        </div>
    );
}

export default Customizeicons;