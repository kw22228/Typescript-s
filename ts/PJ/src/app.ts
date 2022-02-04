import template from './app.template';
import { AnyObject } from './types';
import TextField from './views/text-field';
export default class App {
    template = template;
    container: HTMLElement;
    data: AnyObject;
    fields: AnyObject[];

    constructor(container: string, data: AnyObject = {}) {
        this.container = document.querySelector(container) as HTMLElement;
        this.data = data;
        this.fields = [];

        this.init();
    }

    private init = () => {
        const nameField = new TextField('#required-fields', {
            id: 'name',
            label: '이름',
            type: 'text',
            placeholder: '이름을 입력해주세요.',
            require: true,
        });

        const idField = new TextField('#required-fields', {
            id: 'id',
            label: '아이디',
            type: 'text',
            placeholder: '아이디를 입력해주세요.',
            require: true,
        });

        const emailField = new TextField('#required-fields', {
            id: 'email',
            label: '이메일',
            type: 'email',
            placeholder: '이메일을 입력해주세요',
            require: true,
        });

        this.fields.push(nameField);
        this.fields.push(idField);
        this.fields.push(emailField);
    };

    render = () => {
        this.container.innerHTML = this.template(this.data);
        this.fields.map(field => {
            field.render(true);
        });
    };
}
