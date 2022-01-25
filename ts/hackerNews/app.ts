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

interface RouteInfo {
    path: string;
    page: View;
}

const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const root: HTMLElement | null = document.getElementById('root');
const store: Store = {
    currentPage: 1,
    feeds: [],
};

//믹스인 기능 (targetClass에 baseClass배열의 class를 상속시킨다.)
function applyApiMixins(targetClass: any, baseClass: any[]): void {
    baseClass.forEach(baseClass => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
            const descriptor = Object.getOwnPropertyDescriptor(baseClass.prototype, name);

            if (descriptor) {
                Object.defineProperty(targetClass.prototype, name, descriptor);
            }
        });
    });
}

// Api Classes
class Api {
    //외부에서 hint가 나오지않음 (protected)
    protected getRequest<AjaxResponse>(url: string): AjaxResponse {
        const ajax = new XMLHttpRequest();
        ajax.open('GET', url, false);
        ajax.send();

        return JSON.parse(ajax.response);
    }
}

class NewsFeedsApi {
    getData(): NewsFeeds[] {
        return this.getRequest<NewsFeeds[]>(NEWS_URL);
    }
}

class NewsDetailApi {
    getData(id: string): NewsDetail {
        return this.getRequest<NewsDetail>(CONTENT_URL.replace('@id', id));
    }
}

//View Classes
abstract class View {
    template: string; //원본
    renderTemplate: string;
    root: HTMLElement;
    htmlArr: string[];

    constructor(rootId: string, template: string) {
        const rootElement = document.getElementById(rootId);

        if (!rootElement) {
            throw 'Undefined root Element';
        }

        this.root = rootElement;
        this.template = template;
        this.renderTemplate = template;
        this.htmlArr = [];
    }

    updateView(): void {
        this.root.innerHTML = this.renderTemplate;
        this.renderTemplate = this.template;
    }

    setTemplate(key: string, value: string): void {
        this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value);
    }

    addHtml(htmlStr: string): void {
        this.htmlArr.push(htmlStr);
    }

    getHtml(): string {
        const snapshot: string = this.htmlArr.join('');
        this.clearHtmlArr();

        return snapshot;
    }

    clearHtmlArr(): void {
        this.htmlArr = [];
    }

    abstract render(): void;
}

class Router {
    routeTable: RouteInfo[];
    defaultRoute: RouteInfo | null;
    constructor() {
        window.addEventListener('hashchange', this.route.bind(this));

        this.routeTable = [];
        this.defaultRoute = null;
    }

    setDefaultPage(page: View): void {
        this.defaultRoute = {
            path: '',
            page,
        };
    }

    addRoutePath(path: string, page: View): void {
        this.routeTable.push({
            path, //프로퍼티의 스키마와 값이 같은경우 생략
            page,
        });
    }

    route() {
        const routePath = location.hash;
        if (routePath === '' && this.defaultRoute) {
            this.defaultRoute.page.render();
        }

        for (const route of this.routeTable) {
            if (routePath.indexOf(route.path) >= 0) {
                route.page.render();
                break;
            }
        }
    }
}

class NewsFeedView extends View {
    api: NewsFeedsApi;
    feeds: NewsFeeds[];
    list: number;

    constructor(rootId: string, list: number) {
        let template: string = `
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
        super(rootId, template);

        this.api = new NewsFeedsApi();
        this.feeds = store.feeds;
        this.list = list;

        if (this.feeds.length === 0) {
            this.feeds = store.feeds = this.api.getData();
            this.makeFeeds();
        }
    }

    makeFeeds(): void {
        const newFeeds = this.feeds.map(feed => {
            return { ...feed, read: false };
        });
    }

    render(): void {
        store.currentPage = Number(location.hash.substring(7) || 1);
        const listCnt: number = this.feeds.length;
        const maxList: number =
            store.currentPage * this.list > listCnt ? listCnt : store.currentPage * this.list;
        const maxPage: number = Math.ceil(listCnt / this.list);

        for (let i = (store.currentPage - 1) * this.list; i < maxList; i++) {
            const { id, title, comments_count, points, time_ago, user, read } = this.feeds[i];
            this.addHtml(`
        <div class="p-6 ${
            !read ? 'bg-white' : 'bg-green-500'
        } mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
            <div class="flex">
            <div class="flex-auto">
                <a href="#/show/${id}">${title}</a>  
            </div>
            <div class="text-center text-sm">
                <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${comments_count}</div>
            </div>
            </div>
            <div class="flex mt-3">
            <div class="grid grid-cols-3 text-sm text-gray-500">
                <div><i class="fas fa-user mr-1"></i>${user}</div>
                <div><i class="fas fa-heart mr-1"></i>${points}</div>
                <div><i class="far fa-clock mr-1"></i>${time_ago}</div>
            </div>  
            </div>
        </div>    
        `);
        }
        this.setTemplate('news_list', this.getHtml());
        this.setTemplate('prev_page', String(store.currentPage > 1 ? store.currentPage - 1 : 1));
        this.setTemplate(
            'next_page',
            String(store.currentPage < maxPage ? store.currentPage + 1 : maxPage)
        );

        this.updateView();
    }
}

class NewsDetailView extends View {
    constructor(rootId: string) {
        let template: string = `
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
                        <a href="#/page/{{__currentPage__}}" class="text-gray-500">
                            <i class="fa fa-times"></i>
                        </a>
                    </div>
                </div>
                </div>
            </div>

            <div class="h-full border rounded-xl bg-white m-6 p-4 ">
                <h2>{{__title__}}</h2>
                <div class="text-gray-400 h-20">
                {{__content__}}
                </div>

                {{__comments__}}

            </div>
        </div>
        `;

        super(rootId, template);
    }

    makeComment(comments: NewsComment[]): string {
        comments.map(comment => {
            this.addHtml(`
                <div style="margin-left: ${comment.level * 40}px;" class="mt-4">
                    <div class="text-gray-400">
                        <i class="fa fa-sort-up mr-2"></i>
                        <strong>${comment.user}</strong> ${comment.time_ago}
                    </div>
                    <p class="text-gray-700">${comment.content}</p>
                </div>
            `);

            if (comment.comments.length > 0) {
                this.addHtml(this.makeComment(comment.comments));
            }
        });

        return this.getHtml();
    }

    render() {
        const hashId = location.hash.substring(7);
        const api = new NewsDetailApi();
        const newsDetail: NewsDetail = api.getData(hashId);

        store.feeds.find(feed => {
            if (feed.id === Number(hashId)) {
                feed.read = true;
            }

            return feed.id === Number(hashId);
        });

        this.setTemplate('currentPage', String(store.currentPage));
        this.setTemplate('title', newsDetail.title);
        this.setTemplate('content', newsDetail.content);
        this.setTemplate('comments', this.makeComment(newsDetail.comments));

        this.updateView();
    }
}

interface NewsFeedsApi extends Api {}
interface NewsDetailApi extends Api {}
applyApiMixins(NewsFeedsApi, [Api]);
applyApiMixins(NewsDetailApi, [Api]);

const router: Router = new Router();
const newsFeedView: NewsFeedView = new NewsFeedView('root', 8);
const newsDetailView: NewsDetailView = new NewsDetailView('root');

router.setDefaultPage(newsFeedView);
router.addRoutePath('/page/', newsFeedView);
router.addRoutePath('/show/', newsDetailView);

router.route();
