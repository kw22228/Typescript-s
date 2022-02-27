import template from './text-field.template';
import CoreField from './core';
import { RequireRule } from '../constatnt';
import { nextTick } from '../utils';

export default class TextField extends CoreField {
    _updated = false;

    constructor(container, data) {
        super(template, container, data);

        if (this._data.require) {
            this.addValidateRule(RequireRule);
        }

        nextTick(this.attachEventHandler);
    }

    buildData = () => {
        const isInvalid = this.validate();

        if (this._updated) {
            return {
                ...this._data,
                updated: this._updated,
                valid: !isInvalid,
                validateMessage: !!isInvalid ? isInvalid.message : '',
            };
        } else {
            return {
                ...this._data,
                updated: this._updated,
                valid: true,
                validateMessage: '',
            };
        }
    };

    onChange = e => {
        const { id, value } = e.target;

        if (id === this._data.id) {
            this._data.text = value;
            this._updated = true;

            this.update();
        }
    };

    update = () => {
        const container = document.querySelector(`#field-${this._data.id}`);
        const div = document.createElement('div');

        div.innerHTML = this._template(this.buildData());
        container.innerHTML = div.children[0].innerHTML;
    };

    attachEventHandler = () => {
        document.querySelector(this._container).addEventListener('change', this.onChange);
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
