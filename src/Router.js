export default class Router {
  constructor() {
    this.view = document.querySelector('[liaison-view]');
    this.paths = [];
    this.wildcards = [];
    //goes to hash url
    setTimeout(() => this.go(window.location.hash.substring(1)), 0);
    //allows back/forward buttons
    window.addEventListener('popstate', (event) => this.go(event.state || window.location.hash.substring(1), false));
  }

  state(data) {
    if (data.name.indexOf(':') > 0) {
      this.wildcards.push(data);
    } else {
      this.paths.push(data);
    }
  }

  go(route, setUrl = true) {
    console.log(`going to state ${route}`, this.view);
    let obj = this.findRouteInPaths(route);
    if (obj) {
      fetch(obj.templateUrl)
        .then((response) => {
          return response.text();
        }).then((template) => {
          this.view.innerHTML = template;
        });
    }
    if (setUrl) {
      this.url = obj
    }
  }

  findRouteInPaths(route) {
    for (let path of this.paths) {
      if (path.name === route) return path;
    }
    console.log('not found natural path. searching wildcards');
    // TODO: clean this up. there has to be a better way
    for (let wildcard of this.wildcards) {
      console.log(wildcard, route)
      let wc = wildcard.name.split('/');
      let r = route.split('/');
      if (wc.length === r.length) {
        for (var i = 0, l = wc.length; i < l; i++) {
          if (wc[i].indexOf(':') === 0) {
            let temp = wc;
            temp[i] = r[i];
            if (temp = r) {
              return {
                name: route,
                templateUrl: wildcard.templateUrl
              }
            }
          }
        };
      }
    }
    return false;
  }

  set url(newUrl) {
    if (newUrl) {
      window.history.pushState(newUrl.name, newUrl.name, '#' + newUrl.name);
    } else {
      window.history.pushState('fallback', 'fallback', '#' + '/');
    }
  }

  get currentState() {
    return window.history.state;
  }
}



// * on page load, get url and load appropriate temtplate
// * on url change, update template
// allow wildcards in paths /template/user/:id
// pass variables to template
// * get state (if state == 'huhohohao')...
// * update state on forward/back
// routes on refresh
