import Login from './page/login';

function router() {
    const path = location.hash;

    switch (path) {
        case '':
        case '#/login':
            const login = new Login('#root', {
                //store,
                title: 'JS & TS Login',
            });
            login.render();
            break;
    }
}

window.addEventListener('hashchange', router);
document.addEventListener('DOMContentLoaded', router);
