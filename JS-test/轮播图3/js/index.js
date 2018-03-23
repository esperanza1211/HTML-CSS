window.onload = function(){
    (function(){
        var olist = document.querySelector('.list');
        var lis = document.querySelectorAll('.list li');
        var lis2 = document.querySelectorAll('.list2 li');
        var prev = document.querySelector('#prev');
        var next = document.querySelector('#next');
        var noe = 0;
        for(var i = 0; i < lis.length; i++){
            // prev.onclick = function(){
            //     if(i<=0){
                    
            //     }

            // }
            next.onclick = function(){
                startMove(lis[i],margin-left,-420);
            }
        }
        function css(el,attr,val){
            if(arguments.length > 2){
                el.style[attr] = val;
            } else {
                return getComputedStyle(el)[attr];            
            }
        }
        function startMove(el,attr,target){
            clearInterval(el.timer);
            var now = parseFloat(css(el,attr))
            var speed = target>now?10:-10;
            el.timer = setInterval(function(){
                var val = parseFloat(css(el,attr));
                if(val == target){
                    clearInterval(el.timer);
                } else {
                    val = val + speed;
                    css(el,attr,val + "px");
                }
            },20);
        }
    })()
}