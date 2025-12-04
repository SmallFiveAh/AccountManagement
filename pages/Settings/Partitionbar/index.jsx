import { useRef, useEffect, useState } from "react";
import './index.css';

function Partitionbar({ onSwitchPage }) { 
    const classificationRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const classificationicon = [
        { id: 1, icon: 'fa-solid fa-house', name: '首页' },
        { id: 2, icon: 'fa-solid fa-wallet', name: '钱包' },
    ];

    // 加载分类数据
    useEffect(() => {
        const loadCategories = () => {
            const savedCategories = JSON.parse(localStorage.getItem('Category') || '[]');
            setCategories(savedCategories);
        };
        
        loadCategories();
        
        // 监听localStorage变化
        const handleStorageChange = (e) => {
            if (e.key === 'Category') {
                loadCategories();
            }
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault();
            if (classificationRef.current) {
                classificationRef.current.scrollBy({
                    top: e.deltaY,
                    behavior: 'smooth'
                });
            }
        };

        const container = classificationRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    // 使用点击图标切换分类的逻辑
    const handleIconClick = (iconName) => {
        // 在这里处理点击图标的逻辑
        console.log(`点击了图标：${iconName}`);
    };
    
    // 处理分类点击事件
    const handleCategoryClick = (index) => {
        // index 0 是默认页面，分类从 index 1 开始
        if (onSwitchPage) {
            onSwitchPage(index + 1);
        }
    };
    
    return (
        <div className="Partitionbar">
            <div className="classification">
                {/* 添加新的滚动容器 */}
                <div className="classification-scroll-container" ref={classificationRef}>
                    {classificationicon.map((item) => (
                        <div className="classification-icon" key={`default-${item.id}`} onClick={() => handleIconClick(item.name)}>
                            <i className={item.icon}></i>
                            <span>{item.name}</span>
                        </div>
                    ))}
                    {/* 显示分类 */}
                    {categories.map((category, index) => (
                        <div 
                            className="classification-icon" 
                            key={`category-${category.id}`} 
                            onClick={() => handleCategoryClick(index)}
                            title={category.name}
                        >
                            <i className={item.icon}></i>
                            <span>{category.name.length > 2 ? category.name.substring(0, 2) + '...' : category.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Partitionbar;
