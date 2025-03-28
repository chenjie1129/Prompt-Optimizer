document.addEventListener('DOMContentLoaded', () => {
  const inputText = document.getElementById('inputText');
  const optimizeBtn = document.getElementById('optimizeBtn');
  const outputText = document.getElementById('outputText');
  const copyBtn = document.getElementById('copyBtn');
  const outputSection = document.querySelector('.output-section');

  optimizeBtn.addEventListener('click', async () => {
    const prompt = inputText.value.trim();
    if (!prompt) {
      outputText.innerHTML = '请输入提示词内容';
      outputSection.style.display = 'block';
      return;
    }
    
    optimizeBtn.disabled = true;
    optimizeBtn.textContent = '优化中...';
    outputText.innerHTML = `
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <div class="loading-text">正在优化中...</div>
      </div>
    `;
    outputSection.style.display = 'block';
    
    try {
      const result = await PromptAPI.optimizePrompt(prompt);
      outputText.innerHTML = result.replace(/\n/g, '<br>');
    } catch (error) {
      outputText.innerHTML = `优化失败: ${error.message}`;
    } finally {
      optimizeBtn.disabled = false;
      optimizeBtn.textContent = '优化';
    }
  });

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(outputText.innerText);
  });
});