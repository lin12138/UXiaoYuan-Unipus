// ==UserScript==
// @name         U校园脚本
// @namespace    https://github.com/Brush-JIM/UXiaoYuan-Unipus
// @version      1.0
// @description  自动登录，关闭环境检测、长时间无操作、未开麦克风等窗口
// @author       Brush-JIM
// @match        https://sso.unipus.cn/sso*
// @match        https://u.unipus.cn/user/student*
// @match        https://ucontent.unipus.cn/_pc_default/pc.html*
// @match        http://sso.unipus.cn/sso*
// @match        http://u.unipus.cn/user/student*
// @match        http://ucontent.unipus.cn/_pc_default/pc.html*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        unsafeWindow
// @icon         https://u.unipus.cn/favicon.ico
// ==/UserScript==

(function() {
    'use strict';
    if (window.location.href == "https://sso.unipus.cn/sso/userinfo.html#")
    {
        if (unsafeWindow.localStorage.getItem('username') != null || unsafeWindow.localStorage.getItem('password') != null)
        {
            unsafeWindow.localStorage.clear();
            alert("重置成功");
            window.location.href = "https://u.unipus.cn/user/student";
        }
    }
    else if (window.location.href.search("https://sso.unipus.cn/sso/login") != -1)
    {
        if (unsafeWindow.localStorage.getItem('username') == null || unsafeWindow.localStorage.getItem('password') == null)
        {
            var div = document.createElement("div");
            div.setAttribute("class", "btn btn-login btn-fill");
            div.setAttribute("id", "auto-login");
            div.innerHTML='自动登录';
            document.querySelector('form').appendChild(div);
            $("#auto-login").click(
                function()
                {
                    unsafeWindow.localStorage.setItem('username',document.querySelector("input[name='username']").value);
                    unsafeWindow.localStorage.setItem('password',document.querySelector("input[name='password']").value);
                    document.querySelector("button[class='btn btn-login btn-fill']").click();
                    let count = 6
                    let intervalKey = setInterval(() => {
                        if (document.querySelector("div[class='layui-layer-content']") != null)
                        {
                            console.log('账号或密码错误');
                            unsafeWindow.localStorage.clear();
                            clearInterval(intervalKey);
                        }
                        if (--count === 0)
                        {
                            clearInterval(intervalKey);
                        };
                    }, 1 * 1e3);
                }
            );
        }
        else
        {
            let count = 6
            let intervalKey = setInterval(() => {
                if (document.querySelector("button[class='btn btn-login btn-fill']") != null)
                {
                    clearInterval(intervalKey);
                    document.querySelector("input[name='username']").value = unsafeWindow.localStorage.getItem('username');
                    document.querySelector("input[name='password']").value = unsafeWindow.localStorage.getItem('password');
                    document.querySelector("button[class='btn btn-login btn-fill']").click();
                }
                if (--count === 0)
                {
                    clearInterval(intervalKey);
                };
            }, 1 * 1e3);
            let count_1 = 6
            let intervalKey_1 = setInterval(() => {
                if (document.querySelector("div[class='layui-layer-content']") != null)
                {
                    console.log('账号或密码错误');
                    unsafeWindow.localStorage.clear();
                    clearInterval(intervalKey_1);
                    window.location.href = 'https://sso.unipus.cn/sso/login';
                }
                if (--count_1 === 0)
                {
                    clearInterval(intervalKey_1);
                };
            }, 1 * 1e3);
        }
    }
    else if (window.location.href.search("https://u.unipus.cn/user/student") != -1)
    {
        //删除环境监测菜单栏
        let count = 12;
        let intervalKey = setInterval(() => {
            try
            {
                document.getElementById("env").parentNode.removeChild(document.getElementById("env"));
            }
            catch(error)
            {
                ;
            }
            try
            {
                var a = document.createElement("div");
                a.setAttribute("class", "content_left_menu_item");
                a.setAttribute("id", "version");
                a.innerHTML='<a href="https://sso.unipus.cn/sso/userinfo.html#"><span>取消自动登录</span></a>';
                document.querySelector("div[class='content_left']").appendChild(a);
                clearInterval(intervalKey);
            }
            catch (error)
            {
                ;
            }
            if (--count === 0)
            {
                clearInterval(intervalKey);
            };
        }, 0.5 * 1e3);
        let count_1 = 12;
        let intervalKey_1 = setInterval(() => {
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
            if (--count_1 === 0)
            {
                clearInterval(intervalKey_1);
            };
        }, 0.5 * 1e3);
        //去除长时间未操作窗口，这里也有这个弹窗
        setInterval (
            function () {
                for (var i = 0;i < document.querySelectorAll('button').length;i++)
                {
                    if (document.querySelectorAll('button')[i].id.search('_mask_notice_id_') != -1)
                    {
                        try
                        {
                            document.querySelectorAll('button')[i].click();
                            console.log('长时间未操作页面点击完成');
                        }
                        catch (error)
                        {
                            ;
                        }
                    }
                }
            }
            , 1 * 1e3
        );
    }
    else if (window.location.href.search("https://ucontent.unipus.cn/_pc_default/pc.html") != -1)
    {
        setInterval (
            function () {
                for (var count = 0;count < document.querySelectorAll('button[type="button"][tabindex="0"]').length;count++)
                {
                    if (document.querySelectorAll('button[type="button"][tabindex="0"]')[count].getAttribute('type') == 'button')
                    {
                        if (document.querySelectorAll('button[type="button"][tabindex="0"]')[count].innerText == '确定')
                        {
                            try
                            {
                                document.querySelectorAll('button[type="button"][tabindex="0"]')[count].click();
                            }
                            catch (error)
                            {
                                ;
                            }
                        }
                    }
                }
                for (var i = 0;i < document.querySelectorAll('button').length;i++)
                {
                    if (document.querySelectorAll('button')[i].id.search('_mask_notice_id_') != -1)
                    {
                        try
                        {
                            document.querySelectorAll('button')[i].click();
                            console.log('长时间未操作页面点击完成');
                        }
                        catch (error)
                        {
                            ;
                        }
                    }
                }
                var watch_key = "position: relative; opacity: 1; font-size: 14px; letter-spacing: 0px; text-transform: uppercase; font-weight: normal; margin: 0px; padding-left: 20px; padding-right: 20px; color: rgb(255, 255, 255);"
                if (document.querySelector('span[style="' + watch_key + '"]') != -1)
                {
                    try
                    {
                        document.querySelector('span[style="' + watch_key + '"]').click();
                    }
                    catch (error)
                    {
                        ;
                    }
                }
            }
            , 1 * 1e3
        );
    }
    else
    {
        alert("页面可能正在使用不安全的http，接下来将为您跳转到https加密链接\n（主要是我为了省事）");
        window.location.href = "https://sso.unipus.cn/sso/login";
    }
})();
