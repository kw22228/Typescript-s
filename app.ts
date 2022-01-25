// type Store = {
//     //type alias (대문자로 시작하는 컨벤션이 있음)
//     currentPage: number;
//     feeds: NewsFeeds[]; //NewsFeeds 데이터가 들어감
// };

interface Store {
    currentPage: number;
    feeds: NewsFeeds[];
}

// type News = {
//     id: number;
//     time_ago: string;
//     title: string;
//     url: string;
//     user: string;
//     content: string;
// };

interface News {
    //readonly를 하면 id의 값을 바꾸지못함.
    readonly id: number;
    readonly time_ago: string;
    readonly title: string;
    readonly: string;
    readonly user: string;
    readonly content: string;
}

//인터섹션 type alias
// type NewsFeeds = News & {
//     comments_count: number;
//     points: number;
//     read?: boolean; // ?속성 : 있을때도 있고 없을때도 있음.
// };
interface NewsFeeds extends News {
    readonly comments_count: number;
    readonly points: number;
    read?: boolean; // ?속성 : 있을때도 있고 없을때도 있음.
}

// type NewsDetail = News & {
//     comments: NewsComment[];
// };
interface NewsDetail extends News {
    readonly comments: NewsComment[];
}

// type NewsComment = News & {
//     comments: NewsComment[];
//     level: number;
// };

interface NewsComment extends News {
    readonly comments: NewsComment[];
    readonly level: number;
}

const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const root: HTMLElement | null = document.getElementById('root');
const store: Store = {
    currentPage: 1,
    feeds: [],
};

// getData<NewsFeeds[]>(NEWS_URL) => 제네릭을 사용하여 유동적으로 type이 들어올 수 있도록 한다.
const getData = <AjaxResponse>(url: string): AjaxResponse => {
    const ajax: XMLHttpRequest = new XMLHttpRequest();
    ajax.open('GET', url, false);
    ajax.send();

    return JSON.parse(ajax.response);
};

const makeFeeds = (feeds: NewsFeeds[]): NewsFeeds[] => {
    const newFeeds = feeds.map(feed => {
        return { ...feed, read: false };
    });

    return newFeeds;
};

const render = (html: string): void => {
    if (root) {
        root.innerHTML = html;
    } else {
        console.log('Undefined root Element');
    }
};

const getNewsList = (): void => {
    const newsList = [];
    let newsFeeds: NewsFeeds[] = store.feeds;
    if (newsFeeds.length === 0) {
        newsFeeds = store.feeds = makeFeeds(getData<NewsFeeds[]>(NEWS_URL));
    }
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
                            <h1 class="font-extrabold">
                                <a href="#">Hacker News</a>
                            </h1>
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
        <div class="p-6 ${
            !newsFeeds[i].read ? 'bg-white' : 'bg-green-500'
        } mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
            <div class="flex">
            <div class="flex-auto">
                <a href="#/show/${newsFeeds[i].id}">${newsFeeds[i].title}</a>  
            </div>
            <div class="text-center text-sm">
                <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${
                    newsFeeds[i].comments_count
                }</div>
            </div>
            </div>
            <div class="flex mt-3">
            <div class="grid grid-cols-3 text-sm text-gray-500">
                <div><i class="fas fa-user mr-1"></i>${newsFeeds[i].user}</div>
                <div><i class="fas fa-heart mr-1"></i>${
                    newsFeeds[i].points
                }</div>
                <div><i class="far fa-clock mr-1"></i>${
                    newsFeeds[i].time_ago
                }</div>
            </div>  
            </div>
        </div>    
        `);
    }
    template = template.replace('{{__news_list__}}', newsList.join(''));
    template = template.replace(
        '{{__prev_page__}}',
        String(store.currentPage > 1 ? store.currentPage - 1 : 1)
    );
    template = template.replace(
        '{{__next_page__}}',
        String(store.currentPage < maxPage ? store.currentPage + 1 : maxPage)
    );

    render(template);
};

const getNewsDetail = (): void => {
    const hashId = location.hash.substring(7);
    const newsContent = getData<NewsDetail>(CONTENT_URL.replace('@id', hashId));
    let template = `
        <div class="bg-gray-600 min-h-screen pb-8">
            <div class="bg-white text-xl">
                <div class="mx-auto px-4">
                <div class="flex justify-between items-center py-6">
                    <div class="flex justify-start">
                        <h1 class="font-extrabold">
                            <a href="#">Hacker News</a>
                        </h1>
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

    store.feeds.find(feed => {
        if (feed.id === Number(hashId)) {
            feed.read = true;
        }

        return feed.id === Number(hashId);
    });

    template = template.replace(
        '{{__comments__}}',
        makeComment(newsContent.comments)
    );

    render(template);
};

const makeComment = (comments: NewsComment[]): string => {
    const commentStr: string[] = [];

    comments.map(comment => {
        commentStr.push(`
            <div style="margin-left: ${comment.level * 40}px;" class="mt-4">
                <div class="text-gray-400">
                    <i class="fa fa-sort-up mr-2"></i>
                    <strong>${comment.user}</strong> ${comment.time_ago}
                </div>
                <p class="text-gray-700">${comment.content}</p>
            </div>
        `);

        if (comment.comments.length > 0) {
            commentStr.push(makeComment(comment.comments));
        }
    });

    return commentStr.join('');
};

const router = (): void => {
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
