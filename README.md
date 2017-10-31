# 问题记录

## 安全  

1. 用户密码采用bcrypt-nodejs模块进行加密
2. 用户登录成功后，采用jsonwebtoken生成token发送给客户端保存起来，客户端在以后的请求中携带此token,服务端验证token是否合法，是则进行后续的处理。