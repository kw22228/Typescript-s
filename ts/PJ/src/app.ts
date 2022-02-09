import template from './app.template';
import { CantContainWhitespace, CantStartNumber, MinimumLengthLimit } from './constant';
import { AnyObject } from './types';
import { TextField, PasswordField } from './views/';
import AddressField from './views/address-field';
export default class App {
    template = template;
    container: HTMLElement;
    data: AnyObject;
    fields: AnyObject[];
    active: boolean = false;

    constructor(container: string, data: AnyObject = {}) {
        this.container = document.querySelector(container) as HTMLElement;
        this.data = data;
        this.fields = [];

        this.init();

        // setInterval(this.validFieldMonitor, 1000 / 30);
        setTimeout(this.validFieldMonitor, 0);
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

        const passwordField = new PasswordField('#required-fields', {
            id: 'password',
            label: '비밀번호',
            placeholder: '비밀번호를 입력해주세요.',
        });

        const addressField = new AddressField('#required-fields', {
            id: 'address',
            label: '배송지 주소',
        });

        idField.addValidateRule(CantContainWhitespace);
        idField.addValidateRule(CantStartNumber);
        idField.addValidateRule(MinimumLengthLimit(3));

        emailField.addValidateRule(CantContainWhitespace);

        this.fields.push(nameField);
        this.fields.push(idField);
        this.fields.push(emailField);
        this.fields.push(passwordField);
        this.fields.push(addressField);
    };

    private validFieldMonitor = () => {
        const btnJoin = this.container.querySelector('#btn-join') as HTMLButtonElement;

        const valid = this.fields.filter(field => {
            return field.isValid;
        });

        if (valid.length === this.fields.length) {
            this.active = true;
            btnJoin.classList.remove('bg-gray-300');
            btnJoin.classList.add('bg-green-500');
        } else {
            this.active = false;
            btnJoin.classList.remove('bg-green-500');
            btnJoin.classList.add('bg-gray-300');
        }
    };

    render = () => {
        this.container.innerHTML = this.template(this.data);
        this.fields.map(field => {
            field.render(true);
        });

        this.container.addEventListener('submit', (e: Event) => {});
    };
}
