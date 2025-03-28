document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const saveBtn = document.getElementById('saveBtn');
  const statusDiv = document.getElementById('status');

  // 加载已保存的API密钥
  chrome.storage.sync.get(['deepseekApiKey'], (result) => {
    if (result.deepseekApiKey) {
      apiKeyInput.value = result.deepseekApiKey;
    }
  });

  saveBtn.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    chrome.storage.sync.set({ deepseekApiKey: apiKey }, () => {
      statusDiv.textContent = '设置已保存！';
      setTimeout(() => statusDiv.textContent = '', 2000);
    });
  });
});