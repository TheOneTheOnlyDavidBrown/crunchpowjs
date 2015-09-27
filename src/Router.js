export default class Router {
  constructor() {
    this.view = document.querySelector('[liaison-view]');
    this.paths = [];
    //goes to hash url
    setTimeout(() => this.go(window.location.hash.substring(1)), 0);
    //allows back/forward buttons
    window.addEventListener('popstate', (event) => this.go(event.state || window.location.hash.substring(1), false));
  }

  state(data) {
    this.paths.push(data)
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
    return null;
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
