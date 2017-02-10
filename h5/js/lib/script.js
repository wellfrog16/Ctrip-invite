// 剧本

define(['jquery', 'resLoader', 'jqHammer', 'weixin', 'swiper'], function ($, resLoader, jqHammer, wx, swiper)
{
    var self = {}

    self.open = function () {

        //self.share();

        document.body.scrollTop = 0;

        // 修复坐标
        self.fixPosition();

        // 加载动画读取
        self.loadAnim();

        // 绑定事件
        self.bindAction();


        //$('.video').hammer().on("tap", function (e) {
        //    location.href = 'http://m.canon.com.cn/common/video/invoking/index.html?id=B3BF1A592FB707379C33DC5901307461';
        //});

        $('#bgMusic').hammer().on("tap", function (e) {
            self.music();
        });


        console.log('111');
        var direction = 'right';
        (function () {
            var css = {
                'left': '0%'
            };
            if (direction === 'right') {
                direction = 'left';
                css.left = '110%';
            } else {
                $('.bus').css({ 'left': '-40%' });
                direction = 'left';
                css.left = '110%';
            }
            $('.bus').animate(css, 10000, 'linear', arguments.callee);
        })();


        var direction = 'x';
        (function () {
            var css = {
                'left': '-100%'
            };
            if (direction === 'x') {
                direction = 'y';
                css.left = '-100%';
            } else {
                $('.road').css({ 'left': '0%' });
                direction = 'y';
                css.left = '-100%';
            }
            $('.road').animate(css, 15000, 'linear', arguments.callee);
        })();

        var direction = 'x1';
        (function () {
            var css = {
                'left': '-100%'
            };
            if (direction === 'x1') {
                direction = 'y1';
                css.left = '-100%';
            } else {
                $('.building2').css({ 'left': '0%' });
                direction = 'y1';
                css.left = '-100%';
            }
            $('.building2').animate(css, 20000, 'linear', arguments.callee);
        })();

        var direction = 'x2';
        (function () {
            var css = {
                'left': '-100%'
            };
            if (direction === 'x2') {
                direction = 'y2';
                css.left = '-100%';
            } else {
                $('.building1').css({ 'left': '0%' });
                direction = 'y2';
                css.left = '-100%';
            }
            $('.building1').animate(css, 25000, 'linear', arguments.callee);
        })();

        var direction = 'top';
        (function () {
            var css = {
                'top': '17%'
            };
            if (direction === 'top') {
                direction = 'bottom';
                css.top = '20%';
            } else {
                direction = 'top';
            }
            $('.scene02 .s01').animate(css, 2000, 'swing', arguments.callee);
        })();


        var direction = 'top1';
        (function () {
            var css = {
                'top': '-5%'
            };
            if (direction === 'top1') {
                direction = 'bottom1';
                css.top = '0%';
            } else {
                direction = 'top1';
            }
            $('.bg2').animate(css, 4000, 'swing', arguments.callee);
        })();

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
                'height': scaleNum * parseInt(o.css('height')),
                'line-height': scaleNum * parseInt(o.css('line-height')) + 'px'
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
    // self.loadTimer = null;
    self.loadAnim = function () {

        new resLoader({
            resources: [
                'img/main/loading.png'
            ],
            onStart: function (total) { },
            onProgress: function (current, total) { },
            onComplete: function (total) {
                //var x = 0;
                //$('.loading').show();

                // 开始加载资源
                self.load();


                //loadTimer = setInterval(function () {
                //    $('.loading').css('background-position-x', x++ * (100 / 6) + '%');
                //    if (x > 7) { x = 0; }
                //}, 150);
            }
        }).start();
    }


    // load 素材
    self.load = function () {
        // app资源加载
        new resLoader({
            resources: [
                'audio/music.mp3',

                'img/main/bg.jpg',
                'img/main/logo.png',
                'img/main/music.png',

                'img/scene-guest/float.png',
                'img/scene-guest/guest1.png',
                'img/scene-guest/guest2.png',
                'img/scene-guest/guest3.png',
                'img/scene-guest/like.png',
                'img/scene-guest/title1.png',
                'img/scene-guest/title2.png',
                'img/scene-guest/title3.png',
                'img/scene-guest/title4.png',

                'img/scene01/circle.png',
                'img/scene01/finger.png',
                'img/scene01/float.png',
                'img/scene01/info.png',
                'img/scene01/slogan.png',

                'img/scene02/circle.png',
                'img/scene02/float.png',
                'img/scene02/info.png',
                'img/scene02/play.png',

                'img/scene03/content.png',
                'img/scene03/float.png',
                'img/scene03/list.png',
                'img/scene03/setting.png',
                'img/scene03/title.png',

                'img/scene04/circle.png',
                'img/scene04/float.png',
                'img/scene04/play.png',
                'img/scene04/title.png',

                'img/scene05/content.png',
                'img/scene05/float.png',
                'img/scene05/medal.png',
                'img/scene05/signup1.png',
                'img/scene05/signup2.png',
                'img/scene05/submit1.png',
                'img/scene05/submit2.png',
                'img/scene05/title1.png',
                'img/scene05/title2.png',

                'img/scene06/float.png',
                'img/scene06/result.png'
            ],
            onStart: function (total) { },
            onProgress: function (current, total) {
                var percent = parseInt(current / total * 100);
                $('.loading .percent').text(percent + '%');
            },
            onComplete: function (total) {
                self.initSwiper();
            }
        }).start();
    }


    self.initSwiper = function () {
        var mySwiper = new swiper('.swiper-container', {
            direction: 'horizontal',
            loop: false,
            onInit: function (swiper) {
                swiperAnimateCache(swiper); //隐藏动画元素 
                $('.loading').hide();
                swiperAnimate(swiper); //初始化完成开始动画

                //swiper.slideTo(3);
            },
            onSlideChangeEnd: function (swiper) {
                swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画

            },
            onSlideChangeStart: function (swiper) {
                // 非第一页时隐藏手滑动作
                if (swiper.activeIndex != 0) { $('#finger').removeClass('hand').hide(); }
            }
        })

        $('.scene01 .s3').on('webkitAnimationEnd', function () {
            $('#finger').addClass('hand').show();
        });

        $('.scene02 .s2').hammer().on("tap", function (e) {
            location.href = 'https://v.qq.com/x/page/m03737rnjqw.html';
        });

        //https://v.qq.com/x/page/m03737rnjqw.html

    }


    self.bindAction = function () {
        self.enroll();
    }


    self.music = function () {

    }


    self.enroll = function () {
        $('.scene05 .s3 img').hammer().on("tap", function (e) {
            $('.btn-bgm').hide();
            $('#guest').show();
        });

        $('#guest .close').hammer().on("tap", function (e) {
            $('.btn-bgm').show();
            $('#guest').hide();
        });

        $('.scene05 .s4 img').hammer().on("tap", function (e) {
            $('.btn-bgm').hide();
            $('#anyone').show();
        });

        $('#anyone .close').hammer().on("tap", function (e) {
            $('.btn-bgm').show();
            $('#anyone').hide();
        });


        $('#guest .submit').hammer().on("tap", function (e) {

            if (!checkForm('guest')) { return false; }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://www.tron-m.com/ctrip/api/saveRecord.do",
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "cache-control": "no-cache"
                },
                "data": {
                    "name": $('#name').val(),
                    "telNo": $('#telNo').val(),
                    "weibo": $('#weibo').val(),
                    "type": "1"
                }
            }

            $.ajax(settings).done(function (response) {
                console.log(response);
            });

        });


        $('#anyone .submit').hammer().on("tap", function (e) {

            if (!checkForm('guest')) { return false; }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://www.tron-m.com/ctrip/api/saveRecord.do",
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "cache-control": "no-cache"
                },
                "data": {
                    "name": $('#name').val(),
                    "telNo": $('#telNo').val(),
                    "weibo": $('#weibo').val(),
                    "type": "1"
                }
            }

            $.ajax(settings).done(function (response) {
                console.log(response);
            });

        });


        function checkForm() {
            return true;
        }
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





















