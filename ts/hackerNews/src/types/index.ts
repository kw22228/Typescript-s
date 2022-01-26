import View from '../core/view';
// type Store = {
//     //type alias (대문자로 시작하는 컨벤션이 있음)
//     currentPage: number;
//     feeds: NewsFeeds[]; //NewsFeeds 데이터가 들어감
// };

export interface Store {
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

export interface News {
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
export interface NewsFeeds extends News {
    readonly comments_count: number;
    readonly points: number;
    read?: boolean; // ?속성 : 있을때도 있고 없을때도 있음.
}

// type NewsDetail = News & {
//     comments: NewsComment[];
// };
export interface NewsDetail extends News {
    readonly comments: NewsComment[];
}

// type NewsComment = News & {
//     comments: NewsComment[];
//     level: number;
// };

export interface NewsComment extends News {
    readonly comments: NewsComment[];
    readonly level: number;
}

export interface RouteInfo {
    path: string;
    page: View;
}
