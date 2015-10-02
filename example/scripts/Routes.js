// puts routes on the router class

import Router from './Router'
  // TODO: not attach this to the global namespace
window.router = window.router || new Router();
router.state({
  name: '/users',
  templateUrl: 'templates/userindex.html'
});
router.state({
  name: '/user/:id',
  templateUrl: 'templates/user.html'
});
router.state({
  name: '/user/:id/details',
  templateUrl: 'templates/userdetails.html'
});
router.state({
  name: '/user/:id/:subid',
  templateUrl: 'templates/usersub.html'
});
router.state({
  name: '/list',
  templateUrl: 'templates/list.html'
});
router.state({
  name: '/',
  templateUrl: 'templates/list.html'
});
router.fallback({
  name: '/404',
  templateUrl: 'templates/404.html'
});
