import React, { useEffect } from 'react';

function App() {
  // 用户访问页面时，暗中加载追踪器
  useEffect(() => {
    // 方式1：隐藏的图片标签（传统追踪技术）
    const pixel = document.createElement('img');
    pixel.src = 'http://tracker.com:4001/track?page=home';
    pixel.style.display = 'none';
    document.body.appendChild(pixel);

    // 方式2：动态脚本加载（现代分析工具常用）
    const script = document.createElement('script');
    script.src = 'http://tracker.com:4001/analytics.js'; // 假设的第三方脚本
    document.head.appendChild(script);
  }, []);

  return (
    <div>
      <h1>欢迎来到电商网站（用户完全不知情）</h1>
      <p>这是一个普通的购物页面...</p>
      
      {/* 用户可能点击的内容 */}
      <button onClick={() => alert('购买按钮点击')}>限时抢购</button>
      
      {/* 隐藏的iframe技术（旧版追踪） */}
      <iframe 
        src="http://tracker.com:4001/track?page=home" 
        style={{ width: 0, height: 0, border: 0 }} 
        title="hidden-tracker"
      />
    </div>
  );
}

export default App;