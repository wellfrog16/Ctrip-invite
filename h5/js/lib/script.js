// 剧本

define(['jquery', 'resLoader', 'jqHammer', 'jqCookie', 'weixin', 'swiper'], function ($, resLoader, jqHammer, jqCookie, wx, swiper) {
    var self = {}

    self.open = function () {

        //self.share();

        document.body.scrollTop = 0;

        document.body.style.width = window.screen.width;
        document.body.style.height = window.screen.height;

        // 修复坐标
        self.fixPosition();

        // 加载动画读取
        self.loadAnim();

        // 绑定事件
        self.bindAction();


        //$('.video').hammer().on("tap", function (e) {
        //    location.href = 'https://m.canon.com.cn/common/video/invoking/index.html?id=B3BF1A592FB707379C33DC5901307461';
        //});

        $('#bgMusic').hammer().on("tap", function (e) {
            self.music();
        });

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
        var ele = $('.jsfix');

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
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/main/loading.png'
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
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/music.mp3',

                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/main/bg.jpg',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/main/logo.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/main/music.png',

                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene-guest/float.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene-guest/guest1.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene-guest/guest2.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene-guest/guest3.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene-guest/like.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene-guest/title1.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene-guest/title2.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene-guest/title3.png',

                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene01/circle.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene01/finger.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene01/float.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene01/info.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene01/slogan.png',

                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene02/circle.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene02/float.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene02/info.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene02/play.png',

                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene03/content.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene03/float.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene03/list.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene03/setting.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene03/title.png',

                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene04/circle.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene04/float.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene04/play.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene04/title.png',

                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene05/content.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene05/float.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene05/medal.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene05/signup1.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene05/signup2.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene05/submit1.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene05/submit2.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene05/title1.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene05/title2.png',

                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene06/float.png',
                'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene06/result.png'
            ],
            onStart: function (total) { },
            onProgress: function (current, total) {
                var percent = parseInt(current / total * 100);
                //console.log(percent)
                $('.loading .percent').text(percent + '%');
            },
            onComplete: function (total) {
                self.initSwiper();
            }
        }).start();

        $.get('https://www.tron-m.com/ctf/api/showHonored.do', function (json) {

            $('.guest0 span').text(json[3].thumb);
            $('.guest1 span').text(json[0].thumb);
            $('.guest2 span').text(json[1].thumb);
            $('.guest3 span').text(json[2].thumb);
            //console.log(result)
        }, 'json');


        $('.scene01, .scene01 .s1, .scene01 .s2').on('click', function () {
            if (self.flagMusicOn) {

                var ado = $('#bgMusic')[0];

                var findSource = setInterval(function () {
                    if (ado.duration > 0 && ado.currentTime > 1) {

                        $('.btn-bgm').removeClass('btn-bgm-pause')
                        self.flagMusicPlay = true;
                        clearInterval(findSource);
                    }

                    ado.play();
                }, 500);
            }
        });
    }

    self.swiper = null
    self.initSwiper = function () {
        var mySwiper = new swiper('.swiper-container', {
            direction: 'horizontal',
            loop: false,
            onInit: function (swiper) {
                swiperAnimateCache(swiper); //隐藏动画元素 
                $('.loading').hide();
                swiperAnimate(swiper); //初始化完成开始动画

                //swiper.slideTo(9);
            },
            onSlideChangeEnd: function (swiper) {
                swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画


                //console.log(swiper.activeIndex);

            },
            onSlideChangeStart: function (swiper) {
                // 非第一页时隐藏手滑动作
                if (swiper.activeIndex != 0) {
                    $('#finger').removeClass('hand').hide();
                }

                if (swiper.activeIndex == 1 && self.flagMusicOn) {
                    var ado = $('#bgMusic')[0];

                    var findSource = setInterval(function () {
                        if (ado.duration > 0 && ado.currentTime > 1) {

                            $('.btn-bgm').removeClass('btn-bgm-pause')
                            self.flagMusicPlay = true;
                            clearInterval(findSource);
                        }

                        ado.play();
                    }, 500);
                }

                if (swiper.activeIndex == 8) {
                    swiper.lockSwipeToNext()
                }

                if (swiper.activeIndex == 7) {
                    swiper.unlockSwipeToNext()
                }
            }
        })

        self.swiper = mySwiper;

        $('.scene01 .s2').on('webkitAnimationEnd', function () {
            $('#finger').addClass('hand').show();
        });

        // 两个外链视频
        $('.scene02 .s2, .scene02 .s3').hammer().on("tap", function (e) {
            $('.video').show();
            $('.video div').html('<iframe frameborder="0" width="100%" height="100%" src="https://v.qq.com/iframe/player.html?vid=u0374zkwh64&tiny=0&auto=1" allowfullscreen></iframe>');
            //$('.video iframe').attr('src', 'https://v.qq.com/iframe/player.html?vid=m03737rnjqw&tiny=0&auto=1');
            $('#bgMusic')[0].pause();
        });

        $('.video span').hammer().on("tap", function (e) {
            $('.video').hide();
            $('.video iframe').attr('src', '');
            $('#bgMusic')[0].play();
        });

        $('.scene04 .s2, .scene04 .s3').hammer().on("tap", function (e) {
            //location.href = 'https://v.qq.com/x/page/m03737rnjqw.html';
            $('.video').show();
            $('.video div').html('<iframe frameborder="0" width="100%" height="100%" src="https://v.qq.com/iframe/player.html?vid=m03737rnjqw&tiny=0&auto=1" allowfullscreen></iframe>');
            //$('.video iframe').attr('src', 'https://v.qq.com/iframe/player.html?vid=u0374zkwh64&tiny=0&auto=1');
            $('#bgMusic')[0].pause();
        });

        $.removeCookie('guest0');
        $.removeCookie('guest1');
        $.removeCookie('guest2');
        $.removeCookie('guest3');

        $('.scene06 .s2').hammer().on("tap", function (e) {
            self.swiper.unlockSwipeToNext();
            self.swiper.unlockSwipes();
            self.swiper.slideTo(0);
        });

        $('.mask img').hammer().on("tap", function (e) {
            $('.mask').hide();
        });
    }


    self.bindAction = function () {
        self.enroll();
        self.music();
        self.vote();
    }

    self.vote = function () {

        if ($.cookie('guest0') == 'ok') { $('.guest0 img').eq(2).attr('src', 'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene-guest/liked.png'); }
        if ($.cookie('guest1') == 'ok') { $('.guest1 img').eq(2).attr('src', 'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene-guest/liked.png'); }
        if ($.cookie('guest2') == 'ok') { $('.guest2 img').eq(2).attr('src', 'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene-guest/liked.png'); }
        if ($.cookie('guest3') == 'ok') { $('.guest3 img').eq(2).attr('src', 'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene-guest/liked.png'); }

        $('.guest0 span').hammer().on("tap", function (e) {

            //console.log($('.guest0 img').eq(2).attr('src'));
            if ($.cookie('guest0') == 'ok' || $('.guest0 img').eq(2).attr('src').indexOf('liked') != -1) { $('.mask').show();; return false; }

            $.post('https://www.tron-m.com/ctf/api/thumbup.do?id=4', function (json) {
                if (json.code == 1) {
                    $('.guest0 span').text(json.result.thumb);
                    $('.guest0 img').eq(2).attr('src', 'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene-guest/liked.png');

                    $.cookie('guest0', 'ok', { expires: 7 });
                }
            }, 'json');
        });

        $('.guest1 span').hammer().on("tap", function (e) {

            if ($.cookie('guest1') == 'ok' || $('.guest1 img').eq(2).attr('src').indexOf('liked') != -1) { $('.mask').show();; return false; }

            $.post('https://www.tron-m.com/ctf/api/thumbup.do?id=1', function (json) {
                if (json.code == 1) {
                    $('.guest1 span').text(json.result.thumb);
                    $('.guest1 img').eq(2).attr('src', 'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene-guest/liked.png');
                    $.cookie('guest1', 'ok', { expires: 7 });
                }
            }, 'json');
        });
        $('.guest2 span').hammer().on("tap", function (e) {
            if ($.cookie('guest2') == 'ok' || $('.guest2 img').eq(2).attr('src').indexOf('liked') != -1) { $('.mask').show();; return false; }

            $.post('https://www.tron-m.com/ctf/api/thumbup.do?id=2', function (json) {
                if (json.code == 1) {
                    $('.guest2 span').text(json.result.thumb)
                    $('.guest2 img').eq(2).attr('src', 'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene-guest/liked.png');
                    $.cookie('guest2', 'ok', { expires: 7 });
                }
            }, 'json');
        });
        $('.guest3 span').hammer().on("tap", function (e) {
            if ($.cookie('guest3') == 'ok' || $('.guest3 img').eq(2).attr('src').indexOf('liked') != -1) { $('.mask').show();; return false; }

            $.post('https://www.tron-m.com/ctf/api/thumbup.do?id=3', function (json) {
                if (json.code == 1) {
                    $('.guest3 span').text(json.result.thumb)
                    $('.guest3 img').eq(2).attr('src', 'https://tronm.oss-cn-shanghai.aliyuncs.com/ctrip/aa/scene-guest/liked.png');
                    $.cookie('guest3', 'ok', { expires: 7 });
                }
            }, 'json');
        });
    }

    self.flagMusicOn = true;
    self.flagMusicPlay = false;
    self.music = function () {
        $('.btn-bgm').hammer().on("tap", function (e) {
            self.flagMusicOn = !self.flagMusicOn;

            if (self.flagMusicOn) {
                $('#bgMusic')[0].play();
                $('.btn-bgm').removeClass('btn-bgm-pause')
                self.flagMusicPlay = true;
            }
            else {
                $('#bgMusic')[0].pause();
                $('.btn-bgm').addClass('btn-bgm-pause')
                self.flagMusicPlay = false;
            }
        });
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
                "url": "https://www.tron-m.com/ctf/api/saveRecord.do",
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
                //console.log(response);

                self.swiper.unlockSwipeToNext();
                self.swiper.slideTo(9);
                self.swiper.lockSwipes();
                setTimeout(function () {
                    $('.btn-bgm').show();
                    $('#guest').hide();
                }, 1000)
            });

        });


        $('#anyone .submit').hammer().on("tap", function (e) {

            if (!checkForm('anyone')) { return false; }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://www.tron-m.com/ctf/api/saveRecord.do",
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "cache-control": "no-cache"
                },
                "data": {
                    "name": $('#name2').val(),
                    "telNo": $('#telNo2').val(),
                    "weibo": '',
                    "type": "0"
                }
            }

            $.ajax(settings).done(function (response) {
                //console.log(response);

                self.swiper.unlockSwipeToNext();
                self.swiper.slideTo(9);
                self.swiper.lockSwipes();
                setTimeout(function () {
                    $('.btn-bgm').show();
                    $('#anyone').hide();
                }, 1000)
            });

        });


        function checkForm(n) {
            var flagResult = true;

            if (n == 'guest') {
                if ($('#weibo').val().length < 1) {
                    $('#guest dl span').eq(0).text('微博不能未空');
                    flagResult = false;
                }
                else {
                    $('#guest dl span').eq(0).text('');
                }

                if ($('#name').val().length < 1) {
                    $('#guest dl span').eq(1).text('姓名不能未空');
                    flagResult = false;
                }
                else {
                    $('#guest dl span').eq(1).text('');
                }

                if (!/^1\d{10}$/.test($('#telNo').val())) {
                    $('#guest dl span').eq(2).text('手机格式不对');
                    flagResult = false;
                }
                else {
                    $('#guest dl span').eq(2).text('');
                }
            }
            else {
                if ($('#name2').val().length < 1) {
                    $('#anyone dl span').eq(0).text('姓名不能未空');
                    flagResult = false;
                }
                else {
                    $('#anyone dl span').eq(0).text('');
                }

                if (!/^1\d{10}$/.test($('#telNo2').val())) {
                    $('#anyone dl span').eq(1).text('手机格式不对');
                    flagResult = false;
                }
                else {
                    $('#anyone dl span').eq(1).text('');
                }
            }

            return flagResult;
        }
    }




    // 微信分享
    self.share = function () {

        $.ajax({
            type: 'post',
            url: 'https://www.tron-m.com/wx/jssdk',
            data: { m: "getWxConfig", url: window.location.href },
            dataType: 'json',
            success: function (json) {
                args = json.result;
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
                        title = '2017·CTF中国旅行者大会',
                        desc = '和周笔畅一起，遇见不一样的世界，遇见另一个自己！',
                        imgUrl = 'https://www.tron-m.com/ctf/img/cover.jpg'

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
    }();

    return self;

});





















