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
let con = document.querySelector('#con');

title('https://zhihu-daily.leanapp.cn/api/v1/last-stories');

async function title(url) {
    loading.style.display = 'none';
    let res = await fetch(url);
    let data = await res.json();
    data.STORIES.stories.forEach( story => {
        createLi(story);
    } );
}

function createLi(story) {
    let li = document.createElement('li');
    li.innerHTML = story.title;
    li.onmousemove = ( e => {
        li.style.backgroundColor = 'red';
    } )
    li.onmouseout = ( e => {
        li.style.backgroundColor = '';
    } )
    li.onclick = async function () {
        let res = await fetch('https://zhihu-daily.leanapp.cn/api/v1/contents/' + story.id);
        let data = await res.json();
        content.innerHTML = data.CONTENTS.body;
        contentInfor.innerHTML = '';
    };
    list.appendChild(li);

    con.onclick = async function () {
        let res = await fetch('https://zhihu-daily.leanapp.cn/api/v1/contents/' + story.id);
        let data = await res.json();
        content.innerHTML = data.CONTENTS.body;
        contentInfor.innerHTML = '';
    };

    extraInfor.onclick = async function () {
        let res = await fetch('https://zhihu-daily.leanapp.cn/api/v1/contents/extra/' + story.id);
        let data = await res.json();
        let infor = data.DES;
        contentInfor.innerHTML = '长评论总数' + infor.long_comments + ' ' + '点赞总数' + infor.popularity + ' ' + '短评论总数' + infor.short_comments + ' ' + '评论总数' + infor.comments;
    };

    longComments.onclick = ( () => {
        commentLis(story, '/long-comments');
    } );

    shortComments.onclick = ( () => {
        commentLis(story, '/short-comments');
    } );
}

async function commentLis(story, commentUrl) {
    let res = await fetch('https://zhihu-daily.leanapp.cn/api/v1/contents/' + story.id + commentUrl);
    let data = await res.json();
    content.innerHTML = '';
    let ul = document.createElement('ul');
    data.COMMENTS.comments.forEach( comment => {
        let commentLi = document.createElement('li');
        commentLi.className = 'commentLi';
        let h4 = document.createElement('h4');
        h4.innerHTML = comment.author;
        let p = document.createElement('p');
        p.innerHTML = comment.content;
        let span = document.createElement('span');
        span.innerHTML = '赞' + comment.likes + ' ';
        let time = document.createElement('time');
        time.innerHTML = new Date(comment.time);
        commentLi.appendChild(h4);
        commentLi.appendChild(p);
        commentLi.appendChild(span);
        commentLi.appendChild(time);
        ul.appendChild(commentLi);
    } )
    content.appendChild(ul);
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

listInfor.onclick = async function () {
    list.innerHTML = '';
    loading.style.display = 'block';
    beforeInfor.style.display = 'none';
    let res = await fetch('https://zhihu-daily.leanapp.cn/api/v1/themes');
    let data = await res.json();
    loading.style.display = 'none';
    data.THEMES.others.forEach( other => {
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
        li.onclick = async function () {
            list.innerHTML = '';
            loading.style.display = 'block';
            let res = await fetch('https://zhihu-daily.leanapp.cn/api/v1/themes/' + other.id);
            let data = await res.json();
            loading.style.display = 'none';
            data.THEMEDES.stories.forEach( story => {
                createLi(story);
            } );
        };
        list.appendChild(li);
    } )
};