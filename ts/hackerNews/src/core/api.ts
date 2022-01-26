import { NewsFeeds, NewsDetail } from '../types';
export class Api {
    ajax: XMLHttpRequest;
    url: string;

    constructor(url: string) {
        this.ajax = new XMLHttpRequest();
        this.url = url;
    }
    //외부에서 hint가 나오지않음 (protected)
    protected getRequest<AjaxResponse>(): AjaxResponse {
        this.ajax.open('GET', this.url, false);
        this.ajax.send();

        return JSON.parse(this.ajax.response);
    }
}

export class NewsFeedsApi extends Api {
    getData(): NewsFeeds[] {
        return this.getRequest<NewsFeeds[]>();
    }
}

export class NewsDetailApi extends Api {
    getData(id: string): NewsDetail {
        return this.getRequest<NewsDetail>();
    }
}
