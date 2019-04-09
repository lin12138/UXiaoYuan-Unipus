# U校园-自动登录、去除环境检测  
  
项目地址  
GitHub:[https://github.com/Brush-JIM/UXiaoYuan-Unipus](https://github.com/Brush-JIM/UXiaoYuan-Unipus)  
Bitbucket:[https://bitbucket.org/Brush-JIM/uxiaoyuan-unipus/](https://bitbucket.org/Brush-JIM/uxiaoyuan-unipus/)  

* 去除环境检测的灵感来源于GreasyFork上面的[U校园环境检测屏蔽](https://greasyfork.org/zh-CN/scripts/380349-u校园环境检测屏蔽)  
  但是我试了没效果，不知道是不是我的打开方式不对……  
  于是写了个简单粗暴的方法，不是改style样式，而是直接删除  
  
# 食用方法
* 经过测试，脚本不适用Greasemonkey；我看了Greasemonkey的文档还是不知道怎么使用GM.* 函数，因为我使用文档的例子一样失败，有大神知道怎么用GM.setValue、GM.getValue、GM.deleteValue吗？  
* 安装Tampermonkey（推荐，脚本是在Tampermonkey下编写，使用正常）或Greasemonkey或Violentmonkey，安装方法在后面的“注意”标题  
* 访问  
    GitHub:[https://github.com/Brush-JIM/UXiaoYuan-Unipus/raw/master/U校园脚本.user.js](https://raw.githubusercontent.com/Brush-JIM/UXiaoYuan-Unipus/master/U校园脚本.user.js)  
    or  
    Bitbucket:[https://bitbucket.org/Brush-JIM/uxiaoyuan-unipus/src/master/U校园脚本.user.js](https://bitbucket.org/Brush-JIM/uxiaoyuan-unipus/src/master/U校园脚本.user.js)  
  安装脚本“U校园脚本.user.js”到Tampermonkey/Violentmonkey/Greasemonkey中  
  就完成了
# 注意
* 脚本依赖油猴实现  
  本人使用Google chrome 的 Tampermonkey  
  Google chrome请安装[Tampermonkey](https://tampermonkey.net/)或[Violentmonkey](https://violentmonkey.github.io/)  
  Firefox请安装[Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)或[Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)或[Violentmonkey](https://addons.mozilla.org/zh-CN/firefox/addon/violentmonkey/)  
  其他浏览器请看[https://greasyfork.org/zh-CN](https://greasyfork.org/zh-CN)  
* 理论上无论是Tampermonkey还是Violentmonkey抑或是Greasemonkey，脚本都是互通的，都可以用，只是理论上！请自行测试  
* 注意！脚本使用了Tampermonkey的GM_* 函数；而Greasemonkey中是使用GM.* 函数，但我没测试过，所以没有增加GM.* 函数。Greasemonkey下使用可能会有问题

# 日志
CHANGELOG.md [GitHub](https://github.com/Brush-JIM/UXiaoYuan-Unipus/blob/master/CHANGELOG.md) or [Bitbucket](https://bitbucket.org/Brush-JIM/uxiaoyuan-unipus/src/master/CHANGELOG.md?fileviewer=file-view-default)  

# 最后  
我读的专业不是编程方向的，纯靠兴趣爱好  
js没学过，技术纯属渣渣，刚好隔壁的 优学院JavaScript项目[GitHub](https://github.com/Brush-JIM/YouXueYuan-JavaScript)/[Bitbucket](https://bitbucket.org/Brush-JIM/youxueyuan-javascript/)提供了方法，所以还算容易😂  
所以出现问题请不要大喷  
  
---
代码开源、免费  
不接受任何捐赠  
