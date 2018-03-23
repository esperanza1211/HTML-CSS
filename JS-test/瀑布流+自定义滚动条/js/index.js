loadMore();
createImg();
toFixed();
(function(){
	var wrap = document.querySelector('body');
    var con = document.querySelector('.box-wrap');
	var scrollWrap = document.querySelector('.scroll-wrap');
	mScroll({
		wrap: wrap,
		con: con,
		scrollWrap: scrollWrap,
		scrollIn: function(scroll){
			var disBottom = con.offsetHeight - scroll;
			if(disBottom < window.innerHeight*3){
				loadMore();
			}
			createImg();
			toFixed();
		}
	});
})();
function toFixed(){
	var headerFixed = document.querySelector('.header-fix');
	var header = document.querySelector('.header');
	var headerBottom = header.getBoundingClientRect().bottom;
	if(headerBottom <= 0){
		startMove(headerFixed,{top : 0},200,"linear");
	} else {
		startMove(headerFixed,{top : -50},200,"linear");
	}
} 