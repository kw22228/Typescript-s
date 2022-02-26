import template from './login.template';
export default class Login {
    _template = template;
    _container;
    _data;

    constructor(container, data) {
        this._container = document.querySelector(container);
        this._data = data;
    }

    init = () => {};
}
