```mermaid
sequenceDiagram
  actor user as 用户
  participant bank as 银行网站
  participant hack as 黑客网站
  Note over user,bank: 正常流程，首次访问生成 Cookie
  user->>bank: 访问银行网站
  bank->>user: 返回登录页面
  user->>bank: 输入用户名和密码
  bank->>user: 登录成功
  %% 访问黑客网站%%
  Note over user,hack: 访问恶意网站
  user->>hack: 访问黑客网站
  hack ->> user: 返回攻击内容
    Note over user,hack: 攻击内容：诱导点击链接/隐藏表单提交/JS静默请求
  user->>bank: 点击链接/提交表单/执行JS！！！
  bank->>user: 意外转账成功！😭😭😭
```
