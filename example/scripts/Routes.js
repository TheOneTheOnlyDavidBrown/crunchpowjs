// puts routes on the router class

import Router from './Router';
// TODO: not attach this to the global namespace
window.router = window.router || new Router();
window.router.state({
  name: '/users',
  templateUrl: 'templates/userindex.html',
}).state({
  name: '/user/:id',
  templateUrl: 'templates/user.html',
}).state({
  name: '/user/:id/details',
  templateUrl: 'templates/userdetails.html',
}).state({
  name: '/user/:id/:subid',
  templateUrl: 'templates/usersub.html',
}).state({
  name: '/list',
  templateUrl: 'templates/list.html',
}).state({
  name: '/',
  templateUrl: 'templates/list.html',
}).state({
  name: '/edit',
  templateUrl: 'templates/edituserform.html',
}).fallback({
  name: '/404',
  templateUrl: 'templates/404.html',
});
