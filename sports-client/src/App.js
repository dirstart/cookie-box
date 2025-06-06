import React, { useEffect } from 'react';

function App() {
  // 模拟用户交互，在购买的时候，发送给【广告联盟】
  const handleCheckout = () => {
    // 【时机1.用户交互时】暗中发送购买事件
    new Image().src = 'http://ads.com:8001/track?action=purchase';
    alert('感谢购买！');
  };

  // 【时机2.加载完成后】页面加载时暗中追踪
  useEffect(() => {
    // 方法1：像素追踪
    const pixel = new Image();
    pixel.src = 'http://ads.com:8001/track?page=home';

    // 方法2：延迟加载脚本
    setTimeout(() => {
      const script = document.createElement('script');
      script.src = 'http://ads.com:8001/track?load=analytics';
      document.body.appendChild(script);
    }, 3000);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>欢迎来到「不知情」体育网站</h1>
      <button onClick={handleCheckout}>立即购买</button>

      {/* 时机3.直接在加载的时候 */}
      {/* 隐藏的第三方内容 */}
      <div style={{ height: 0, overflow: 'hidden' }}>
        <iframe
          src="http://ads.com:8001/track?embed=1"
          title="hidden-tracker"
        />
      </div>
    </div>
  );
}

export default App;
