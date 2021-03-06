import { RequireRule } from '../constant';
import { ValidateRule } from '../types';
import { nextTick } from '../utils';
import template from './password-field.template';

enum StrongLevel {
    None = 0,
    Light,
    Medium,
    Heavy,
}
const StrongMessage: [string, string, string, string] = [
    '금지된 수준',
    '심각한 수준',
    '보통 수준',
    '강력한 암호,',
];

type Props = {
    id: string;
    label: string;
    text?: string;
    require?: boolean;
    placeholder?: string;
    strong?: StrongLevel;
};

const DefaultProps: Props = {
    id: '',
    label: 'label',
    text: '',
    require: true,
    placeholder: '',
    strong: StrongLevel.None,
};

export default class PasswordField {
    private template = template;
    private container: string;
    private data: Props;
    private updated: boolean = false;
    private validateRules: ValidateRule[] = [];

    constructor(container: string, data: Props) {
        this.container = container;
        this.data = { ...DefaultProps, ...data };

        if (this.data.require) {
            this.addValidateRule(RequireRule);
        }

        nextTick(this.attachEventHandler);
    }
    private onChange = (e: Event) => {
        const { value, id } = e.target as HTMLInputElement;

        if (id === this.data.id) {
            this.updated = true;
            this.data.text = value;
            this.update();
        }
    };

    private attachEventHandler = () => {
        document.querySelector(this.container)?.addEventListener('change', this.onChange);
    };

    private update = () => {
        const container = document.querySelector(`#field-${this.data.id}`) as HTMLElement;
        const div = document.createElement('div');

        div.innerHTML = this.template(this.buildData());

        container.innerHTML = div.children[0].innerHTML;
    };

    private buildData = () => {
        let strongLevel = -1;
        const isInvalid: ValidateRule | null = this.validate();

        if (this.data.text!.length > 0) {
            strongLevel++;
        }

        if (this.data.text!.length > 12) {
            strongLevel++;
        }

        if (/[!@#$%^&*()]/.test(this.data.text!)) {
            strongLevel++;
        }

        if (/\d/.test(this.data.text!)) {
            strongLevel++;
        }

        return {
            ...this.data,
            updated: this.updated,
            valid: this.updated ? !isInvalid : true,
            strongMessage: strongLevel < 0 ? '' : StrongMessage[strongLevel],
            strongLevel0: strongLevel >= 1,
            strongLevel1: strongLevel >= 2,
            strongLevel2: strongLevel >= 3,
            strongLevel3: strongLevel >= 4,
        };
    };

    private validate = (): ValidateRule | null => {
        const target = this.data.text ? this.data.text.trim() : '';

        const invalidateRules = this.validateRules.filter(validateRule => {
            return validateRule.rule.test(target) !== validateRule.match;
        });

        return invalidateRules.length > 0 ? invalidateRules[0] : null;
    };
    get name(): string {
        //name getter
        return this.data.id;
    }

    get value(): string {
        //value getter
        return this.data.text || '';
    }

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
