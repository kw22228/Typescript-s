import Profile from './page/profile';
import Login from './page/login';
import Store from './store';
import Page404 from './page/page-404';

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
            //프로필
            const profile = new Profile('#root', {
                store,
            });
            profile.render();
            break;
        default:
            const page404 = new Page404('#root');
            page404.render();
            break;
    }
}

window.addEventListener('hashchange', router);
document.addEventListener('DOMContentLoaded', router);
