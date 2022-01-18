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
    let template = `
        <div class="bg-gray-600 min-h-screen">
            <div class="bg-white text-xl">
                <div class="mx-auto px-4">
                    <div class="flex justify-between items-center py-6">
                        <div class="flex justify-start">
                            <h1 class="font-extrabold">Hacker News</h1>
                        </div>
                        <div class="items-center justify-end">
                            <a href="#/page/{{__prev_page__}}" class="text-gray-500">
                                Previous
                            </a>
                            <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">
                                Next
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-4 text-2xl text-gray-700">
                {{__news_list__}}
            </div>
        </div>
    `;

    for (let i = (store.currentPage - 1) * list; i < maxList; i++) {
        newsList.push(`
        <div class="p-6 bg-white mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
            <div class="flex">
            <div class="flex-auto">
                <a href="#/show/${newsFeeds[i].id}">${newsFeeds[i].title}</a>  
            </div>
            <div class="text-center text-sm">
                <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${newsFeeds[i].comments_count}</div>
            </div>
            </div>
            <div class="flex mt-3">
            <div class="grid grid-cols-3 text-sm text-gray-500">
                <div><i class="fas fa-user mr-1"></i>${newsFeeds[i].user}</div>
                <div><i class="fas fa-heart mr-1"></i>${newsFeeds[i].points}</div>
                <div><i class="far fa-clock mr-1"></i>${newsFeeds[i].time_ago}</div>
            </div>  
            </div>
        </div>    
        `);
    }
    template = template.replace('{{__news_list__}}', newsList.join(''));
    template = template.replace(
        '{{__prev_page__}}',
        store.currentPage > 1 ? store.currentPage - 1 : 1
    );
    template = template.replace(
        '{{__next_page__}}',
        store.currentPage < maxPage ? store.currentPage + 1 : maxPage
    );

    root.innerHTML = template;
};

const getNewsDetail = () => {
    const hashId = location.hash.substring(7);
    const newsContent = getData(CONTENT_URL.replace('@id', hashId));
    let template = `
        <div class="bg-gray-600 min-h-screen pb-8">
            <div class="bg-white text-xl">
                <div class="mx-auto px-4">
                <div class="flex justify-between items-center py-6">
                    <div class="flex justify-start">
                    <h1 class="font-extrabold">Hacker News</h1>
                    </div>
                    <div class="items-center justify-end">
                    <a href="#/page/${store.currentPage}" class="text-gray-500">
                        <i class="fa fa-times"></i>
                    </a>
                    </div>
                </div>
                </div>
            </div>

            <div class="h-full border rounded-xl bg-white m-6 p-4 ">
                <h2>${newsContent.title}</h2>
                <div class="text-gray-400 h-20">
                ${newsContent.content}
                </div>

                {{__comments__}}

            </div>
        </div>
    `;

    const makeComment = (comments, depth = 0) => {
        const commentStr = [];
        comments.map(comment => {
            commentStr.push(`
                <div style="margin-left: ${depth * 40}px;" class="mt-4">
                    <div class="text-gray-400">
                        <i class="fa fa-sort-up mr-2"></i>
                        <strong>${comment.user}</strong> ${comment.time_ago}
                    </div>
                    <p class="text-gray-700">${comment.content}</p>
                </div>
            `);

            if (comment.comments.length > 0) {
                commentStr.push(makeComment(comment.comments, depth + 1));
            }
        });

        return commentStr.join('');
    };

    template = template.replace(
        '{{__comments__}}',
        makeComment(newsContent.comments)
    );
    root.innerHTML = template;
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
