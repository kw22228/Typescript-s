const DefaultProps = {
    id: '',
    text: '',
    label: 'label',
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

    render = (append = false) => {
        console.log('core render');
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
