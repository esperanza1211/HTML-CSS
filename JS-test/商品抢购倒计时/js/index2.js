(function () {
    var times = document.querySelectorAll('.times');
    var inp = document.querySelectorAll('.but');
    var now = 0;
    /**点击事件 */
    for(var i = 0; i < inp.length; i++){
        inp[i].onclick = function(index){
            return function(){
                toTime(index);
                clearInterval(inp[index].timer);
                inp[index].timer = setInterval(function(){toTime(index)},1000);
            }
        }(i);
    }
    /**倒计时 */
    function toTime(index) {
        var nexttimes = times[index].querySelectorAll('input');
        var targetDate = new Date(nexttimes[0].value,nexttimes[1].value - 1,nexttimes[2].value,nexttimes[3].value,nexttimes[4].value,nexttimes[5].value);
        var targetTime = targetDate.getTime();
        var nowTime = new Date().getTime();
        var countdown = document.querySelectorAll('.countdown');
        var disTime = parseInt((targetTime - nowTime)/1000);
        if(disTime < 0){
            clearInterval(inp[index].timer);
            return;
        }
        var hours = parseInt(disTime/3600);
        var minutes = parseInt((disTime%3600)/60);
        var seconds = parseInt(disTime%60);
        var downTime = toDB(hours)+toDB(minutes)+toDB(seconds);
        var countdownTime = countdown[index].querySelectorAll('.countdown-time');
        for(var j = 0; j < countdownTime.length; j++){
            countdownTime[j].innerHTML = downTime[j];
        }
        if(disTime === 0) {
            clearInterval(inp[index].timer);
            mask(index);
            mark(index);            
            doshake(index);
            toshow(index,now);
            now++;
        }
    }
    /*返回两位数 */
    function toDB(nub){
        return nub < 10?"0"+nub:""+nub;
    }

    var lis = document.querySelectorAll('.list li');
    /**覆盖层*/
    function mask(index) {
        var masks = lis[index].querySelector('.mask');
        masks.style.display = "block";
    }
    /**抢购结束 */
    function mark(index) {
        var marks = lis[index].querySelector('.mark');
        marks.style.display = "inline-block";
        startMove(marks,{width:100},300,"linear");
    }
    /*抖动 */
    var shakeLength = 20;
    function doshake(index) {
        if(lis[index].timer){
            return;
        }
        var arr = [];
        var start = css(lis[index],"left");
        for(var i = shakeLength; i > 0 ; i -= 2){
            arr.push(i,-i);
        }
        arr.push(0);
        lis[index].timer = setInterval(function(){
            if(!arr.length){
                clearInterval(lis[index].timer);
                lis[index].timer = 0;
            } else {
                css(lis[index],"left",start + arr.shift());
            }
        },30);
    }
    /**下面的列表 */
    function toshow(index,show) {
        var footlis = document.querySelectorAll('.footlist li');
        var liH = css(footlis[0],"height");
        footlis[index].style.display = "block";
        css(footlis[index],"top",show*liH);
        if(show%2 == 0) {
            footlis[index].style.backgroundColor = "#fff";
        } else {
            footlis[index].style.backgroundColor = "#ccc";
        }
    }
})()
