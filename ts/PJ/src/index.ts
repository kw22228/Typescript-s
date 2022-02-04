import App from './app';
import { AnyObject } from './types';

declare global {
    interface Window {
        Handlebars: {
            compile: (template: string) => (data: AnyObject) => string;
        };
        daum: any;
    }
}

const data = {
    title: 'Typescript & Javascript CSR Sign up !!',
};
const app = new App('#root', data);
app.render();
