// ==UserScript==
// @name         U校园脚本
// @namespace    https://github.com/Brush-JIM/UXiaoYuan-Unipus
// @version      0.2
// @description  自动登录、去除U校园环境检测 项目地址：GitHub：https://github.com/Brush-JIM/UXiaoYuan-Unipus 或者Bitbucket：https://bitbucket.org/Brush-JIM/uxiaoyuan-unipus/
// @author       Brush-JIM
// @match        https://u.unipus.cn/user/student?*
// @match        https://sso.unipus.cn/sso/login*
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-idle
// @icon         https://u.unipus.cn/favicon.ico
// ==/UserScript==

(function() {
    'use strict';
    //正则匹配URL
    if (window.location.href.search("https://sso.unipus.cn/sso/login") != -1)
    {
        try
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
        catch (error)
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
    }
    else if (window.location.href.search("https://u.unipus.cn/user/student?") != -1)
    {
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
    }
})();