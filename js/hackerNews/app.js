const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const content = document.createElement('div');

const getData = url => {
    const ajax = new XMLHttpRequest();
    ajax.open('GET', url, false);
    ajax.send();

    return JSON.parse(ajax.response);
};

const newsFeeds = getData(NEWS_URL);
const ul = document.createElement('ul');
const root = document.getElementById('root');

window.addEventListener('hashchange', e => {
    const hashId = location.hash.substring(1);

    const newsContent = getData(CONTENT_URL.replace('@id', hashId));
    const title = document.createElement('h1');

    title.innerHTML = newsContent.title;
    content.appendChild(title);
});

newsFeeds.map((newsFeed, i) => {
    const div = document.createElement('div');

    div.innerHTML = `
        <li>
            <a href="#${newsFeed.id}">
            ${i + 1}. ${newsFeed.title} (${newsFeed.comments_count})
            </a>
        </li>
    `;

    ul.appendChild(div.firstElementChild);
});

root.appendChild(ul);
root.appendChild(content);
