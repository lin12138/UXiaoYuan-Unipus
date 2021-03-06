// ==UserScript==
// @name         U校园脚本
// @namespace    https://github.com/Brush-JIM/UXiaoYuan-Unipus
// @version      1.3
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
// @run-at       document-start
// @icon         https://u.unipus.cn/favicon.ico
// ==/UserScript==

(function() {
    'use strict';
    if (window.location.href == "https://sso.unipus.cn/sso/userinfo.html#")
    {
        if (unsafeWindow.localStorage.getItem('username') != null || unsafeWindow.localStorage.getItem('password') != null)
        {
            unsafeWindow.localStorage.clear();
            unsafeWindow.alert("重置成功");
            unsafeWindow.location.href = "https://u.unipus.cn/user/student";
        }
    }
    else if (window.location.href.search("https://sso.unipus.cn/sso/login") != -1)
    {
        if (unsafeWindow.localStorage.getItem('username') == null || unsafeWindow.localStorage.getItem('password') == null)
        {
            let count = 60
            let intervalKey = setInterval(() => {
                if (document.querySelector("button[class='btn btn-login btn-fill']") != -1){
                    clearInterval(intervalKey);
                    document.querySelector("button[class='btn btn-login btn-fill']").innerHTML = '自动登录';
                    $("button[class='btn btn-login btn-fill']").bind('click',
                                                                     function () {
                        unsafeWindow.localStorage.setItem('username',document.querySelector("input[name='username']").value);
                        unsafeWindow.localStorage.setItem('password',document.querySelector("input[name='password']").value);
                    }
                                                                    );
                }
                if (--count === 0)
                {
                    clearInterval(intervalKey);
                };
            }, 0.1 * 1e3);
        }
        else
        {
            let count = 60
            let intervalKey = setInterval(() => {
                if (document.querySelector("button[class='btn btn-login btn-fill']") != null)
                {
                    clearInterval(intervalKey);
                    document.querySelector("input[name='username']").value = unsafeWindow.localStorage.getItem('username');
                    document.querySelector("input[name='password']").value = unsafeWindow.localStorage.getItem('password');
                }
                if (--count === 0)
                {
                    clearInterval(intervalKey);
                };
            }, 0.1 * 1e3);
            //因为脚本在按钮绑定事件前就可能执行，导致点击按钮无反应，所以需要判断按钮是否已经绑定事件才点击
            let count_1 = 60
            let intervalKey_1 = setInterval(() => {
                var objEvt = unsafeWindow.$._data($("button[class='btn btn-login btn-fill']")[0], 'events');
                if (objEvt && objEvt['click'])
                {
                    clearInterval(intervalKey_1);
                    document.querySelector("button[class='btn btn-login btn-fill']").click();
                    console.log('bind click');
                } else {
                    console.log('Not bind click');
                }
                if (--count_1 === 0)
                {
                    clearInterval(intervalKey_1);
                };
            }, 0.5 * 1e3);
        }
    }
    else if (window.location.href.search("https://u.unipus.cn/user/student") != -1)
    {
        //写入session，用来跳过环境检测
        unsafeWindow.sessionStorage.setItem("__env_tested__", Date());
        //写入localStorage，去除版本说明提示
        function myBrowser(){
            var userAgent = navigator.userAgent;
            var isOpera = userAgent.indexOf("Opera") > -1;
            if (isOpera) {
                return "Opera"
            };
            if (userAgent.indexOf("Firefox") > -1) {
                return "FF";
            };
            if (userAgent.indexOf("Chrome") > -1){
                return "Chrome";
            };
            if (userAgent.indexOf("Safari") > -1) {
                return "Safari";
            };
            if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                return "IE";
            };
        }
        unsafeWindow.localStorage.setItem("__version_tested__v21553593265"+ myBrowser(),new Date().getTime());
        $('#version_newnotice').hide();
        //删除环境监测菜单栏
        let intervalKey = setInterval(() => {
            if (document.getElementById("env") != -1)
            {
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
            }
        }, 0.5 * 1e3);
        let count_1 = 60;
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
            , 0.5 * 1e3
        );
    }
    else
    {
        alert("页面可能正在使用不安全的http，接下来将为您跳转到https加密链接\n（主要是我为了省事）");
        window.location.href = "https://u.unipus.cn/index.html/";
    }
})();
