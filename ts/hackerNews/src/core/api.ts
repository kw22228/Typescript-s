import { NewsFeeds, NewsDetail } from '../types';

export class Api {
    xhr: XMLHttpRequest;
    url: string;

    constructor(url: string) {
        this.xhr = new XMLHttpRequest();
        this.url = url;
    }
    //외부에서 hint가 나오지않음 (protected)
    protected getRequestWithXHR<AjaxResponse>(callback: (data: AjaxResponse) => void): void {
        this.xhr.open('GET', this.url);
        this.xhr.addEventListener('load', () => {
            callback(JSON.parse(this.xhr.response) as AjaxResponse);
        });
        this.xhr.send();

        return;
    }

    protected getRequestWithPromise<AjaxResponse>(callback: (data: AjaxResponse) => void): void {
        fetch(this.url)
            .then(res => res.json())
            .then(callback)
            .catch(() => {
                console.log('data fetching error');
            });
    }

    protected async request<AjaxResponse>(): Promise<AjaxResponse> {
        const response = await fetch(this.url);

        return (await response.json()) as AjaxResponse;
    }
}

export class NewsFeedsApi extends Api {
    constructor(url: string) {
        super(url);
    }

    getDataWithXHR(callback: (data: NewsFeeds[]) => void): void {
        return this.getRequestWithXHR<NewsFeeds[]>(callback);
    }

    getDataWithPromise(callback: (data: NewsFeeds[]) => void): void {
        return this.getRequestWithPromise<NewsFeeds[]>(callback);
    }

    async getData(): Promise<NewsFeeds[]> {
        return this.request<NewsFeeds[]>();
    }
}

export class NewsDetailApi extends Api {
    constructor(url: string) {
        super(url);
    }

    getDataWithXHR(callback: (data: NewsDetail) => void): void {
        return this.getRequestWithXHR<NewsDetail>(callback);
    }

    getDataWithPromise(callback: (data: NewsDetail) => void): void {
        return this.getRequestWithPromise<NewsDetail>(callback);
    }

    async getData(): Promise<NewsDetail> {
        return this.request<NewsDetail>();
    }
}
