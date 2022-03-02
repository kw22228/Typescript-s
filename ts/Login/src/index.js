import Login from './page/login';
import Store from './store';

const store = new Store();

function router() {
    const path = location.hash;

    switch (path) {
        case '':
        case '#/login':
            const login = new Login('#root', {
                store,
                title: 'JS & TS Login',
            });
            login.render();
            break;
        case '#/profile':
    }
}

window.addEventListener('hashchange', router);
document.addEventListener('DOMContentLoaded', router);
