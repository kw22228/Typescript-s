import { NewsFeeds, NewsStore } from './types';

export default class Store implements NewsStore {
    private feeds: NewsFeeds[];
    private _currentPage: number;

    constructor() {
        this.feeds = [];
        this._currentPage = 1;
    }

    get currentPage(): number {
        return this._currentPage;
    }

    set currentPage(page: number) {
        if (page <= 0) return;
        this._currentPage = page;
    }

    get nextPage(): number {
        return this._currentPage + 1;
    }

    get prevPage(): number {
        return this._currentPage > 1 ? this._currentPage - 1 : 1;
    }

    get numberOfFeed(): number {
        return this.feeds.length;
    }

    get hasFeed(): boolean {
        return this.feeds.length > 0;
    }

    getAllFeeds(): NewsFeeds[] {
        return this.feeds;
    }

    getFeed(position: number): NewsFeeds {
        return this.feeds[position];
    }

    setFeeds(feeds: NewsFeeds[]): void {
        this.feeds = feeds.map((feed: NewsFeeds): NewsFeeds => {
            return { ...feed, read: false };
        });
    }

    makeRead(id: number): void {
        const feed = this.feeds.find((feed: NewsFeeds) => {
            return feed.id === id;
        });

        if (feed) {
            feed.read = true;
        }
    }
}
