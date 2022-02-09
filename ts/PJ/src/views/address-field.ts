import { DaumAddress } from '../types';
import { nextTick } from '../utils';
import template from './address-field.template';

type Props = {
    id: string;
    label: string;
    require?: boolean;
};

const defaultProps = {
    id: '',
    label: 'label',
    require: false,
};

export default class AddressField {
    private template = template;
    private container: string;
    private data: Props;
    private address1?: string;
    private zipcode?: string;

    constructor(container: string, data: Props) {
        this.container = container;
        this.data = { ...defaultProps, ...data };

        nextTick(this.attachEventHandler);
    }

    private attachEventHandler = () => {
        const container = document.querySelector(this.container) as HTMLElement;

        container.querySelector('#search-address')?.addEventListener('click', () => {
            new window.daum.Postcode({
                oncomplete: (data: DaumAddress) => {
                    this.address1 = data.roadAddress;
                    this.zipcode = data.sigunguCode;

                    (
                        container.querySelector('#address1') as HTMLInputElement
                    ).value = `(${this.zipcode}) ${this.address1}`;
                },
            }).open();
        });
    };

    get isValid(): boolean {
        return true;
    }

    render = (append: boolean = false) => {
        const container = document.querySelector(this.container) as HTMLElement;

        const div = document.createElement('div');
        div.innerHTML = this.template({ ...this.data });

        container.appendChild(div.children[0]);
    };
}
