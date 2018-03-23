window.now = 0;
function loadMore() {
    var length = 40;
    var start = now * length;
    var end = (now + 1) * length;
   
    if(start >= data.length) {
        return;
    }
    end = end > data.length ? data.length : end;
    for(var i = start; i < end; i++) {
        createLi(data[i]);
    }
    now++;
}

function createLi(data) {
    var list = document.querySelector('.list');
    var li = document.createElement('li');
    li.dataset.src = data;
    var a = document.createElement('a');
    a.href = '#';
    li.appendChild(a);
    var detail = document.createElement('div');
    detail.className = 'detail';
    var contentTitle = document.createElement('p');
    contentTitle.className = 'content-title';
    contentTitle.innerHTML = '柔软保暖套装';
    detail.appendChild(contentTitle);
    var userWrap = document.createElement('div');
    userWrap.className = 'user-wrap';
    var userImg = document.createElement('img');
    userImg.className = 'userImg';
    userImg.src = 'img/userImg/userImg (1).jpg';
    userWrap.appendChild(userImg);
    var userName = document.createElement('span');
    userName.className = 'userName';
    userName.innerHTML= '蘑菇搭配购';
    userWrap.appendChild(userName);
    detail.appendChild(userWrap);
    li.appendChild(detail);
    list.appendChild(li);

}

function createImg(){
	var list = document.querySelector('.list');
	var lis = list.children;
	for(var i = 0; i < lis.length; i++){
		var lisRect = lis[i].getBoundingClientRect();
		if(lisRect.bottom > 0 
		&& lisRect.top < window.innerHeight
		&& !lis[i].dataset.isLoad){
			lis[i].dataset.isLoad = true;
			showImage(lis[i]);
		}
	}
}
function showImage(li){
    var listImg = document.createElement('img');
    listImg.className = 'listImg';
    listImg.src = li.dataset.src;
	listImg.onload = function(){
        li.children[0].appendChild(listImg);
		setTimeout(function(){
			css(listImg,"opacity",1);
		},100);
	};
}