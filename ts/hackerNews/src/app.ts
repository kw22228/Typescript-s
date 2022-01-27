import Router from './core/router';
import { NewsDetailView, NewsFeedView } from './page';
import Store from './store';

const store = new Store();
const router: Router = new Router();
const newsFeedView: NewsFeedView = new NewsFeedView('root', 8, store);
const newsDetailView: NewsDetailView = new NewsDetailView('root', store);

router.setDefaultPage(newsFeedView);
router.addRoutePath('/page/', newsFeedView, /page\/(\d+)/);
router.addRoutePath('/show/', newsDetailView, /show\/(\d+)/);

router.route();
