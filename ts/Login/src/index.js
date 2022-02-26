import Login from './page/login';

function router() {
    const path = location.hash;

    switch (path) {
        case '':
        case '#/login':
            console.log('login page');
            const login = new Login('#root', {
                //store,
                title: 'JS & TS Login',
            });
    }
}

window.addEventListener('hashchange', router);
document.addEventListener('DOMContentLoaded', router);
