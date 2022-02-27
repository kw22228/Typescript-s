const DefaultProps = {
    id: '',
    text: '',
    label: '',
    type: 'text',
    placeholder: '',
    require: false,
};

export default class CoreField {
    _template;
    _container;
    _data;
    _validateRules = [];

    constructor(template, container, data) {
        this._template = template;
        this._container = container;
        this._data = { ...DefaultProps, ...data };
    }

    addValidateRule = rule => {
        this._validateRules.push(rule);
    };

    validate = () => {
        const text = this._data.text ? this._data.text.trim() : '';

        const invalidateRules = this._validateRules.filter(validateRule => {
            return validateRule.rule.test(text) !== validateRule.match;
        });

        return invalidateRules.length > 0 ? invalidateRules[0] : null;
    };

    get name() {
        return this._data.id;
    }

    get value() {
        return this.data.text || '';
    }

    render = (append = false) => {
        const container = document.querySelector(this._container);

        if (append) {
            const div = document.createElement('div');
            div.innerHTML = this._template(this.buildData());

            container.appendChild(div.children[0]);
        } else {
            container.innerHTML = this._template(this.buildData());
        }
    };
}
