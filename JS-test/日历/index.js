(function(){
    /*---------------生成日历结构-----------------*/
    var list2 = document.querySelectorAll('.list2');
    var liW = 31;
    var list = document.querySelectorAll('.list');
    var lisL = list[0].querySelectorAll('li');
    var lisR = list[1].querySelectorAll('li');
    for(var i = 0; i < lisL.length; i++){
        lisL[i].style.left = i*liW+'px';
        lisR[i].style.left = i*liW+'px';
    }
    var inner = '';
    for(var i = 0; i < 6; i++){
        for(var j = 0; j < 7; j++){
            inner += '<li style="left:'+j*liW+'px;top:'+i*liW+'px"></li>';
        }
    }
    list2[0].innerHTML = inner;
    list2[1].innerHTML = inner;
    var list3 = document.querySelectorAll('.list3');
    var list4 = document.querySelectorAll('.list4');
    var lisW = 54;
    var lisH = 71;
    var innerMon = '';
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 4; j++){
            innerMon += '<li style="left:'+lisW*j+'px;top:'+lisH*i+'px"></li>';
        }
    }
    list3[0].innerHTML = innerMon;
    list3[1].innerHTML = innerMon;
    list4[0].innerHTML = innerMon;
    list4[1].innerHTML = innerMon;
})();
(function(){
    /*------------生成P标签的内容----------*/
    var Datelist = document.querySelector('.Datelist');
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var date2 = date.getDate();
    var nowDate = document.querySelector('.nowDate');
    var dateP = document.querySelector('.date');
    nowDate.innerHTML = year + '年' + month + '月' + date2 + '日';
    dateP.innerHTML = year + '年' + month + '月';
    var lisL2 = document.querySelectorAll('.nowDatelist .list2 li');
    var lisR2 = document.querySelectorAll('.nextDatelist .list2 li');
    var showIndex = date2;

    /*----------生成日期内容-----------*/
    lisCon(lisL2);
    function lisCon(li){
        for(var i = 0; i < li.length; i++){
            li[i].innerHTML = '';
        }
        var j = 1;
        for(var i = 0; i < li.length; i++){
            if(j > lastDay(year,month)){
                break;
            } else if (i >= toweek(year,month)){
                li[i].innerHTML = j;
                j++;
            }
        }
        nowClass(li,month,year);
    }

    /*-----------给当前日期加标记-----------*/
    function nowClass(li,month,year){
        var date = new Date();
        var newyear = date.getFullYear();
        var newmonth = date.getMonth()+1;
        var newdate2 = date.getDate();
        for(var i = 0; i < li.length; i++){
            li[i].style.color = '';
            li[i].className = '';
            if(li[i].innerHTML == showIndex){
                li[i].className = 'show';
            }
            if(month == newmonth && year == newyear && li[i].innerHTML == date2){
               li[i].style.color = 'blue';
           }
        }
    }

    /*--------------鼠标移入，点击------------*/
    for(var i = 0; i < lisL2.length; i++){
        lisL2[i].index = i;
        lisL2[i].onclick = function () {
            for(var j = 0; j < lisL2.length; j++){
                lisL2[j].className = '';
            }
            if(lisL2[this.index].innerHTML != ''){
                lisL2[this.index].className = 'show';
            }
            showIndex = lisL2[this.index].innerHTML;
        }
        lisL2[i].onmouseover = function() {
            toclearClass(lisL2);
            if(lisL2[this.index].className != 'show'){
                lisL2[this.index].className = 'active';
            }
        }
        lisL2[i].onmouseout = function() {
            toclearClass(lisL2);
        }
        lisR2[i].index = i;
        lisR2[i].onclick = function () {
            for(var j = 0; j < lisR2.length; j++){
                lisR2[j].className = '';
            }
            if(lisR2[this.index].innerHTML != ''){
                lisR2[this.index].className = 'show';
            }
            showIndex = lisR2[this.index].innerHTML;
        }
        lisR2[i].onmouseover = function() {
            toclearClass(lisR2);
            if(lisR2[this.index].className != 'show'){
                lisR2[this.index].className = 'active';
            }
        }
        lisR2[i].onmouseout = function() {
            toclearClass(lisR2);
        }
    }

    /*---------获取每个月1号的星期，每个月有多少天----------*/
    function toweek(year,month) {
        return new Date(year,month-1,1).getDay();
    }
    function lastDay(year,month){
        return new Date(year,month,0).getDate();
    }

    /*-------------切换到当前日期--------------*/
    nowDate.onclick = function () {
        var nowYear = date.getFullYear();
        var nowMonth = date.getMonth()+1;
        var nowDate2 = date.getDate();
        showIndex = nowDate2;
        var tenyearL = parseInt(year/10) +'0';
        var tenyearR = parseInt(year/10) +'9';
        if(dateP.innerHTML == year + '年'){
            year = date.getFullYear();
            month = date.getMonth()+1;
            changeOrigin(yearList,month);
            startMove(yearList,{transform:3},300,"linear",function(){
                yearList.style.display = 'none';
                css(yearList,"transform",1);
                css(yearList,"width",440);                            
                dateP.innerHTML = year + '年' + month + '月';
                Datelist.style.display = 'block';
                lisCon(lisL2);
            });
        } else if(dateP.innerHTML == tenyearL + '-' + tenyearR){
            year = date.getFullYear();
            month = date.getMonth()+1;
            changeOrigin(tenyearList,month);
            startMove(tenyearList,{transform:3},300,"linear",function(){
                tenyearList.style.display = 'none';
                css(tenyearList,"transform",1);
                css(tenyearList,"width",440);                            
                dateP.innerHTML = year + '年' + month + '月';
                Datelist.style.display = 'block';
                lisCon(lisL2);
            });
        } else if(nowYear < year || (nowYear == year && nowMonth < month)){
            autoPlay(lisR2,-220,lisL2,0);
        } else if(nowYear > year || (nowYear == year && nowMonth > month)){
            autoPlay(lisL2,0,lisR2,-220);
        } else if (nowYear == year && nowMonth == month){
            lisCon(lisL2);
        }
    }
    function autoPlay(li,L,li2,L2){
        var nowYear = date.getFullYear();
        var nowMonth = date.getMonth()+1;
        lisCon(li);
        css(Datelist,"left",L);
        year = nowYear;
        month = nowMonth;
        dateP.innerHTML = year + '年' + month + '月';
        lisCon(li2);
        startMove(Datelist,{left:L2},500,"linear");
    }

    /*----------------生成月的内容----------------*/
    var yearList = document.querySelector('.yearList');
    var list3 = document.querySelectorAll('.list3');
    var lisL3 = document.querySelectorAll('.nowyearList .list3 li');
    var lisR3 = document.querySelectorAll('.nextyearList .list3 li');
    toMonth(lisL3);
    toMonth(lisR3);
    function toMonth(li) {
        for(var i = 0; i < li.length; i++){
            li[i].innerHTML = (i+1)+'月';
        }
    }
    /*--------生成年的内容----------*/
    var tenyearList = document.querySelector('.tenyearList');
    var list4 = document.querySelectorAll('.list4');
    var lisL4 = document.querySelectorAll('.nowtenyearList .list4 li');
    var lisR4 = document.querySelectorAll('.nexttenyearList .list4 li');
    toyear(lisL4);
    toyear(lisR4);
    function toyear(li) {
        var tenyear = Number(parseInt(year/10) + '0');
        for(var i = 0; i < 10; i++){
            li[i+1].innerHTML = (tenyear + i);
        }
    }

    /*----------日期切换月, 月切换年------------*/
    dateP.onclick = function () {
        if(dateP.innerHTML == year + '年' + month + '月'){
            lisCon(lisL2);
            changeOrigin(Datelist,month);
            startMove(Datelist,{transform:0},300,"linear",function(){
                Datelist.style.display = 'none';
                css(Datelist,"transform",1);
                css(Datelist,"width",440);
                dateP.innerHTML = year + '年';
                yearList.style.display = 'block';
                for(var j = 0; j < lisL3.length; j++){
                    lisL3[j].className = '';
                }
                lisL3[month-1].className = 'show';
            });
        } else {
            toyear(lisL4);
            changeOrigin(yearList,month);
            startMove(yearList,{transform:0},300,"linear",function(){
                yearList.style.display = 'none';
                css(yearList,"transform",1);
                css(yearList,"width",440);
                var tenyearL = parseInt(year/10) +'0';
                var tenyearR = parseInt(year/10) +'9';
                dateP.innerHTML = tenyearL+'-'+tenyearR;
                tenyearList.style.display = 'block';
                for(var j = 0; j < lisL4.length; j++){
                    lisL4[j].className = '';
                }
                var nub = year - tenyearL;
                lisL4[nub+1].className = 'show';
            });
        }
    }
    /*----------改变元素的transform的原点-----------*/
    function changeOrigin(li,month) {
        css(li,"left",0);
        css(li,"width",220);
        var oT = Math.ceil(month/4);
        var oL = month%4;
        if(oL == 0){
            oL = 4;
        }
        var oW = 55;
        var oH = 72;
        var originL = (oL-1)*oW+oW/2;
        var originT = (oT-1)*oH+oH/2;
        cssOrigin(li,"transformOrigin",originL,originT);//左 上
    }
    /*-------月切换日期的动画-----------*/
    function doMove(li){
        startMove(yearList,{transform:3},300,"linear",function(){
            yearList.style.display = 'none';
            css(yearList,"transform",1);
            css(yearList,"width",440);
            dateP.innerHTML = year + '年' + month + '月';
            Datelist.style.display = 'block';
            showIndex = '1';
            lisCon(li);
        });
    }
    /*---------------月的鼠标移入和点击-------------*/
    for(var i = 0; i < lisL3.length; i++){
        lisL3[i].index = i;
        lisL3[i].onclick = function () {
            for(var j = 0; j < lisL3.length; j++){
                lisL3[j].className = '';
            }
            if(lisL3[this.index].innerHTML != ''){
                lisL3[this.index].className = 'show';
            }
            month = this.index + 1;
            changeOrigin(yearList,month);
            doMove(lisL2);
        }
        lisL3[i].onmouseover = function() {
            toclearClass(lisL3);            
            if(lisL3[this.index].className != 'show'){
                lisL3[this.index].className = 'active';
            }
        }
        lisL3[i].onmouseout = function() {
            toclearClass(lisL3);
        }
        lisR3[i].index = i;
        lisR3[i].onclick = function () {
            for(var j = 0; j < lisR3.length; j++){
                lisR3[j].className = '';
            }
            if(lisR3[this.index].innerHTML != ''){
                lisR3[this.index].className = 'show';
            }
            month = this.index + 1;
            changeOrigin(yearList,month);
            doMove(lisR2);
        }
        lisR3[i].onmouseover = function() {
            toclearClass(lisR3);
            if(lisR3[this.index].className != 'show'){
                lisR3[this.index].className = 'active';
            }
        }
        lisR3[i].onmouseout = function() {
            toclearClass(lisR3);
        }
    }
    /*----------------- 年的鼠标移入和点击 -------------------*/
    for(var i = 0; i < lisL4.length; i++){
        lisL4[i].index = i;
        // lisL4[i].onclick = function () {
        //     for(var j = 0; j < lisL3.length; j++){
        //         lisL4[j].className = '';
        //     }
        //     if(lisL4[this.index].innerHTML != ''){
        //         lisL4[this.index].className = 'show';
        //     }
        //     month = this.index + 1;
        //     changeOrigin(yearList,month);
        //     doMove(lisL3);
        // }
        lisL4[i].onmouseover = function() {
            toclearClass(lisL4);            
            if(lisL3[this.index].className != 'show'){
                lisL3[this.index].className = 'active';
            }
        }
        lisL4[i].onmouseout = function() {
            toclearClass(lisL4);
        }
        lisR4[i].index = i;
        // lisR4[i].onclick = function () {
        //     for(var j = 0; j < lisR3.length; j++){
        //         lisR3[j].className = '';
        //     }
        //     if(lisR3[this.index].innerHTML != ''){
        //         lisR3[this.index].className = 'show';
        //     }
        //     month = this.index + 1;
        //     changeOrigin(yearList,month);
        //     doMove(lisR3);
        // }
        lisR4[i].onmouseover = function() {
            toclearClass(lisR4);
            if(lisR4[this.index].className != 'show'){
                lisR4[this.index].className = 'active';
            }
        }
        lisR4[i].onmouseout = function() {
            toclearClass(lisR4);
        }
    }

    /*--------------清楚所有class--------------*/
    function toclearClass(lis) {
        for(var j = 0; j < lis.length; j++){
            if(lis[j].className == 'active'){
                lis[j].className = '';
            }
        }
    }

    /*---------左右切换----------*/
    var prev = document.querySelector('.prev');
    prev.onclick = function(){
        if(dateP.innerHTML == year + '年' + month + '月'){
            toprev();
        } else if(dateP.innerHTML == year + '年'){
            toyearPrev();
        } else {
            totenyearPrev();
        }
    }
    function toprev() {
        lisCon(lisR2);
        css(Datelist,"left",-220);
        month = month - 1;
        if(month < 1){
            year = year - 1;
            month = 12;
        }
        dateP.innerHTML = year + '年' + month + '月';
        showIndex = 1;
        lisCon(lisL2);
        startMove(Datelist,{left:0},500,"linear");
    }
    function toyearPrev() {
        css(yearList,"left",-220);
        year = year - 1;
        dateP.innerHTML = year + '年';
        month = 1;
        showIndex = month+'月';
        nowClass(lisL3,month,year);
        startMove(yearList,{left:0},500,"linear");
    }
    function totenyearPrev() {
        toyear(lisR4);
        css(tenyearList,"left",-220);
        year = year - 10;
        var tenyearL = parseInt(year/10) + '0';
        var tenyearR = parseInt(year/10) + '9';
        dateP.innerHTML = tenyearL+'-'+tenyearR;
        toyear(lisL4);
        showIndex = tenyearL;
        nowClass(lisL4,month,year);
        startMove(tenyearList,{left:0},500,"linear");
    }

    var next = document.querySelector('.next');
    next.onclick = function(){
        if(dateP.innerHTML == year + '年' + month + '月'){
            tonext();
        } else if(dateP.innerHTML == year + '年'){
            toyearNext();
        } else {
            totenyearNext();
        }
    }
    function tonext() {
        lisCon(lisL2);
        css(Datelist,"left",0);
        month = month + 1;
        if(month > 12){
            year = year + 1;
            month = 1;
        }
        dateP.innerHTML = year + '年' + month + '月';
        showIndex = 1;
        lisCon(lisR2);
        startMove(Datelist,{left:-220},500,"linear");
    }
    function toyearNext() {
        month = 1;
        showIndex = month+'月';
        nowClass(lisL3,month,year);
        css(yearList,"left",0);
        year = year + 1;
        dateP.innerHTML = year + '年';
        month = 1;
        showIndex = month+'月';
        nowClass(lisR3,month,year);
        startMove(yearList,{left:-220},500,"linear");
    }
    function totenyearNext() {
        toyear(lisL4);
        css(tenyearList,"left",00);
        year = year + 10;
        var tenyearL = parseInt(year/10) + '0';
        var tenyearR = parseInt(year/10) + '9';
        dateP.innerHTML = tenyearL+'-'+tenyearR;
        toyear(lisR4);
        showIndex = tenyearL;
        nowClass(lisR4,month,year);
        startMove(tenyearList,{left:-220},500,"linear");
    }
})();

/*--------------------- 右边 -----------------------*/
(function(){
    function toTime(){
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        return toDB(hours) +':'+ toDB(minutes) +':'+ toDB(seconds);
    }
    function toDB(nub) {
        return nub < 10 ? "0" + nub : "" + nub;
    };
    function toweek(){
        var date = new Date();
        return date.getDay();
    }
    var arr = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
    ]
    /*生成时间,星期*/
    var time = document.querySelector('.time');
    var week = document.querySelector('.week');
    var timer = 0;
    tonowTime();
    function tonowTime() {
        time.innerHTML = toTime();
        week.innerHTML = arr[toweek()];
    }
    timer = setInterval(function(){
        tonowTime()
    },1000);
    
    /* 生成时钟的刻度 */
    var pointList = document.querySelector('.pointList');
    var inner = '';
    for(var i = 0; i < 60; i++){
        inner += '<li style="transform:rotate('+i*6+'deg)"></li>';
    }
    pointList.innerHTML = inner;
    /* 时钟指针转动 */
    var hoursNeedle = document.querySelector('.hoursNeedle');
	var minutesNeedle = document.querySelector('.minutesNeedle');
	var secondsNeedle = document.querySelector('.secondsNeedle');
	toclock();
	setInterval(toclock,1000);
	function toclock(){
		var time = new Date();
		var timeSeconds = time.getSeconds();
		var timeMinutes = time.getMinutes() + timeSeconds/60;
		var timeHours = time.getHours() + timeMinutes/60;
		secondsNeedle.style.transform = "rotate("+timeSeconds*6+"deg)";
		minutesNeedle.style.transform = "rotate("+timeMinutes*6+"deg)";
		hoursNeedle.style.transform = "rotate("+timeHours*30+"deg)";
    }
})();