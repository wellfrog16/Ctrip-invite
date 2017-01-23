var frog = (function () {


    var obj = {
        config : {
            context: null,
            top: 50,
            left: 30,
            radius: 8,
            enddate: new Date(2017, 0, 23, 18, 0, 0),
            timeColor : '#f60'
        },

        curSeconds: 0,
        allSeconds:1000,

        init: function () {
            obj.config.context = $('canvas')[0].getContext('2d');

            if (obj.config.context) {
                obj.curSeconds = obj.getSeconds();

                return true;
            }
            else {
                console.log('当前浏览器不支持canvas');
                return false;
            }
        },

        start: function () {

            obj.update();
            setInterval(function () {
                obj.render();
                obj.update();
            }, 100)
            

            console.log('开始');
        },

        getSeconds : function(){
            var time = new Date();
            return time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
        },


        render: function () {
            //// 时间判断，同一秒退出。保证一秒一次数字渲染
            //if (obj.curSeconds == obj.getSeconds()) {
            //    return;
            //}
            //else {
            //    obj.curSeconds = obj.getSeconds();
            //}
            
            // 开始渲染
            var ctx = obj.config.context;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            var hours = parseInt(obj.allSeconds / 3600),
                minutes = parseInt((obj.allSeconds - hours * 3600) / 60),
                seconds = obj.allSeconds % 60;

            var top = obj.config.top,
                left = obj.config.left,
                radius = obj.config.radius;

            renderDigit(left, top, parseInt(hours / 10));
            renderDigit(left + 15 * (radius + 1), top, parseInt(hours % 10));
            renderDigit(left + 30 * (radius + 1), top, 10);
            renderDigit(left + 39 * (radius + 1), top, parseInt(minutes / 10));
            renderDigit(left + 54 * (radius + 1), top, parseInt(minutes % 10));
            renderDigit(left + 69 * (radius + 1), top, 10);
            renderDigit(left + 78 * (radius + 1), top, parseInt(seconds / 10));
            renderDigit(left + 93 * (radius + 1), top, parseInt(seconds % 10));


            function renderDigit(x, y, num) {


                ctx.fillStyle = obj.config.timeColor;

                // 行循环
                for (var i = 0; i < digit[num].length; i++) {
                    // 列循环
                    for (var j = 0; j < digit[num][i].length; j++) {
                        // 绘制
                        if (digit[num][i][j] == 1) {
                            ctx.beginPath();
                            ctx.arc(x + j * 2 * (radius + 1) + (radius + 1), y + i * 2 * (radius + 1) + (radius + 1), radius, 0, 2 * Math.PI);
                            ctx.closePath();
                            ctx.fill();
                        }
                    }
                }
            }
        },

        update: function () {
            obj.allSeconds = Math.round((obj.config.enddate.getTime() - new Date().getTime()) / 1000);

            var nextShowTimeSeconds = getCurrentShowTimeSeconds();

            var nextHours = parseInt(nextShowTimeSeconds / 3600);
            var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60)
            var nextSeconds = nextShowTimeSeconds % 60

            var curHours = parseInt(curShowTimeSeconds / 3600);
            var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60)
            var curSeconds = curShowTimeSeconds % 60

            //if (nextSeconds != curSeconds) {
                if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
                    addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
                }
                if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
                    addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours / 10));
                }

                if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
                    addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
                }
                if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
                    addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
                }

                if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
                    addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
                }
                if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
                    addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
                }

                curShowTimeSeconds = nextShowTimeSeconds;
            //}

            updateBalls();

            console.log(balls.length)

            function updateBalls() {

                for (var i = 0 ; i < balls.length ; i++) {

                    balls[i].x += balls[i].vx;

                    var c = 1.0;
                    if (balls[i].y + RADIUS + balls[i].vy >= WINDOW_HEIGHT) {
                        c = (WINDOW_HEIGHT - (balls[i].y + RADIUS)) / balls[i].vy;
                        console.log(c);
                    }

                    balls[i].y += balls[i].vy;
                    balls[i].vy += c * balls[i].g;;

                    if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
                        balls[i].y = WINDOW_HEIGHT - RADIUS;
                        balls[i].vy = -Math.abs(balls[i].vy) * 0.75;
                    }
                }

                var cnt = 0
                for (var i = 0 ; i < balls.length ; i++)
                    if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH)
                        balls[cnt++] = balls[i]

                while (balls.length > cnt) {
                    balls.pop();
                }
            }

            function addBalls(x, y, num) {

                for (var i = 0  ; i < digit[num].length ; i++)
                    for (var j = 0  ; j < digit[num][i].length ; j++)
                        if (digit[num][i][j] == 1) {
                            var aBall = {
                                x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                                y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                                g: 1.5 + Math.random(),
                                vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                                vy: -5,
                                color: colors[Math.floor(Math.random() * colors.length)]
                            }

                            balls.push(aBall)
                        }
            }
        }
    }

    return obj;
})()


$(function () {
    frog.init();
    frog.start();
});