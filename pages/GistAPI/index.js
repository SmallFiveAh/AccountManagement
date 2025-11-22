// GitHub Gist API 工具函数

/**
 * 更新指定的 Gist
 * @param {string} token - GitHub Personal Access Token
 * @param {string} gistId - Gist ID
 * @param {string} filename - 文件名
 * @param {object} content - 要上传的内容
 * @returns {Promise<object>} Gist 更新结果
 */
export async function updateGist(token, gistId, filename, content) {
  const response = await fetch(`https://api.github.com/gists/${gistId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      files: {
        [filename]: {
          content: typeof content === 'string' ? content : JSON.stringify(content, null, 2)
        }
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to update Gist: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * 同步账号数据到 Gist
 * @param {Array} accounts - 账号数据数组
 * @returns {Promise<void>}
 */
export async function syncToGist(accounts) {
  try {
    // 从 localStorage 获取 Gist 配置
    const gistConfig = JSON.parse(localStorage.getItem('accountTokenInfo') || '{}');
    console.log(gistConfig);
    
    const { token, gistFilename, gistId } = gistConfig;
    
    // 检查必要配置是否存在
    if (!token || !gistFilename || !gistId) {
      console.warn('Gist 配置不完整，跳过同步');
      return;
    }
    
    // 更新 Gist
    await updateGist(token, gistId, gistFilename, accounts);
    console.log('账号数据已成功同步到 Gist');
  } catch (error) {
    console.error('同步到 Gist 失败:', error);
    throw error;
  }
}