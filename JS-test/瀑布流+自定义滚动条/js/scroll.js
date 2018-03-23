/*
	init: {
		wrap: ,
		con: ,
		scrollWarp:,
		scrollIn: function(scroll){
			// 滚动条位置 发生改变， scroll 滚动条位置
		}
	}
*/
function mScroll(init){
	var wrap = init.wrap;
	var scrollWrap = init.scrollWrap;
	var con = init.con;
	var track = scrollWrap.querySelector('.scroll-track');
	var bar = scrollWrap.querySelector(".scroll-bar");
	var scroll = 0;// 当前滚动条的位置
	var conHeight  =  con.offsetHeight;
	bar.timer = 0;
    setBarHeight();//注意如果后期修改了con中的内容，记得重新设置高度
    
	scrollWrap.addEventListener('mouseup', function(e) {
		clearInterval(bar.timer);
	});

	/* 拖拽操作元素位置 */
	var lastMouse = 0;
	bar.addEventListener('mousedown', function(e) {
		lastMouse = e.clientY;
		document.addEventListener('mousemove', move);
		document.addEventListener('mouseup', up);
		e.preventDefault();
	});

	function move(e){
		clearInterval(bar.timer);
		var nowMouse = e.clientY;
		var dis = nowMouse - lastMouse;
		scroll = dis + scroll;
		setScroll();
		lastMouse = nowMouse;
	}
	function up(e){
		document.removeEventListener('mousemove', move);
		document.removeEventListener('mouseup', up);
	}

	// 在轨道摁下，快速移动滚动条至鼠标点击区域
	track.addEventListener('mousedown', function(e) {
		var rect = track.getBoundingClientRect();
		var target = e.clientY - rect.top - bar.offsetHeight/2;//鼠标相对于轨道的坐标
		clearInterval(bar.timer);
		bar.timer = setInterval(function(){
			var dis = (target - scroll)/5;//把鼠标 和 滚动条之间的位置分成 5份， 每次只加 5分一下
			scroll = Math.round(scroll + dis);
			setScroll();
			// 当鼠标触碰 到 滚动条停止动画
			if(bar.offsetTop < scroll
			&&bar.offsetTop + bar.offsetHeight > scroll){
				clearInterval(bar.timer);
			}
		},20);
	});

	/* 拨动滚轮移动滚动条位置 */
	mouseScroll(wrap,function(){
		toUp()
	},function(){
		toDown();
	});

	// 滚动条向上滚动
	function toUp(){
		scroll -= 5;
		setScroll();
	} 
	//滚动条向下滚动
	function toDown(){
		scroll += 5;
		setScroll();
	}
	//滚动条连续向上滚动
	function loopUp(){
		clearInterval(bar.timer);
		bar.timer = setInterval(toUp,30);
	}
	//滚动条连续向下滚动 
	function loopDown(){
		clearInterval(bar.timer);
		bar.timer = setInterval(toDown,30);
	}
	// 根据scroll的数值 来同步滚动条位置
	function setScroll(){
		listenerChange();
		var maxScroll = track.clientHeight - bar.offsetHeight;
		if(scroll < 0){
			scroll = 0;
		} else if(scroll > maxScroll){
			scroll = maxScroll;
		}
		css(bar,"top",scroll);
		
		setConTop();
	}

	// 根据比例计算bar的高度
	function setBarHeight(){
		var scale = wrap.clientHeight/con.offsetHeight;
		css(bar,"height",track.clientHeight * scale);
	}
	// 根据scroll的数值，同步con的top值
	function setConTop(){
		// bar移动的距离相对track来说移动了多少，con 也就移动对应的多少比例
		var maxBarMove = track.clientHeight - bar.offsetHeight;
		var scale = scroll/maxBarMove;
		var maxConMove = conHeight - wrap.clientHeight;
		var t = -scale * maxConMove;
		css(con,"marginTop",t);
		init.scrollIn&&init.scrollIn(-t);
	}

	//根据比例重新计算bar的位置
	function resetScroll(){
		var maxConMove = conHeight - wrap.clientHeight;
		var conScale = -css(con,"marginTop")/maxConMove;
		var maxBarMove = track.clientHeight - bar.offsetHeight;
		scroll = maxBarMove*conScale;
		console.log(conScale,maxBarMove*conScale);
	}

	// 检测内容高度是否发生变化
	function listenerChange(){
		if(conHeight != con.offsetHeight){
			conHeight = con.offsetHeight;
			setBarHeight();
			resetScroll();
		}
	}
}
function mouseScroll(el,up,down){
	el.addEventListener('DOMMouseScroll', function(e) {
		if(e.detail > 0){
			down&&down();
		} else {
			up&&up();
		} 
		e.preventDefault();
	});
	el.addEventListener('mousewheel', function(e) {
		if(e.wheelDelta < 0){
			down&&down();
		} else {
			up&&up();
		}
		e.preventDefault();
	});
}