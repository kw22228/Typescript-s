import { NewsDetailApi } from '../core/api';
import { CONTENT_URL } from '../config';
import { NewsComment, NewsDetail, NewsStore } from '../types';
import View from '../core/view';

const template: string = `
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

export default class NewsDetailView extends View {
    private store: NewsStore;

    constructor(rootId: string, store: NewsStore) {
        super(rootId, template);

        this.store = store;
    }

    private makeComment(comments: NewsComment[]): string {
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

    render = (id: string): void => {
        const api = new NewsDetailApi(CONTENT_URL.replace('@id', id));
        api.getDataWithPromise((data: NewsDetail) => {
            const { title, content, comments } = data;

            this.store.makeRead(Number(id));

            this.setTemplate('currentPage', this.store.currentPage.toString());
            this.setTemplate('title', title);
            this.setTemplate('content', content);
            this.setTemplate('comments', this.makeComment(comments));

            this.updateView();
        });
    };
}
