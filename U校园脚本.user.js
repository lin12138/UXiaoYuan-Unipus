// ==UserScript==
// @name         U校园脚本
// @namespace    https://github.com/Brush-JIM/UXiaoYuan-Unipus
// @version      0.3
// @description  自动登录、去除U校园环境检测 项目地址：GitHub：https://github.com/Brush-JIM/UXiaoYuan-Unipus 或者Bitbucket：https://bitbucket.org/Brush-JIM/uxiaoyuan-unipus/
// @author       Brush-JIM
// @match        https://u.unipus.cn/user/student*
// @match        https://sso.unipus.cn/sso/login*
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @run-at       document-idle
// @icon         https://u.unipus.cn/favicon.ico
// ==/UserScript==

(function() {
    'use strict';
    //正则匹配URL
    if (window.location.href.search("https://sso.unipus.cn/sso/login") != -1)
    {
        //下面一行用来删除判断自动登录，若想取消自动登录，请将改行最前面的“//”去掉，保存脚本，刷新页面即可。然后再加回“//”，否则每次访问都会询问是否自动登录
        //GM_deleteValue('auto_login');
        if (window.location.href.search("&service=null") != -1)
        {
            GM_setValue('auto_login', true);
        }
        else
        {
            var auto_login;
            auto_login = GM_getValue('auto_login');
            console.log(auto_login);
            if (auto_login != false && auto_login != true)
            {
                auto_login = confirm("是否需要自动登录？");
                if (auto_login == true)
                {
                    GM_setValue('auto_login', true);
                }
                else
                {
                    GM_setValue('auto_login', false);
                    var a = document.createElement("a");
                    a.setAttribute("href", window.location.href + "&service=null");
                    a.innerHTML='需要自动登录？点这里！';
                    document.querySelector("div[class='checkbox']").appendChild(a);
                }
            }
            else if (auto_login == false)
            {
                a = document.createElement("a");
                a.setAttribute("href", window.location.href + "&service=null");
                a.innerHTML='需要自动登录？点这里！';
                document.querySelector("div[class='checkbox']").appendChild(a);
            }
        }
    }
    if (window.location.href.search("https://sso.unipus.cn/sso/login") != -1 && GM_getValue('auto_login') == true)
    {
        var username = GM_getValue('username');
        var password = GM_getValue('password');
        if (username == null || password == null || username == '' || password == '')
        {
            username = prompt("请输入账号");
            password = prompt("请输入密码");
            if (username == null || username == '' || password == null || password == '')
            {
                alert("账号或密码为空！");
            }
            else
            {
                document.querySelector("input[name='username']").value = username;
                document.querySelector("input[name='password']").value = password;
                GM_setValue('username', username);
                GM_setValue('password', password);
                document.querySelector("button[id='login']").click();
            }
            let count = 6
            let intervalKey = setInterval(() => {
                if (document.querySelector("div[class='layui-layer-content']") != null)
                {
                    alert('账号或密码错误！');
                    GM_setValue('username', null);
                    GM_setValue('password', null);
                    clearInterval(intervalKey);
                }
                if (--count === 0)
                {
                    clearInterval(intervalKey);
                };
            }, 1 * 1e3);
        }
        else
        {
            document.querySelector("input[name='username']").value = username;
            document.querySelector("input[name='password']").value = password;
            document.querySelector("button[id='login']").click();
            let count = 6
            let intervalKey = setInterval(() => {
                if (document.querySelector("div[class='layui-layer-content']") != null)
                {
                    alert('账号或密码错误！');
                    GM_setValue('username', null);
                    GM_setValue('password', null);
                    clearInterval(intervalKey);
                }
                if (--count === 0)
                {
                    clearInterval(intervalKey);
                };
            }, 1 * 1e3);
        }
    }
    else if (window.location.href.search("https://u.unipus.cn/user/student") != -1)
    {
        //删除环境监测菜单栏
        try
        {
            document.getElementById("env").parentNode.removeChild(document.getElementById("env"));
        }
        catch(error)
        {
            ;
        }
        //去除不可操作灰页面
        if (document.getElementById("layui-layer-shade1") != null) {
            try
            {
                document.getElementById("layui-layer-shade1").parentNode.removeChild(document.getElementById("layui-layer-shade1"));
                console.log('去除不可操作灰页面元素成功');
            }
            catch (error)
            {
                console.log('去除不可操作页面元素失败');
            }
        }
        else
        {
            console.log('无不可操作灰页面，无需去除');
        }
        //去除开始测试框
        if (document.getElementById("layui-layer1") != null) {
            try
            {
                document.getElementById("layui-layer1").parentNode.removeChild(document.getElementById("layui-layer1"));
                console.log('去除测试框元素成功');
            }
            catch (error)
            {
                console.log('去除测试框元素失败');
            }
        }
        else
        {
            console.log('无测试框，无需去除');
        }
        console.log('去除结束');
        //增加删除账户密码菜单栏
        username = GM_getValue('username');
        password = GM_getValue('password');
        if (window.location.href.search("service=true") != -1 && username != null && password != null && username != '' && password != '')
        {
            GM_deleteValue('username');
            GM_deleteValue('password');
        }
        else
        {
            if (username != null && password != null && username != '' && password != '')
            {
                a = document.createElement("div");
                a.setAttribute("class", "content_left_menu_item");
                a.setAttribute("id", "version");
                a.innerHTML='<a href="https://u.unipus.cn/user/student?service=true"><span>删除自动登录的信息</span></a>';
                document.querySelector("div[class='content_left']").appendChild(a);
            }
        }
        //增加取消自动登录菜单栏
        if (window.location.href.search("service=false") != -1 && GM_getValue('auto_login') == true)
        {
            GM_deleteValue('auto_login');
        }
        else
        {
            auto_login = GM_getValue('auto_login');
            if (auto_login == true)
            {
                a = document.createElement("div");
                a.setAttribute("class", "content_left_menu_item");
                a.setAttribute("id", "version");
                a.innerHTML='<a href="https://u.unipus.cn/user/student?service=false"><span>取消自动登录</span></a>';
                document.querySelector("div[class='content_left']").appendChild(a);
            }
        }
    }
})();