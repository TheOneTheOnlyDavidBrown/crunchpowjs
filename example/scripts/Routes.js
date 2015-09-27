// puts routes on the router class

import Router from './Router'
window.router = window.router || new Router();
router.state({
  name: 'hodor/hodor',
  templateUrl: 'templates/hodor.html'
});
router.state({
  name: 'hodor/:id',
  templateUrl: 'templates/hodorid.html'
});
router.state({
  name: 'hodor/:id/details',
  templateUrl: 'templates/hodorid.html'
});
router.state({
  name: 'hodor/:id/:subid',
  templateUrl: 'templates/hodorsubid.html'
});
router.state({
  name: 'list',
  templateUrl: 'templates/list.html'
});
router.state({
  name: '/',
  templateUrl: 'templates/list.html'
});
