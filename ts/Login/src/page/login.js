import TextField from '../views/text-field';
import template from './login.template';

export default class Login {
    _template = template;
    _container;
    _data;
    _fields = [];

    constructor(container, data) {
        this._container = document.querySelector(container);
        this._data = data;

        this.init();
    }

    init = () => {
        const idField = new TextField('#login-fields', {
            id: 'userid',
            label: '아이디',
            type: 'text',
            placeholder: '아이디를 입력해주세요.',
            require: true,
        });
        const passwordField = new TextField('#login-fields', {
            id: 'password',
            label: '패스워드',
            type: 'password',
            placeholder: '패스워드를 입력해주세요.',
            require: true,
        });

        this._fields.push(idField);
        this._fields.push(passwordField);
    };

    render = () => {
        this._container.innerHTML = this._template({
            ...this._data,
        });

        this._fields.map(field => {
            field.render(true);
        });
    };
}
