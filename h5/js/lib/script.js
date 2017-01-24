// 剧本

define(['jquery', 'resLoader', 'jqHammer', 'weixin'], function ($, resLoader, jqHammer, wx)
{
    var self = {}

    self.open = function () {

        //self.share();

        document.body.scrollTop = 0;

        // 修复坐标
        //self.fixPosition();

        // 加载动画读取
        //self.loadAnim();


        //$('.video').hammer().on("tap", function (e) {
        //    location.href = 'http://m.canon.com.cn/common/video/invoking/index.html?id=B3BF1A592FB707379C33DC5901307461';
        //});
    }

    // 坐标修正
    self.fixPosition = function () {
        
        var scaleNum = document.documentElement.clientWidth / 640;
        var ele = $('.jsfix div, .jsfix span');

        ele.each(function () {
            var o = $(this);
            var mode = o.attr('data-mode');

            o.css({
                'width': scaleNum * parseInt(o.css('width')),
                'height': scaleNum * parseInt(o.css('height'))
            });

            switch (mode) {

                case 'top-right':
                    o.css({
                        'top': scaleNum * parseInt(o.css('top')),
                        'right': scaleNum * parseInt(o.css('right'))
                    });
                    break;

                case 'bottom-left':
                    o.css({
                        'bottom': scaleNum * parseInt(o.css('bottom')),
                        'left': scaleNum * parseInt(o.css('left'))
                    });
                    break;

                case 'bottom-right':
                    o.css({
                        'bottom': scaleNum * parseInt(o.css('bottom')),
                        'right': scaleNum * parseInt(o.css('right'))
                    });
                    break;


                default:
                    o.css({
                        'top': scaleNum * parseInt(o.css('top')),
                        'left': scaleNum * parseInt(o.css('left'))
                    });
                    break;
            }
        });
    }


    // loading动画
    self.loadTimer = null;
    self.loadAnim = function () {
        new resLoader({
            resources: [
                'img/main/bg.jpg',
                'img/main/loading.png',

                'img/canon/canon_logo.jpg',
                'img/canon/canon_sub_logo.jpg'
            ],
            onStart: function (total) { },
            onProgress: function (current, total) { },
            onComplete: function (total) {
                var x = 0;
                $('.loading').show();

                // 开始加载资源
                self.load();

                loadTimer = setInterval(function () {
                    $('.loading').css('background-position-x', x++ * (100 / 6) + '%');
                    if (x > 7) { x = 0; }
                }, 150);
            }
        }).start();
    }


    // load 素材
    self.load = function () {
        // app资源加载
        new resLoader({
            resources: [
                'img/frames/cover1.jpg',
                'img/frames/frame2.jpg',
                'img/frames/frame3.jpg',
                'img/frames/frame4.jpg',

                'img/items/copy1.png',
                'img/items/copy2.png',
                'img/items/icon01.png',
                'img/items/icon02.png',
                'img/items/icon03.png',
                'img/items/icon04.png',
                'img/items/icon05.png',
                'img/items/icon06.png',
                'img/items/icon07.png',
                'img/items/icon08.png',
                'img/items/icon09.png',
                'img/items/icon10.png',
                'img/items/icon11.png',
                'img/items/icon12.png',
                'img/items/icon13.png',
                'img/items/icon14.png',
                'img/items/icon15.png',
                'img/items/icon16.png',
                'img/items/icon17.png',
                'img/items/icon18.png',
                'img/items/icon19.png',
                'img/items/title.png',
                'img/items/video.png'

            ],
            onStart: function (total) { },
            onProgress: function (current, total) {
                //var percent = parseInt(current / total * 100);
                //$('.loading span').text(percent + '%');
            },
            onComplete: function (total) {
                $('.loading').fadeOut(1000, function () {
                    clearInterval(self.loadTimer);
                    // 打开垂直滚动条
                    //$('body').css('overflow-y', 'initial');
                    $('html').css('overflow-y', 'initial');

                    window.ontouchstart = null;

                    $('.title, .item01, .item02, .item03, .item04, .item05, .copy1, .frame1').fadeIn(1200, function () { $('.jsfix div:not(.loading, .item11)').show(); });
                });
            }
        }).start();
    }




    // 微信分享
    self.share = function () {
        var host = '';
        var project = '';

        $.ajax({
            type: 'post',
            url: 'WeixinJSSDKServlet?type=getWxConfig',
            data: { url: window.location.href },
            dataType: 'json',
            success: function (args) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: args.appId, // 必填，公众号的唯一标识
                    timestamp: args.timestamp, // 必填，生成签名的时间戳
                    nonceStr: args.nonceStr, // 必填，生成签名的随机串
                    signature: args.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                wx.ready(function () {
                    var url = document.location.href,
                        title = '',
                        desc = '',
                        imgUrl = 'http://' + host + '/img/sharecover1.jpg'

                    wx.onMenuShareTimeline({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareQQ({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareWeibo({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareQZone({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });

                wx.error(function (res) {
                    console.log("wx has error:" + res);
                });
            }
        });
    }
    
    return self;
    
});





















