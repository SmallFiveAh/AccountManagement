import { useState, useRef, useEffect } from "react";
import './index.css';

function Partitionbar() { 
    const [iconData, setIconData] = useState(null);
    const classificationRef = useRef(null);
    const scrollThumbRef = useRef(null);
    
    const classificationicon = [
        { id: 1, icon: 'fa-solid fa-house', name: '首页' },
        { id: 2, icon: 'fa-solid fa-wallet', name: '钱包' },
        { id: 3, icon: 'fa-solid fa-chart-simple', name: '统计' },
        { id: 4, icon: 'fa-solid fa-gear', name: '设置' },
        { id: 5, icon: 'fa-solid fa-question', name: '帮助' },
        { id: 6, icon: 'fa-solid fa-user', name: '账户' },
        { id: 7, icon: 'fa-solid fa-right-from-bracket', name: '退出' },
        { id: 8, icon: 'fa-solid fa-moon', name: '深色模式' },
        { id: 9, icon: 'fa-solid fa-sun', name: '浅色模式' },
        { id: 10, icon: 'fa-solid fa-circle-half-stroke', name: '自动模式' },
        { id: 11, icon: 'fa-solid fa-circle-user', name: '用户' },
        { id: 12, icon: 'fa-solid fa-circle-question', name: '关于' },
        { id: 13, icon: 'fa-solid fa-circle-info', name: '信息' },
        { id: 14, icon: 'fa-solid fa-circle-exclamation', name: '警告' },
        { id: 15, icon: 'fa-solid fa-circle-xmark', name: '错误' },
    ]

    // 处理鼠标滚轮事件
    const handleWheel = (e) => {
        e.preventDefault();
        if (classificationRef.current) {
            classificationRef.current.scrollTop += e.deltaY;
            updateScrollThumb();
        }
    };

    // 更新滚动条拇指位置
    const updateScrollThumb = () => {
        if (classificationRef.current && scrollThumbRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = classificationRef.current;
            const thumbPosition = (scrollTop / (scrollHeight - clientHeight)) * 100;
            scrollThumbRef.current.style.top = `${thumbPosition}%`;
        }
    };

    // 添加事件监听器
    useEffect(() => {
        const container = classificationRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            container.addEventListener('scroll', updateScrollThumb);
            return () => {
                container.removeEventListener('wheel', handleWheel);
                container.removeEventListener('scroll', updateScrollThumb);
            };
        }
    }, []);

    return (
        <div className="Partitionbar">
            <div className="classification">
                {/** 这里实现滚动的区域，显示出来的图标 */}
                <div 
                    className="classification-icon-display" 
                    ref={classificationRef}
                >
                    {/** 这里实现分类区域 */}
                    {classificationicon.map((item) => (
                        <div className="classification-icon" key={item.id}>
                            <i className={item.icon}></i>
                            {/* 删除: <span>{item.name}</span> */}
                        </div>
                    ))}
                </div>
                {/** 添加滚动指示器 */}
                <div className="scroll-indicator">
                    <div 
                        className="scroll-indicator-thumb" 
                        ref={scrollThumbRef}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default Partitionbar;

