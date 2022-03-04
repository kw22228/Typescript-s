import template from './page-404.template';
export default class Page404 {
    #template = template;
    #container;

    constructor(container) {
        this.#container = document.querySelector(container);
    }

    render = () => {
        this.#container.innerHTML = this.#template();
    };
}
