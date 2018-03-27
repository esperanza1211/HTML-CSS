let text = document.querySelector('#text');
let btn = document.querySelector('#btn');
let list = document.querySelector('#list');
let inputs = document.querySelectorAll('#classification input');

btn.onclick = ( () => {
    var script = document.createElement('script');
    let num = [...inputs].findIndex( (input, index) => {
        return input.checked;
    } );
    switch (num) {
        case 0:
            script.src = 'https://api.douban.com/v2/book/search?q='+ text.value + '&callback=fnB';
            break;
        case 1:
            script.src = 'http://api.douban.com/v2/movie/search?q='+ text.value + '&callback=fnMo';
            break;
        case 2:
            script.src = 'https://api.douban.com/v2/music/search?q='+ text.value + '&callback=fnMu';
            break;
    };
    document.body.appendChild(script);
} );

function fnB(data) {
    list.innerHTML = data.books.map( item => `
    <li>
        <h3><a href="">${item.title}</a></h3>
        <p>评分:${item.rating.average}</p>
        <p>${item.author}</p>
    </li>
    ` ).join('');
}

function fnMo(data) {
    list.innerHTML = data.subjects.map( item => `
    <li>
        <h3><a href="${item.url}">${item.title} ${item.original_title} (${item.year})</a></h3>
        <p>评分:${item.rating.average}</p>
        <p>${item.genres}</p>
    </li>
    ` ).join('');
}

function fnMu(data) {
    list.innerHTML = data.musics.map( item => `
    <li>
        <h3><a href="">${item.title}</a></h3>
        <p>评分:${item.rating.average}</p>
        <p>${item.author[0].name}</p>
    </li>
    ` ).join('');
}