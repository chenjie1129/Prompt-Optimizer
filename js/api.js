class PromptAPI {
  static async optimizePrompt(prompt) {
    return new Promise(async (resolve) => {
      // 修改错误处理部分
      try {
        const { deepseekApiKey } = await chrome.storage.sync.get(['deepseekApiKey']);
        
        if (!deepseekApiKey) {
          resolve('⚠️ 请先在设置中配置API密钥');
          return;
        }

        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${deepseekApiKey}`
          },
          body: JSON.stringify({
            model: "deepseek-chat",  // 修改为正确的模型名称
            messages: [{
              role: "user",
              content: `请优化以下提示词，使其更清晰有效：\n\n${prompt}\n\n请返回优化后的版本，并简要说明优化点。`
            }],
            temperature: 0.7,
            max_tokens: 2000
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'API请求失败');
        }

        const data = await response.json();
        const optimized = data.choices?.[0]?.message?.content || '未收到有效响应';
        resolve(optimized);
        
      } catch (error) {
        console.error('API调用失败:', error);
        resolve(`❌ 请求失败: ${error.message}\n\n请检查:\n1. API密钥是否正确\n2. 模型名称是否有效\n3. 网络连接是否正常`);
      }
    });
  }
}