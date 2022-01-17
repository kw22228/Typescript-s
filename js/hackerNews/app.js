const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const root = document.getElementById('root');
const store = {
    currentPage: 1,
};

const getData = url => {
    const ajax = new XMLHttpRequest();
    ajax.open('GET', url, false);
    ajax.send();

    return JSON.parse(ajax.response);
};

const getNewsList = () => {
    const newsList = [];
    const newsFeeds = getData(NEWS_URL);
    const list = 8;
    const listCnt = newsFeeds.length;
    const maxList =
        store.currentPage * list > listCnt ? listCnt : store.currentPage * list;
    const maxPage = Math.ceil(listCnt / list);

    newsList.push('<ul>');
    for (let i = (store.currentPage - 1) * list; i < maxList; i++) {
        newsList.push(`
            <li>
                <a href="#/show/${newsFeeds[i].id}">
                ${i + 1}. ${newsFeeds[i].title} (${newsFeeds[i].comments_count})
                </a>
            </li>
        `);
    }
    newsList.push('</ul>');

    newsList.push(`
        <div>
            <a href="#/page/${
                store.currentPage > 1 ? store.currentPage - 1 : 1
            }">이전</a>
            <a href="#/page/${
                store.currentPage < maxPage ? store.currentPage + 1 : maxPage
            }">다음</a>
        </div>
    `);
    root.innerHTML = newsList.join('');
};

const getNewsDetail = () => {
    const hashId = location.hash.substring(7);

    const newsContent = getData(CONTENT_URL.replace('@id', hashId));
    const title = document.createElement('h1');

    root.innerHTML = `
        <h1>${newsContent.title}</h1>

        <div>
            <a href="#/page/${store.currentPage}">목록으로</a>
        </div>
    `;
};

const router = () => {
    const routePath = location.hash;

    if (routePath === '') {
        getNewsList();
    } else if (routePath.indexOf('#/page/') >= 0) {
        store.currentPage = Number(routePath.substring(7));
        getNewsList();
    } else {
        getNewsDetail();
    }
};
window.addEventListener('hashchange', router);

router();
