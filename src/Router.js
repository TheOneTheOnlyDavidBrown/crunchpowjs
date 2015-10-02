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

  fallback(data) {
    this.paths.push(data);
    this._fallback = data;
  }

  go(route, options = {
    setUrl: true
  }) {
    console.log(`going to state ${route}`, this.view);
    let obj = this.findRouteInPaths(route);
    if (!obj) {
      this.go(this._fallback.name)
      return false;
    }
    fetch(obj.templateUrl)
      .then((response) => {
        return response.text();
      }).then((template) => {
        this.view.innerHTML = template;
      });

    if (options.setUrl) {
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
      let _wildcard = wildcard.name.substring(1).split('/');
      let _route = route.substring(1).split('/');
      // console.log(_wildcard, _route)
      if (_wildcard.length === _route.length) {
        for (var i = 0, l = _wildcard.length; i < l; i++) {
          if (_wildcard[i].indexOf(':') === 0) {
            let temp = _wildcard;
            temp[i] = _route[i];
            if (this.isIdentical(temp, _route)) {
              return {
                name: route,
                templateUrl: wildcard.templateUrl
              }
            }
          }
        };
      }
    }
    console.log('returning fallback', this._fallback)
    return false;
  }

  // TODO: put this in a helper library
  // this function was found at http://stackoverflow.com/questions/7837456/comparing-two-arrays-in-javascript
  // this is a shallow check
  isIdentical(a, b) {
    var i = a.length;
    if (i != b.length) return false;
    while (i--) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  set url(newUrl) {
    console.log('push', newUrl)
    window.history.pushState(newUrl.name, newUrl.name, '#' + newUrl.name);
  }

  get currentState() {
    return window.history.state;
  }
}



// * on page load, get url and load appropriate temtplate
// * on url change, update template
// * allow wildcards in paths /template/user/:id
// pass variables to template
// * get state (if state == 'huhohohao')...
// * update state on forward/back
// * routes on refresh
