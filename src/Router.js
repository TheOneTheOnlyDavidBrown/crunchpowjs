'use strict';
import {Utils} from './Utils';

export default class Router {
  constructor() {
    this.utils = new Utils();
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
    return this;
  }

  fallback(data) {
    this.paths.push(data);
    this._fallback = data;
  }

  // integration tests cover this
  go(route) {
    console.log(`going to state ${route}`);
    let obj = this._findRouteInPaths(route);
    if (!obj) {
      this.go(this._fallback.name);
      return false;
    }
    fetch(obj.templateUrl)
      .then((response) => {
        return response.text();
      }).then((template) => {
        this.view.innerHTML = template;
      });
  }

  // TODO: clean this up. there has to be a better way
  _findRouteInPaths(route) {
    for (let path of this.paths) {
      if (path.name === route) return path;
    }
    route = route.substring(1).split('/');
    for (let wildcard of this.wildcards) {
      let _wildcard = wildcard.name.substring(1).split('/');
      if (_wildcard.length === route.length) {
        for (var i = 0, l = _wildcard.length; i < l; i++) {
          if (_wildcard[i].indexOf(':') === 0) {
            let temp = _wildcard;
            temp[i] = route[i];
            if (this.utils.compare(temp, route)) {
              return wildcard;
            }
          }
        }
      }
    }
    return false;
  }
}



// * on page load, get url and load appropriate temtplate
// * on url change, update template
// * allow wildcards in paths /template/user/:id
// pass variables to template
// allow component to be declared in route object
// * get state (if state == 'huhohohao')...
// * update state on forward/back
// * routes on refresh
