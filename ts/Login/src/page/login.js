import TextField from '../views/text-field';
import template from './login.template';
import axios from 'axios';

export default class Login {
    _template = template;
    _container;
    _data;
    _fields = [];
    _loginFail = false;

    constructor(container, data) {
        this._container = document.querySelector(container);
        this._data = data;

        this.init();

        this._container.addEventListener('submit', this.onSubmit);
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

    onSubmit = e => {
        e.preventDefault();

        const loginData = this._fields
            .map(field => {
                const obj = {
                    [field.name]: field.value,
                };
                return obj;
            })
            .reduce((prev, cur) => {
                return { ...prev, ...cur };
            }, {});

        axios
            .post('/api/auth', loginData)
            .then(result => {
                return result.data.result;
            })
            .then(({ id, token }) => {
                const options = {
                    headers: {
                        token,
                    },
                };
                this._data.store.token = token;

                return axios.all([
                    axios.get(`/api/user/${id}`, options),
                    axios.get(`/api/user/${id}/posts`, options),
                ]);
            })
            .then(([profile, posts]) => {
                this._data.store.userProfile = profile.data.result;
                this._data.store.userPosts = posts.data.results;

                location.href = '/#/profile';
            });
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
