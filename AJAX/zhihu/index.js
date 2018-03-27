let loading = document.querySelector('.loading');
let list = document.querySelector('#list');
let nowInfor = document.querySelector('#nowInfor');
let beforeInfor = document.querySelector('#beforeInfor');
let listInfor = document.querySelector('#listInfor');
let extraInfor = document.querySelector('#extraInfor');
let longComments = document.querySelector('#long_comments');
let shortComments = document.querySelector('#short_comments');
let content = document.querySelector('#content');
let contentInfor = document.querySelector('#contentInfor');

title('https://zhihu-daily.leanapp.cn/api/v1/last-stories');

/**
 * 创建左边信息
 */
function title(url) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        loading.style.display = 'none';
        let data = JSON.parse(this.responseText);
        data.STORIES.stories.forEach( story => {
            createLi(story);
        } )
    };
    xhr.open('get', url, true);
    xhr.send();
}

/**
 * 生成左侧列表的li，及右侧文章
 */
function createLi(story) {
    let li = document.createElement('li');
    li.innerHTML = story.title;
    li.onmousemove = ( e => {
        li.style.backgroundColor = 'red';
    } )
    li.onmouseout = ( e => {
        li.style.backgroundColor = '';
    } )
    li.onclick = ( () => {
        let xhr = new XMLHttpRequest();
        xhr.onload = ( () => {
            content.innerHTML = JSON.parse(xhr.responseText).CONTENTS.body;
        } );
        xhr.open('get', 'https://zhihu-daily.leanapp.cn/api/v1/contents/' + story.id, true);
        xhr.send();
    } );
    list.appendChild(li);

    extraInfor.onclick = ( () => {
        let xhr = new XMLHttpRequest();
        xhr.onload = ( () => {
            let infor = JSON.parse(xhr.responseText).DES;
            contentInfor.innerHTML = '长评论总数' + infor.long_comments + ' ' + '点赞总数' + infor.popularity + '短评论总数' + infor.short_comments + '评论总数' + infor.comments;
        } );
        xhr.open('get', 'https://zhihu-daily.leanapp.cn/api/v1/contents/extra/' + story.id, true);
        xhr.send();
    } );

    longComments.onclick = ( () => {
        commentLis(story, '/long-comments');
    } );

    shortComments.onclick = ( () => {
        commentLis(story, '/short-comments');
    } );
}

/**
 * 生成右侧文章的评论
 */
function commentLis(story, commentUrl) {
    let xhr = new XMLHttpRequest();
        xhr.onload = ( () => {
            let comments = JSON.parse(xhr.responseText).COMMENTS.comments;
            let ul = document.createElement('ul');
            comments.forEach( comment => {
                let commentLi = document.createElement('li');
                commentLi.className = 'commentLi';



                
            } )
        } );
        xhr.open('get', 'https://zhihu-daily.leanapp.cn/api/v1/contents/' + story.id + commentUrl, true);
        xhr.send();
}

let data = new Date();
let n = 0;

beforeInfor.onclick = ( () => {
    n = n + 1;
    let preDate = new Date(data.getTime() - 24*60*60*1000*n);
    let year =  preDate.getFullYear();
    let month = preDate.getMonth() + 1;
    let date2 = preDate.getDate();
    let day = String(year) + month + date2;
    title('https://zhihu-daily.leanapp.cn/api/v1/before-stories/' + day);
} );

nowInfor.onclick = ( () => {
    list.innerHTML = '';
    beforeInfor.style.display = 'block';
    title('https://zhihu-daily.leanapp.cn/api/v1/last-stories');
    n = 0;
} );

listInfor.onclick = ( () => {
    list.innerHTML = '';
    loading.style.display = 'block';
    beforeInfor.style.display = 'none';
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        loading.style.display = 'none';
        let listData = JSON.parse(this.responseText);
        listData.THEMES.others.forEach( other => {
            let li = document.createElement('li');
            let h3 = document.createElement('h3');
            h3.innerHTML = other.name;
            let p = document.createElement('p');
            p.innerHTML = other.description;
            li.appendChild(h3);
            li.appendChild(p);
            li.onmousemove = ( e => {
                li.style.backgroundColor = 'red';
            } )
            li.onmouseout = ( e => {
                li.style.backgroundColor = '';
            } )
            li.onclick = ( () => {
                list.innerHTML = '';
                loading.style.display = 'block';
                let xhr = new XMLHttpRequest();
                xhr.onload = ( () => {
                    loading.style.display = 'none';
                    let ListInfor = JSON.parse(xhr.responseText);
                    ListInfor.THEMEDES.stories.forEach( story => {
                        createLi(story);
                    } );
                } );
                xhr.open('get', 'https://zhihu-daily.leanapp.cn/api/v1/themes/' + other.id, true);
                xhr.send();
            } );
            list.appendChild(li);
        } )
    };
    xhr.open('get', 'https://zhihu-daily.leanapp.cn/api/v1/themes', true);
    xhr.send();
} );