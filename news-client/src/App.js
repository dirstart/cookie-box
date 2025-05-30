import React, { useEffect } from 'react';

function App() {
  // 模拟用户交互，在购买的时候，发送给【广告联盟】
  const handleCheckout = () => {
    // 【时机1.用户交互时】暗中发送购买事件
    const x = new Image();
    x.src = 'https://ads.com:8001/track?action=purchase';
    x.crossOrigin = 'use-credentials'; // 允许跨域 Cookie
    alert('感谢购买！');
  };

  // 【时机2.加载完成后】页面加载时暗中追踪
  useEffect(() => {
    // 方法1：像素追踪
    const pixel = new Image();
    pixel.src = 'https://ads.com:8001/track?page=home';
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>欢迎来到「不知情」电商网站</h1>
      <button onClick={handleCheckout}>立即购买</button>
    </div>
  );
}

export default App;
