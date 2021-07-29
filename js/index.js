function Gallery(a, options) {
    var parent = document.getElementById(a);
    console.log(parent.children);
    // 限制用户必须要传的参数
    if (options.row && options.col && options.row * options.col != parent.children.length) {
        throw 'row and cro is error';  //控制台提示行列数错误
    }
    // 建立默认数据
    var defaulOption = {
        row: 4,      //行
        col: 5,      //列
        maxW: 300,   //最大宽
        maxH: 400,   //最大高
        minW: 100,   //最小宽
        minh: 80     //最小高
    }
    // 传入新数据覆盖默认数据
    Object.assign(defaulOption, options);
    //设置父元素 即整个框架的宽度
    parent.style.width = defaulOption.maxW + (defaulOption.minW * (defaulOption.col - 1)) + 'px';
    //判断上一个动画是否执行完毕
    
    var oldtime = new Date().getTime();
    var timer = null;
    
    function active(index) {
        
        if (timer) {
            clearInterval(timer);
        }
        var newtime = new Date().getTime();
        if (newtime - oldtime < 300) {
            timer = setTimeout(function () {
                active(index);
            }, 300)
            return;
        }
        oldtime = newtime;
        
        // console.log(index);
        // 下标转坐标
        var currentx = index % defaulOption.col;
        var currenty = parseInt(index / defaulOption.col);
        console.log(index + '===>' + '(' + currentx + ',' + currenty + ')');
        
        for (var x = 0; x < defaulOption.col; x++) {
            for (var y = 0; y < defaulOption.row; y++) {
                // console.log(x, y);
                // 坐标转下标
                var index_ = x + defaulOption.col * y;
                if (currentx == x && currenty == y) {
                    // 最大盒子
                    parent.children[index_].style.width = defaulOption.maxW + 'px';
                    parent.children[index_].style.height = defaulOption.maxH + 'px';
                } else if (currenty == y) {
                    // 同行
                    parent.children[index_].style.width = defaulOption.minW + 'px';
                    parent.children[index_].style.height = defaulOption.maxH + 'px';
                } else if (currentx == x) {
                    // 同一列
                    parent.children[index_].style.width = defaulOption.maxW + 'px';
                    parent.children[index_].style.height = defaulOption.minh + 'px';
                } else {
                    // 最小部分盒子
                    parent.children[index_].style.width = defaulOption.minW + 'px';
                    parent.children[index_].style.height = defaulOption.minh + 'px';
                }
            }
        }
        
    }
    //使页面初始状态为0下标的图片放大
    active(0);

    for (var i = 0; i < parent.children.length; i++) {
        // 使用闭包获得当前鼠标悬浮图片的下标
        /* (function (i) {
            parent.children[i].onmouseenter = function () {
                active(i);
            }
        })(i) */

        // 使用DOM元素设置a方法把i赋值给a方法；
        parent.children[i].a = i;
        parent.children[i].onmouseenter = function () {
            active(this.a);
        }
    }



   


}