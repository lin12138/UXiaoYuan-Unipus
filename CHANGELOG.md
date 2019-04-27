# 日志  

## 19.4.27 V1.2
* 改变自动登录方式，不再增加“自动登录”按钮，直接改变原登录按钮，点击后以后可自动登录
* 写入localStorage，去除侧边栏的版本说明提示
* 写入session，理论上这是最接近源头来关闭环境检测（从源头解决还没这个能力），取消原用来删除环境检测窗口的代码

## 19.4.23 V1.0
* 支持Greasemonkey
* 增加关闭“长时间未操作”窗口
* 增加关闭其他窗口
* 重构脚本

## 19.4.6
* 改善自动登录代码，增加取消自动登录功能，增加删除登录信息，增加删除环境检测菜单栏  
* 注意！脚本使用了Tampermonkey的GM_setValue、 GM_getValue、GM_deleteValue；而Greasemonkey中是使用GM.setValue、GM.getValue、GM.deleteValue，但我没测试过，所以没有增加GM.setValue、GM.getValue、GM.deleteValue。所以Greasemonkey下使用可能会有问题

## 19.4.5
* 重新上传项目  

## 19.3.31 V0.2
* 增加自动登录功能  
* 该功能只在Google chrome 的 Tampermonkey测试成功，其他浏览器及Greasemonkey和Violentmonkey未测试过  

## 19.3.26 V0.1
* 上传第一份  
* 灵感来源于GreasyFork上面的[U校园环境检测屏蔽](https://greasyfork.org/zh-CN/scripts/380349-u校园环境检测屏蔽)  
  但是我试了没效果，不知道是不是我的打开方式不对……  
  于是写了个简单粗暴的方法，不是改style样式，而是直接删除  
