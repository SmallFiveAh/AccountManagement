// index.jsx
import { useState } from 'react';
import './index.css';

// 将 iconOptions 移到组件外部，避免变量提升问题
const iconOptions = [
  { id: 1, name: '工作', icon: '💼' },
  { id: 2, name: '社交', icon: '👥' },
  { id: 3, name: '购物', icon: '🛒' },
  { id: 4, name: '娱乐', icon: '🎮' },
  { id: 5, name: '学习', icon: '📚' },
  { id: 6, name: '生活', icon: '🏠' },
  { id: 7, name: '旅行', icon: '✈️' },
  { id: 8, name: '健康', icon: '❤️' },
  { id: 9, name: '运动', icon: '⚽' },
  { id: 10, name: '美食', icon: '🍽️' },
  { id: 11, name: '音乐', icon: '🎵' },
  { id: 12, name: '电影', icon: '🎬' },
  { id: 13, name: '阅读', icon: '📖' },
  { id: 14, name: '健身', icon: '💪' },
  { id: 15, name: '出行', icon: '🚗' },
  { id: 16, name: '通讯', icon: '📞' },
  { id: 17, name: '摄影', icon: '📷' },
  { id: 18, name: '游戏', icon: '🕹️' },
  { id: 19, name: '教育', icon: '🎓' },
  { id: 20, name: '金融', icon: '💰' },
  { id: 21, name: '科技', icon: '💻' },
  { id: 22, name: '天气', icon: '🌤️' },
  { id: 23, name: '地图', icon: '🗺️' },
  { id: 24, name: '工具', icon: '📌' },
];

function Addcategory({ onClose }) {
  // 设置默认选中第一个图标
  const [categoryName, setCategoryName] = useState(iconOptions[0].name);
  const [selectedIcon, setSelectedIcon] = useState(iconOptions[0]);

  const handleSave = () => {
    if (!categoryName.trim()) return alert('请输入分类名称');
    console.log('保存分类:', { categoryName, selectedIcon });
    onClose();
  };

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    setCategoryName(icon.name);
  };

  return (
    <div className="Addcategory-overlay open" onClick={onClose}>
      <div className="Addcategory" onClick={(e) => e.stopPropagation()}>
        <div className="Addcategory-header">
          <div className="category-name">
            <input 
              type="text" 
              placeholder='请输入分类名称' 
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
        </div>

        <div className="Addcategory-body">
          <div className="category-icon">
            <div className="icon-selection">
              {iconOptions.map(icon => (
                <div 
                  key={icon.id}
                  className={`icon-option ${selectedIcon?.id === icon.id ? 'selected' : ''}`}
                  onClick={() => handleIconSelect(icon)}
                >
                  <span className="icon-preview">{icon.icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="Addcategory-footer">
            <button className="Addcategory-btn-btn-primary" onClick={handleSave}>添加分类</button>
            <button className="Addcategory-btn-btn-secondary" onClick={onClose}>关闭面板</button>
        </div>
      </div>
    </div>
  );
}

export default Addcategory;