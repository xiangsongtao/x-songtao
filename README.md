X-SONGTAO Blog项目
===

项目起源
---

15年底的时候参加过极客学院前端培训,这个博客项目是为毕设准备的。按照三个月的学习进度写一个前端、后端、设计、api设计融合为一体的项目是有些难的,不过毕设也放低了门槛,只要能在老师的电脑上能运行交互就好，第一版交付前我也在阿里云跑过，当时界面效果还好，中规中矩。前台页面和后台页面是两个spa，虽然后台页面用户是看不到的，自我认为还是不够简洁。所以这一版我将后台页面和前台页面融合到了一个spa中。参观者账号在下面，如果登陆后，就能在左下角看到管理者的页面进入按钮了。是不是要简介方便一些？

另外第二版关于文章编辑我使用的是Markdown编辑器，并附带预览功能。另外还有代码高亮，方便观察最终呈现的效果。

项目第二版重写了60%的代码，至于为什么不用成熟的博客框架而自己写一个是因为我想练练手，将现在已掌握的技术用在博客中，在博客构建时也能遇到工作中遇不到的问题，另外再检查自己技术上的不足。与此同时，开博后希望自己每周至少一篇博文总结。

**目前X-SONGTAO已上线，访问地址：[X-SONGTAO](http://xiangsongtao.com)**

> 题外话: 问题能找到解决办法都不算难，希望在技术路上的你能沉着分析问题并面对各种挑战！


项目结构
---
```
|-app  					//后台代码
|----config  			//数据库配置文件
|----controllers  		//api路由请求处理文件
|----routers  			//页面及API访问路由文件
|----utils  			//通用工具类文件
|----views  			//页面模板文件（当前只有错误页面的，首页会转向public/web/index.html下）
|-bin  					//nodejs启动文件
|-public  				//静态资源文件  
|----uploads  			//上传文件夹
|----web  				//前台代码-spa设计目标文件
|----web_design  		//前台代码-spa设计源文件
|--------css  			//样式表
|--------fonts  		//字体
|--------img  			//图片
|--------js  			//公共js文件
|--------lib  			//js库文件
|--------views  		//spa的tpl+controllers+routers（前后台页面分别存放）
|-app.js  
|-package.json  
```

项目框架
---

X-SONGTAO使用的是MEAN框架（Mongodb+Express+Angular+Nodejs），这个是四种技术的组合。就我现在的能力也只掌握了40%，但是已经足够开发X-SONGTAO项目了。另外，因为Nodejs使用的是6.0.0+版本，因此后台我也是用了部分ES6语法。前台使用了babel的核心库（ES6的语法糖部分）。与此同时，前台代码压缩合并打码都已做到位，具体可以参考public/web_design/gulpfile.babel.js文件。


项目如何启动
---

这里主要讲述如何在你的本地启动X-SONGTAO项目。在本机开发的过程中遇到的问题真的很少，但是一部署到服务器，问题就出来了：域名解析、Nginx设置、FTP设置、Nodejs/Mongodb安装、数据库配置连接等问题接踵而至，不过这些问题分析下都能在网上找到解决办法，不算难。到目前为止，遇到的问题就都自己解决了，虽然多花点时间，也需要总结下，希望以后再遇到这类问题能再少花点时间！

#### 环境配置

1. CentOS x64操作系统；
2. Nodejs(6.0.0+)/npm/Mongodb安装(自行google)；
3. pm2（项目启动管理）、n（Nodejs版本管理）安装；
4. 进入项目根根目录执行`npm install` ,安装各种npm的module；
5. 进入app/config/config.js修改数据库配置信息
6. 进入public/web/config.js修改web的配置信息，详情如下：
	- url: API访问根目录（http://xiangsongtao.com）
	- MY_INFO_ID: 我的个人资料的_id(个人博客嘛，后面讲解如何获取)
	- MY: 我的信息，主要使用在评论回复上显示
	- EMAIL: 我的邮箱，主要使用在评论回复上显示
7. 注册个人信息  
	因为博客针对个人，所以这个注册的页面是没有制作的，但是接口是存在的，这个可以参考API文档，我在实现API接口及测试都是使用Postman进行的。
	
	> 注册成功后会返回注册用户的_id, 此 _id就是上面说到的MY_INFO_ID，请保管好。
	
	**发送的请求参数如下：**
	
	```
	url:/api/register
	header:Content-Type   application/json; charset=utf-8
	{
    	"username": "登录用户名",
    	"password": "密码",
    	"is_admin":true,	//是否是admin用户
    	"full_name":"昵称",
    	"position":"你的职位",
    	"address":"你的地址",
    	"motto":"你的心情",
    	"personal_state":"你的自我介绍",
    	"img_url":"http://你的头像地址"
	}
	```
	
	**成功的返回结果如下：** 
	
	```
	{
  		"code": "1",
  		"msg": "user added and login success!",
  		"token": "a2FhY2hhMTIyfDEyM3wxNDY4MjA3MzE3MzAx",
  		"data": {
    		"username": "登录用户名",
    		"password": "密码",
    		"is_admin":true,
    		"full_name": "昵称",
    		"position": "你的职位",
    		"address": "你的地址",
    		"motto": "你的心情",
    		"personal_state": "你的自我介绍",
    		"img_url": "http://你的头像地址",
    		"_id": "用户_id",
    		"login_info": [
      		{
        		"login_time": "登录时间",
        		"login_ip":"登录ip",
        		"_id": "_id"
      		}//该账号登录记录
    		]
  		}
	}
	```

	


8. public/web目录是最终生成好的spa目录，如果希望对X-SONGTAO进行二次修改，请在web_design进行操作，操作之前，也请安装好web_design目录下的package.json中的各类依赖。项目Gulp文为gulpfile.babel.js，执行DEVELOPMENT任务，新生成的文件放置到web目录下。


#### 启动


- 进入X-SONGTAO文件夹，输入`node ./bin/www`,访问localhost:8080就能访问到项目。
- 也可以使用pm2启动：`pm2 start /x-songtao/bin/www -n x-songtao -i max;pm2 logs`,顺便监听启动时log日志。



参观者账号
---


> 目前参观者账号能浏览整个网站的内容，但是不可以做增删改的操作


```
username:visitor
password:visitor
```




需求文档
---


因为是我自己的博客，主要是展示自己的成长记录所以包含以下模块：

```
|----前台页面---- 
|-index  		//展示自己的签名			
|-博客  
|-----最近更新	//最近更新的10篇文章，文章可点击浏览，且能评论（评论需要admin的审核）
|-----时光机		//按照年到月的排序，点击文章标题能浏览具体文章
|-----标签库		//标签根据类别分类，点击标签能找到相同标签的文章列表
|-图片墙（未开发）//以轮播的形式按照主题分类，点击主题能浏览内部全部照片
|-登录			//token写入，评论基本信息写入
|----后台页面----  			
|-我的信息		//修改我的信息，包含头像 
|-我的标签  		//标签的增删改查			
|-我的文章		//文章列表的增删改查，文章编辑使用markdown，并能实时预览
|-我的评论		//评论的增删改查，包含回复、审核、删除等操作
|-我的图片（未开发）
|-退出			//清空个人信息
|---------------  
```

未开发的部分会之后进行，放在第三期。



API接口文档（前方高能误入）
---


### 前提说明

首先，所有的api请求都会都会进行权限验证，目前对以下五种请求及路径会直接通过：

```
GET、/register、/login、/imgupload、POST-/comment
```

**为了防止请求失败，发起请求前，请在head中添加token信息，格式如下：**


|      key      |       value     |
| ------------- | --------------- |
| authorization | token {{token}} | 


### 补充说明 

- 具体的API请参考目录：app/routes/api.routes.js文件。  
- mongodb表结构请参考目录：app/config/mongoose.js文件。 


### API参数通用格式说明

	
- code：1-成功；2~5-失败；8-数据库查找错误；9-非admin用户；10-token错误或超时（（Token 2h内有效）; 
- msg: 服务器返回接口信息;
- token: 修改数据的接口权限令牌，只有在head中携带此token才能访问特定API（只在注册和登录返回）
- data: 服务器返回数据
	

	
	


### User接口相关

- 注册接口

```
method: post
url:/api/register
data:
{
    "username": "username",
    "password": "password",
    "is_admin":"true",
    "full_name":"X-SONGTAO",
    "position":"前端工程师&&Nodejs",
    "address":"江苏-苏州",
    "motto":"全栈工程师薪水如何？没15k我不考虑。",
    "personal_state":"各位好，我是X-SONGTAO！",
    "img_url":"http://your.head.img"
}
resopnse:
{
  "code": "1",
  "msg": "user added and login success!",
  "token": "token",
  "data": {
    "username": "username",
    "password": "password",
    "is_admin": true,
    "full_name": "X-SONGTAO",
    "position": "前端工程师&&Nodejs",
    "address": "江苏-苏州",
    "motto": "全栈工程师薪水如何？没15k我不考虑。",
    "personal_state": "各位好，我是X-SONGTAO！",
    "img_url": "http://your.head.img",
    "_id": "_id",
    "login_info": [
      {
        "login_time": "login_time",
        "login_ip": "login_ip",
        "_id": "_id"
      }
    ]
  }
}
resopnse code:
1-success;
2=username already exist;
```

- 登录接口

```
method: post
url:/api/login
data:
{
    "username": "username",
    "password": "password"
}
resopnse:
{
  "code": "1",
  "msg": "login success! please use token to access!",
  "token": "token"
}
resopnse code:
1-success;
2=username or password error;
```

- 密码修改接口

```
method: post
url:/api/change_password
data:
{
    "_id": "_id",
    "username": "username",
    "password": "password",
    "new_password": "new_password"
}
resopnse:
{
  "code": "1",
  "msg": "user password change success, you should re-login!"
}
resopnse code:
1-success;
2=psw not right;
3=user non-exist;
```

- 获取全部user信息接口

```
method: get
url:/api/users
resopnse:
{
  "code": "1",
  "msg": "user list",
  "data": [
    {
      "position": "position",
      "address": "address",
      "motto": "motto",
      "img_url": "img_url",
      "personal_state": "personal_state",
      "full_name": "full_name"
    }
 ]
}
resopnse code:
1-success;
```


- 获取某个user信息接口（前台需要）

```
method: get
url:/api/users/id
resopnse:
{
  "code": "1",
  "msg": "user info",
  "data": {
      "position": "position",
      "address": "address",
      "motto": "motto",
      "img_url": "img_url",
      "personal_state": "personal_state",//原始格式 HTML
      "full_name": "full_name"
  }
}
resopnse code:
1-success;
2=user non-exist;
```

- 获取某个user信息接口（后台需要）

```
method: get
url:/api/users/original/id
resopnse:
{
  "code": "1",
  "msg": "user info",
  "data": {
      "position": "position",
      "address": "address",
      "motto": "motto",
      "img_url": "img_url",
      "personal_state": "personal_state",//原始格式 Markdown
      "full_name": "full_name"
  }
}
resopnse code:
1-success;
2=user non-exist;
```

- 修改信息接口

```
method: put
url:/api/user
data:
{
    "_id":"_id",
    "full_name":"full_name",
    "position":"position",
    "is_admin":true,
    "address":"address",
    "motto":"motto",
    "personal_state":"personal_state",//Markdown 格式
    "img_url":"img_url"
}
resopnse:
{
  "code": "1",
  "msg": "user update success!"
}
resopnse code:
1-success;
2=user non-exist;
```

- 删除某个user信息接口

```
method: delete
url:/api/users/id
resopnse:
{
  "code": "1",
  "msg": "user info",
  "data": {
		"code": "1",
        "msg":"user ${_id} delete success!"
  }
}
resopnse code:
1-success;
```



### Tags接口相关

- 获取全部Tags信息接口（用于后台列表查看）

```
method: get
url:/api/tags
resopnse:
{
  "code": "1",
  "msg": "find tag all success!",
  "data": [
    {
      "_id": "_id",
      "name": "name",
      "catalogue_name": "catalogue_name",
      "create_time": "create_time",
      "used_num": 0
    }
  ]
}
resopnse code:
1-success;
```

- 获取全部Tags信息接口（具有特殊数据结构，用于前台标签库）

```
method: get
url:/api/tags_with_structure
resopnse:
{
  "code": "1",
  "msg": "find tag all success!",
  "data": [
    {
      "name": "cataName",
      "data": [
        {
          "_id": "_id",
          "name": "name",
          "catalogue_name": "catalogue_name",
          "create_time": "create_time",
          "used_num": 0
        }
      ]
    }
  ]
}
resopnse code:
1-success;
```


- 获取某个Tags信息接口

```
method: get
url:/api/tag/id
resopnse:
{
  "code": "1",
  "msg": "tag find success!",
  "data": {
    "_id": "_id",
    "name": "name",
    "catalogue_name": "catalogue_name",
    "create_time": "create_time",
    "used_num": 0
  }
}
resopnse code:
1-success;
```

- 新增Tags信息接口

```
method: post
url:/api/tag
data:
{
    "name":"name",
    "catalogue_name":"catalogue_name"
}
resopnse:
{
  "code": "1",
  "msg": "tags add success!",
  "data": {
    "name": "name",
    "catalogue_name": "catalogue_name",
    "used_num": 0,
    "create_time": "create_time",
    "_id": "5783382ac84cf4861527386e"
  }
}
resopnse code:
1-success;
2-tag already exist;
```


- 修改Tags信息接口

```
method: put
url:/api/tag
data:
{
    "_id":"_id",
    "name":"name",
    "catalogue_name":"catalogue_name"
}
resopnse:
{
  "code": "1",
  "msg": "tag edit success!",
  "data": {
    "_id": "_id",
    "name": "name",
    "catalogue_name": "catalogue_name",
    "create_time": "create_time",
    "used_num": 0
  }
}
resopnse code:
1-success;
2-tag non-exist or params error;
3-tag name exist, please use another one!;
```


- 删除某个Tag接口

```
method: delete
url:/api/tag/id
resopnse:
{
  "code": "1",
  "msg": "tag delete success!"
}
resopnse code:
1-success;
```


### Articles接口相关

- 获取全部Articles信息接口（后台页面需要）

```
method: get
url:/api/articles
resopnse:
{
  "code": "1",
  "msg": "article list get success!",
  "data": [
    {
      "_id": "_id",
      "title": "title",
      "publish_time": "publish_time",
      "read_num": 26,
      "comment_num": 4,
      "state": true,
      "tags": []//标签列表
    }
  ]
}
resopnse code:
1-success;
```


- 获取全部Articles信息接口，具有分页restful（前台-最近更新）

```
method: get
url:/api/articles/from_to
resopnse:
{
  "code": "1",
  "msg": "article list get success!",
  "data": [
    {
      "_id": "_id",
      "title": "title",
      "publish_time": "publish_time",
      "read_num": 26,
      "comment_num": 4,
      "state": true,
      "content": "content",//这里为纯文本摘要模式
      "tags": []//标签列表
    }
  ]
}
resopnse code:
1-success;
```

- 获取某个Article的信息接口（具体文章，前台文章展示）

```
method: get
url:/api/article/id
resopnse:
{
  "code": "1",
  "msg": "get aurticle success! but get comment need other request to {{url}}/api/article/comments/:id",
  "data": {
    "_id": "_id",
    "title": "title",
    "publish_time": "publish_time",
    "read_num": 29,
    "comment_num": 4,
    "state": true,
    "content": "<p>content</p>\n",//HTML格式
    "tags": []
  }
}
resopnse code:
1-success;
2-article non-exist!;
```


- 获取某个Article的信息接口（文章源码，后台文章修改）

```
method: get
url:/api/article/raw/id
resopnse:
{
  "code": "1",
  "msg": "get aurticle success! but get comment need other request to {{url}}/api/article/comments/:id",
  "data": {
    "_id": "_id",
    "title": "title",
    "publish_time": "publish_time",
    "read_num": 29,
    "comment_num": 4,
    "state": true,
    "content": "content",//Markdown格式
    "tags": []
  }
}
resopnse code:
1-success;
2-article non-exist!;
```


- 删除某个文章接口

```
method: delete
url:/api/article/id
resopnse:
{
  "code": "1",
  "msg": "article delete success!"
}
resopnse code:
1-success;
2-article non-exist!;
```


- 文章修改新增接口

```
method: post
url:/api/article
data:
{
    "title": "title", 
    "publish_time": publish_time,
    "read_num": 0,
    "comment_num": 0,
    "tags": ["_id","_id","_id"],
    "state": true,
    "content": "content"//Markdown源码
}
resopnse:
{
  "code": "1",
  "msg": "article add/edit success!"
}
resopnse code:
1-success;
2-article non-exist!;
```

- 获取文章历史记录(这部分用在-时光机页面)

```
method: get
url:/api/article_history
resopnse:
{
  "code": "1",
  "msg": "article history find success!",
  "data": [
    {
      "year": 2016,
      "data": [
        {
          "month": 7,
          "data": [
            {
              "_id": "_id",
              "title": "title",
              "publish_time": "publish_time",
              "read_num": 29,
              "comment_num": 4,
              "state": true
            }
          ]
        }
      ]
    },
    {
      "year": 2013,
      "data": [
        {
          "month": 4,
          "data": [
            {
              "_id": "_id",
              "title": "title",
              "publish_time": "publish_time",
              "read_num": 29,
              "comment_num": 4,
              "state": true
            },
            {
              "_id": "_id",
              "title": "title",
              "publish_time": "publish_time",
              "read_num": 29,
              "comment_num": 4,
              "state": true
            }
          ]
        }
      ]
    }
  ]
}
resopnse code:
1-success;
```


- 根据tag id查找文章列表(这部分用在-标签库)

```
method: get
url:/api/article_tag/id
resopnse:
{
  "code": "1",
  "msg": "find article by tag_id success!",
  "data": []
}
resopnse code:
1-success;
```


### Comments接口相关

- 获取全部Comments信息接口

```
method: get
url:/api/comments
resopnse:
{
  "code": "1",
  "msg": "comments list",
  "data": [
    {
      "_id": "_id",
      "article_id": "article_id",
      "pre_id": "pre_id",
      "name": "我",
      "email": "280304286@163.com",
      "time": "time",
      "content": "content",
      "isIReplied": true,
      "state": true,
      "next_id": []
    }
  ]
}
resopnse code:
1-success;
```


- 增加comment的接口

```
method: post
url:/api/comment
data:
{
    "article_id": "article_id",
    "pre_id": "pre_id", 
    "next_id": [],
    "name": "name",
    "email": "email@email.com",
    "time": "time",
    "content": "content",
    "ip": "ip",
    "isIReplied":false,
    "state": false
}
resopnse:
{
  "code": "1",
  "msg": "comment create success!",
  "data": {
    "article_id": "article_id",
    "pre_id": "pre_id", 
    "next_id": [],
    "name": "name",
    "email": "email@email.com",
    "time": "time",
    "content": "content",
    "ip": "ip",
    "isIReplied":false,
    "state": false
    "_id": "_id",
  }
}
resopnse code:
1-success;
2-article non-exist;
```

- 根据文章id查询其评论的数组

```
method: get
url:/api/article/comments/:article_id
resopnse:
{
  "code": "1",
  "msg": "comment to articles list get success!",
  "data": [{
    "article_id": "article_id",
    "pre_id": "pre_id", 
    "next_id": [],
    "name": "name",
    "email": "email@email.com",
    "time": "time",
    "content": "content",
    "ip": "ip",
    "isIReplied":false,
    "state": false
    "_id": "_id",
      "next_id": [
        {
          "_id": "_id",
          "article_id": "article_id",
          "pre_id": "pre_id",
          "name": "我",
          "email": "280304286@163.com",
          "time": "time",
          "content": "content",
          "isIReplied": true,
          "state": true,
          "next_id": []
        }
      ]
  }
}
resopnse code:
1-success;
2-article non-exist;
```

- 删除评论

```
method: delete
url:/api/comment/:id
resopnse:
{
  "code": "1",
  "msg": "delete success, comment_num && pre_comment has removed!"
}
resopnse code:
1-success;
2-comment non-exist;
```


- 修改评论状态（审核、未审核）

```
method: post
url:/api/changeCommentAuthState
data:
{
    "_id": "_id"
}
resopnse:
{
  "code": "1",
  "msg": "comment state change success!"
}
resopnse code:
1-success;
2-comment non-exist;
```

- 修改admin对评论的回复状态（我是否回复）

```
method: post
url:/api/changeCommentReplyState
data:
{
    "_id": "_id"
}
resopnse:
{
  "code": "1",
  "msg": "comment isIReplied change success!"
}
resopnse code:
1-success;
2-comment non-exist;
```

- 后台展示评论列表，包含评论文章的title

```
method: get
url:/api/commentToArticleList
resopnse:
{
  "code": "1",
  "msg": "comment to articles list get success!",
  "data": [
    {
      "_id": "_id",
      "article_id": {
        "_id": "_id",
        "title": "title"
      },
      "pre_id": "pre_id",
      "name": "name",
      "email": "email@163.com",
      "time": "time",
      "content": "content",
      "isIReplied": true,
      "state": true,
      "next_id": []
   }
 ]
}
resopnse code:
1-success;
```

尚未完成部分
---

- 多浏览器兼容测试（已完成）
- 手机屏的响应式样式修改（已完成）


参考文档
===

- [MongooseAPI参考手册](http://www.nodeclass.com/api/mongoose.html)
- [Mongoose的Population连表操作](http://www.tuicool.com/articles/73UBRb6)
- [Angular1.3文档](https://code.angularjs.org/1.3.0-beta.11/docs/api)
- [Express 4.x API手册](http://www.expressjs.com.cn/4x/api.html)
- [Markdown转码工具](https://www.npmjs.com/package/marked)
- [代码高亮工具](https://highlightjs.org)