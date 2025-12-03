import { useRef, useEffect } from "react";
import './index.css';

function Partitionbar() { 
    const classificationRef = useRef(null);
    const classificationicon = [
        { id: 1, icon: 'fa-solid fa-house', name: '首页' },
        { id: 2, icon: 'fa-solid fa-wallet', name: '钱包' },
        { id: 3, icon: 'fa-solid fa-chart-simple', name: '统计' },
        { id: 4, icon: 'fa-solid fa-gear', name: '设置' },
        { id: 5, icon: 'fa-solid fa-question', name: '帮助' },
        { id: 6, icon: 'fa-solid fa-user', name: '账户' },
        { id: 7, icon: 'fa-solid fa-right-from-bracket', name: '退出' },
        { id: 8, icon: 'fa-solid fa-moon', name: '深色' },
        { id: 9, icon: 'fa-solid fa-sun', name: '浅色' },
        { id: 10, icon: 'fa-solid fa-circle-half-stroke', name: '模式' },
        { id: 11, icon: 'fa-solid fa-circle-user', name: '用户' },
        { id: 12, icon: 'fa-solid fa-circle-question', name: '关于' },
        { id: 13, icon: 'fa-solid fa-circle-info', name: '信息' },
        { id: 14, icon: 'fa-solid fa-circle-exclamation', name: '警告' },
        { id: 15, icon: 'fa-solid fa-circle-xmark', name: '错误' },
    ];

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
    return (
        <div className="Partitionbar">
            <div className="classification">
                {/* 添加新的滚动容器 */}
                <div className="classification-scroll-container" ref={classificationRef}>
                    {classificationicon.map((item) => (
                        <div className="classification-icon" key={item.id} onClick={() => handleIconClick(item.name)}>
                            <i className={item.icon}></i>
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Partitionbar;