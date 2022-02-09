import { RequireRule } from '../constant';
import { ValidateRule } from '../types';
import { nextTick } from '../utils';

import template from './text-field.template';
type Props = {
    id: string;
    label: string;
    type: 'text' | 'email' | 'number';
    placeholder: string;
    text?: string;
    require: boolean;
};

const defaultProps: Props = {
    id: '',
    label: '',
    type: 'text',
    placeholder: '',
    text: '',
    require: false,
};
export default class TextField {
    private template = template;
    private container: string;
    private data: Props;
    private updated: boolean = false;
    private validateRules: ValidateRule[] = [];

    constructor(container: string, data: Props) {
        this.container = container;
        this.data = { ...defaultProps, ...data };

        if (this.data.require) {
            this.addValidateRule(RequireRule);
        }

        nextTick(this.attachEvantHandler);
    }

    private validate = (): ValidateRule | null => {
        const target = this.data.text ? this.data.text.trim() : '';

        const invalidateRules = this.validateRules.filter(validateRule => {
            return validateRule.rule.test(target) !== validateRule.match;
        });

        return invalidateRules.length > 0 ? invalidateRules[0] : null;
    };

    private buildData = () => {
        const isInvalid: ValidateRule | null = this.validate();
        if (this.updated) {
            return {
                ...this.data,
                updated: this.updated,
                valid: !isInvalid,
                validateMessage: !!isInvalid ? isInvalid.message : '',
            };
        } else {
            return {
                ...this.data,
                updated: this.updated,
                valid: true,
                validateMessage: '',
            };
        }
    };

    private attachEvantHandler = () => {
        document.querySelector(this.container)?.addEventListener('change', (e: Event) => {
            const { id, value } = e.target as HTMLInputElement;

            if (id === this.data.id) {
                this.updated = true;
                this.data.text = value;
                this.update();
            }
        });
    };

    private update = () => {
        const container = document.querySelector(`#field-${this.data.id}`) as HTMLElement;
        const div = document.createElement('div');

        div.innerHTML = this.template(this.buildData());
        container.innerHTML = div.children[0].innerHTML;
    };

    get isValid(): boolean {
        return !this.validate();
    }

    addValidateRule = (rule: ValidateRule) => {
        this.validateRules.push(rule);
    };

    render = (append: boolean = false) => {
        const container = document.querySelector(this.container) as HTMLElement;

        if (append) {
            const div = document.createElement('div');
            div.innerHTML = this.template(this.buildData());

            container.appendChild(div.children[0]);
        } else {
            container.innerHTML = this.template(this.buildData());
        }
    };
}
