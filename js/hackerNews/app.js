const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const content = document.createElement('div');

const ajax = new XMLHttpRequest();
ajax.open('GET', NEWS_URL, false);
ajax.send();

const newsFeeds = JSON.parse(ajax.response);
const ul = document.createElement('ul');
const root = document.getElementById('root');

window.addEventListener('hashchange', e => {
    const hashId = location.hash.substring(1);
    ajax.open('GET', CONTENT_URL.replace('@id', hashId), false);
    ajax.send();

    const newsContent = JSON.parse(ajax.response);
    const title = document.createElement('h1');

    title.innerHTML = newsContent.title;
    content.appendChild(title);
});

newsFeeds.map((newsFeed, i) => {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.href = '#' + newsFeed.id;
    a.innerHTML = `${i + 1}. ${newsFeed.title} (${newsFeed.comments_count})`;

    li.appendChild(a);
    ul.appendChild(li);
});

root.appendChild(ul);
root.appendChild(content);
