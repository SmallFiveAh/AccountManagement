import { useState } from 'react';
import './index.css';

function Customizeicons() {
    const [iconData, setIconData] = useState({
        source: '纯色图标',
        color: '#339aff',
        text: ''
    });

    const handleSourceChange = (value) => {
        setIconData({ ...iconData, source: value });
    };

    const handleColorChange = (color) => {
        setIconData({ ...iconData, color });
    };

    const handleTextChange = (event) => {
        setIconData({ ...iconData, text: event.target.value });
    };

    // 定义颜色选项数组
    const colorOptions = [
        '#339aff', '#3ac47d', '#00bfa5', 
        '#9bdb07ff', '#6c6cff', '#ec407a', 
        '#ff5f57', '#a19494ff', '#8b6868ff',
        '#f5f5f5', '#808080', '#a01b8eff',
        '#000', '#096e96ff', '#d400ffff',
        '#5c0d9cff', '#00ff4cff', '#554a92ff',
        '#295242ff', '#ff2effff', '#6269ccff',
        '#4da512ff', '#02596eff', '#3a066bff',
        '#c49c2fff', '#69cf0aff', '#20dff8ff'
    ];

    // 处理自定义颜色选择
    const handleCustomColorChange = (event) => {
        handleColorChange(event.target.value);
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
                {iconData.source === '纯色图标' && <span>{iconData.text}</span>}
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