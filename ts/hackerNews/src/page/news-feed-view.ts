import View from '../core/view';
import { NewsFeeds } from '../types';
import { NewsFeedsApi } from '../core/api';
import { NEWS_URL } from '../config';

const template: string = `
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

export default class NewsFeedView extends View {
    private api: NewsFeedsApi;
    private feeds: NewsFeeds[];
    private list: number;

    constructor(rootId: string, list: number) {
        super(rootId, template);

        this.api = new NewsFeedsApi(NEWS_URL);
        this.feeds = window.store.feeds;
        this.list = list;

        if (this.feeds.length === 0) {
            this.feeds = window.store.feeds = this.api.getData();
            this.makeFeeds();
        }
    }

    private makeFeeds(): void {
        const newFeeds = this.feeds.map(feed => {
            return { ...feed, read: false };
        });
    }

    render(): void {
        window.store.currentPage = Number(location.hash.substring(7) || 1);
        const listCnt: number = this.feeds.length;
        const maxList: number =
            window.store.currentPage * this.list > listCnt
                ? listCnt
                : window.store.currentPage * this.list;
        const maxPage: number = Math.ceil(listCnt / this.list);

        for (let i = (window.store.currentPage - 1) * this.list; i < maxList; i++) {
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
        this.setTemplate(
            'prev_page',
            String(window.store.currentPage > 1 ? window.store.currentPage - 1 : 1)
        );
        this.setTemplate(
            'next_page',
            String(window.store.currentPage < maxPage ? window.store.currentPage + 1 : maxPage)
        );

        this.updateView();
    }
}
