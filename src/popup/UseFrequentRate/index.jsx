import { useState, useEffect } from "react";
import './index.css';

function UseFrequentRate() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const defaultData = [
      { username: "斗鱼", usageCount: 9 },
      { username: "抖音", usageCount: 8 },
      { username: "优酷", usageCount: 7 },
      { username: "爱奇艺", usageCount: 6 },
      { username: "知乎", usageCount: 5 },
      { username: "Github", usageCount: 4 },
      { username: "华为", usageCount: 3 },
      { username: "小米", usageCount: 2 },
      { username: "云服务器", usageCount: 10 }
    ];

    // 按使用次数降序排序
    defaultData.sort((a, b) => b.usageCount - a.usageCount);

    // 计算字体大小和透明度的范围
    const maxCount = defaultData[0].usageCount;
    const minCount = defaultData[defaultData.length - 1].usageCount;
    
    // 字体大小范围（单位：px）
    const minFontSize = 5;
    const maxFontSize = 10;
    
    // 透明度范围（用于颜色）
    const minOpacity = 0.6;
    const maxOpacity = 1;

    // 处理数据，为每个用户计算样式
    const processedTags = defaultData.map((user, index) => {
      const rank = index + 1;
      
      // 根据使用次数计算字体大小（线性插值）
      const fontSize = minFontSize + (maxFontSize - minFontSize) * 
                      ((user.usageCount - minCount) / (maxCount - minCount));
      
      // 根据排名计算透明度
      const opacity = minOpacity + (maxOpacity - minOpacity) * 
                    (1 - index / defaultData.length);
      
      // 使用HSL颜色模式，根据排名调整色相
      const hue = (rank * 30) % 360; // 色相值在0-360之间变化
      const backgroundColor = `hsla(${hue}, 70%, 55%, ${opacity})`;
      const color = opacity > 0.7 ? '#fff' : '#333'; // 根据背景色深度调整文字颜色
      
      return {
        ...user,
        rank,
        fontSize,
        opacity,
        backgroundColor,
        color
      };
    });

    setTags(processedTags);
  }, []);

  const handleTagClick = (user) => {
    alert(`${user.username}\n使用次数: ${user.usageCount}\n排名: #${user.rank}`);
  };

  return (
    <div className="use-frequent-rate"> 
      <div className="tag-cloud" id="tagCloud">
        {tags.map((tag) => (
          <div 
            key={tag.username}
            className="tag"
            data-rank={tag.rank}
            data-count={tag.usageCount}
            style={{
              fontSize: `${tag.fontSize}px`,
              backgroundColor: tag.backgroundColor,
              color: tag.color
            }}
            onClick={() => handleTagClick(tag)}
          >
            {tag.username}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UseFrequentRate;