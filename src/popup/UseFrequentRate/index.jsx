import { useState, useEffect } from "react";
import './index.css';

function UseFrequentRate() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // 获取本地存储的数据
    const accountsData = localStorage.getItem('accounts');
    let accounts = [];
    
    if (accountsData) {
      try {
        accounts = JSON.parse(accountsData);
      } catch (e) {
        console.error("解析accounts数据失败", e);
      }
    }

    // 如果没有本地数据，则不显示任何内容
    if (!accounts || accounts.length === 0) {
      return;
    }

    // 按使用次数降序排序，最多只取前11个
    accounts.sort((a, b) => b.usageCount - a.usageCount);
    const topAccounts = accounts.slice(0, 11);

    // 计算字体大小和透明度的范围
    const maxCount = topAccounts[0]?.usageCount || 1;
    const minCount = topAccounts[topAccounts.length - 1]?.usageCount || 1;
    
    // 字体大小范围（单位：px）
    const minFontSize = 7;
    const maxFontSize = 12;
    
    // 透明度范围（用于颜色）
    const minOpacity = 0.6;
    const maxOpacity = 1;

    // 处理数据，为每个用户计算样式
    const processedTags = topAccounts.map((user, index) => {
      const rank = index + 1;
      
      // 根据使用次数计算字体大小（线性插值）
      const fontSize = minFontSize + (maxFontSize - minFontSize) * 
                      ((user.usageCount - minCount) / Math.max(1, maxCount - minCount));
      
      // 根据排名计算透明度
      const opacity = minOpacity + (maxOpacity - minOpacity) * 
                    (1 - index / topAccounts.length);
      
      // 使用HSL颜色模式，根据排名调整色相
      const hue = (rank * 30) % 360; // 色相值在0-360之间变化
      const backgroundColor = `hsla(${hue}, 70%, 55%, ${opacity})`;
      const color = opacity > 0.7 ? '#fff' : '#333'; // 根据背景色深度调整文字颜色
      
      // 使用更稳定的唯一标识符
      const uniqueId = user.email || user.username ? 
        `${user.username || ''}-${user.email || ''}-${index}` : 
        `${index}-${user.usageCount}`;
      
      return {
        ...user,
        id: uniqueId,
        rank,
        fontSize,
        opacity,
        backgroundColor,
        color
      };
    });

    setTags(processedTags);
  }, []);

  // 如果没有标签数据，则不渲染任何内容
  if (tags.length === 0) {
    return null;
  }

  const handleTagClick = (user) => {
    alert(`${user.name}\n使用次数: ${user.usageCount}\n排名: #${user.rank}`);
  };

  return (
    <div className="use-frequent-rate"> 
      <div className="tag-cloud" id="tagCloud">
        {tags.map((tag) => (
          <div 
            key={tag.id}
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
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UseFrequentRate;