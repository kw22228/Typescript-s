import View from '../core/view';

export interface NewsStore {
    getAllFeeds: () => NewsFeeds[];
    getFeed: (position: number) => NewsFeeds;
    setFeeds: (feeds: NewsFeeds[]) => void;
    makeRead: (id: number) => void;
    hasFeed: boolean;
    numberOfFeed: number;
    prevPage: number;
    nextPage: number;
    currentPage: number;
}

export interface News {
    //readonly를 하면 id의 값을 바꾸지못함.
    readonly id: number;
    readonly time_ago: string;
    readonly title: string;
    readonly url: string;
    readonly user: string;
    readonly content: string;
}

export interface NewsFeeds extends News {
    readonly comments_count: number;
    readonly points: number;
    read?: boolean; // ?속성 : 있을때도 있고 없을때도 있음.
}

export interface NewsDetail extends News {
    readonly comments: NewsComment[];
}

export interface NewsComment extends News {
    readonly comments: NewsComment[];
    readonly level: number;
}

export interface RouteInfo {
    path: string;
    page: View;
    params: RegExp | null;
}
