import template from './text-field.template';
import CoreField from './core';
export default class TextField extends CoreField {
    constructor(container, data) {
        super(template, container, data);
    }

    buildData = () => {
        return {
            ...this._data,
        };
    };

    // render = (append = false) => {
    //     const container = document.querySelector(this._container);

    //     if (append) {
    //         const div = document.createElement('div');
    //         div.innerHTML = this._template(this.buildData());

    //         container.appendChild(div.children[0]);
    //     }
    // };
}
