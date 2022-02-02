//View Classes
export default abstract class View {
    private template: string; //원본
    private renderTemplate: string;
    private root: HTMLElement;
    private htmlArr: string[];

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

    protected updateView(): void {
        this.root.innerHTML = this.renderTemplate;
        this.renderTemplate = this.template;
    }

    protected setTemplate(key: string, value: string): void {
        this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value);
    }

    protected addHtml(htmlStr: string): void {
        this.htmlArr.push(htmlStr);
    }

    protected getHtml(): string {
        const snapshot: string = this.htmlArr.join('');
        this.clearHtmlArr();

        return snapshot;
    }

    private clearHtmlArr(): void {
        this.htmlArr = [];
    }

    abstract render(...params: string[]): void;
}
