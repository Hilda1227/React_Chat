# 功能已实现

- [x] 私聊  

> 每个用户登录过后在数据库中记录其socket.id, 发送私聊时找出聊天对象的socket.id, 然后通过io.to(id).emit('new message', message) 发送私聊消息

- [x] 群聊  

> 以群组信息在数据库存储的\_id作为聊天房间id, 用户登录后，对其加入的所有群组执行socket.join(\_id)，便可接受到来自该房间的人发送的所有消息

- [x] 发送表情  

> 点击表情图片, 在输入框追加对应的字符串，渲染该消息时，用正则匹配出所有的表情字符串，替换为img标签

- [x] 上传文件

> 所有需要用到文件上传的接口处理方式都一致，将文件append到FormData对象中，传给后端，后端将文件上传到七牛云后返回一个文件地址url，然后将该url返回给前端或存储到数据库，后端使用koa-better-body中间件来解析前端参数

- [x] 创建群组

- [x] 加入群聊

- [x] 修改资料

# 待完成：

- [x] 禁言  

- [ ] 屏蔽消息

- [ ] 消息声音提示  

- [ ] 切换主题颜色

- [ ] 性能优化

# 问题记录

## 安全  

1. 用户密码采用bcrypt-nodejs模块进行加密
2. 用户登录成功后，采用jsonwebtoken生成token发送给客户端保存起来，客户端在以后的一些具有修改行为的请求中携带此token,服务端验证token是否合法，是则进行后续的处理，否则返回错误消息。
3. 防XSS注入，通过正则匹配，将html预留字符替换为对应的实体编码  


## webpack无法对组件里以相对路径引用的图片进行打包
解决办法：
1. 将图片设为背景，在css里引入图片，webpack可以正常打包
2. 将图片作为静态文件通过koa-static-server这个模块来将放到后端http服务上，前端通过url来引入图片
3. 通过require('...')，将图片作为一个模块来引入，webpack可以成功对其进行打包
## presentation component与container component的组织问题  


## 在一个点击事件中无法连续调用两次相互依赖的dispatch
> 原因：react的setState的执行是异步的  


## 刷新浏览器会自动掉线，丢失登录信息

> 解决办法: 用户每次手动登录之后，将token存在localStorage, 打开该应用时首先将token发送至服务器，看token是否合法，合法则查找数据库中是否存在该用户， 存在便取出用户信息，发送给客户端，并保存此时连接的socket.id，此时便自动重新登录成功，否则，若token不合法，便给客户端返回错误通知，使页面自动跳转到登录注册页面，等待用户重新手动登录  


## 往七牛云上传文件始终无法成功

> 原来只是参考了旧版的Node.js SDK说明文档，所以难怪反复的比对也找不出来啥错。。。类似react-router也是，总是参考了router3的文档，router4做的改变又比较大，一定要先找对文档= =  


## 如何在接受到新消息reducer调用结束的时候，紧接着调用RoomMsg组件内的方法，自动滚动到div底部，  

> 尝试了不能直接把这个组件export出去，
最终解决办法：给RoomMsg组件设置一个needScroll属性，利用componentWillReceiveProps和componentDidUpdate这两个生命周期钩子，在接收到新的props时进行判断，需要往下滚动时将needScroll设为true，在componentDidUpdate这个钩子中，如果needScroll为true时，调用scrollToBottom滚动到底部  


## 用forever布署的node的后台，有几个提供给前端的接口是上传文件到七牛云，刚布署上去之后是好的  可是过一会儿就传不上去了，重启这个服务又能恢复正常  

> 七牛云上传文件的接口中，options里面有一个expires字段，决定token有效时长，将它的值改得长一点就ok了

## 运行

### 环境
* mongodb
* node.js

```javascript
 git clone https://github.com/Hilda1227/React_Chat.git  // 克隆项目  
 cd React_Chat/server  // 进入后端文件目录
 npm install  // 安装依赖
 mongod --dbpath d:\data      // 开启数据库 d:\data 为数据库文件夹位置，可自行设置
 npm run start  // 运行服务
 cd React_Chat/client  // 另外打开一个命令窗口，进入前端文件目录
 npm install  // 安装依赖 
 npm run dev // 启动热加载
```
然后在浏览器打开localhost:3002即可












