import { RouteInfo } from '../types';
import View from './view';

export default class Router {
    private routeTable: RouteInfo[];
    private defaultRoute: RouteInfo | null;
    constructor() {
        window.addEventListener('hashchange', this.route.bind(this));

        this.routeTable = [];
        this.defaultRoute = null;
    }

    setDefaultPage(page: View): void {
        this.defaultRoute = {
            path: '',
            page,
        };
    }

    addRoutePath(path: string, page: View): void {
        this.routeTable.push({
            path, //프로퍼티의 스키마와 값이 같은경우 생략
            page,
        });
    }

    route() {
        const routePath = location.hash;
        if (routePath === '' && this.defaultRoute) {
            this.defaultRoute.page.render();
        }

        for (const route of this.routeTable) {
            if (routePath.indexOf(route.path) >= 0) {
                route.page.render();
                break;
            }
        }
    }
}
