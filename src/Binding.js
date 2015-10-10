// allowing for..of of nodelists for Chrome support
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
import {Utils} from './Utils';

export default class Binding {
  constructor(data) {
    this.data = data;
    this._findBindable();
    this.utils = new Utils();

    let currentData = currentData || {};

    // watching this.data for programmatical updates
    setInterval(() => {
      if (this.utils.compare(currentData, this.data) === false) {
        currentData = JSON.parse(JSON.stringify(this.data));
        this._populateBindings();
      }
    }, 10);
  }

  _populateBindings() {
    for (const elm of document.querySelectorAll('[liaison-bind]')) {
      const bindName = document.activeElement.getAttribute('liaison-bind');

      // prevent the input youre typing in from updating. prevents the cursor from jumping to the end
      // only updates bindings that need to be updated
      if (elm !== document.activeElement && (elm.getAttribute('liaison-bind') === bindName || bindName === null)) {
        this._setElementContent(elm, this._getValue(this.data, elm.getAttribute('liaison-bind')));
      }
    }
  }

  _findBindable() {
    for (const elm of document.querySelectorAll('[liaison-bind]')) {
      elm.addEventListener('keydown', (event) => {
        // settimeout allows the keydown event go get the new value
        setTimeout(() => this._setValue(this.data, elm.getAttribute('liaison-bind'), event.srcElement.value));
      });
    }
  }

  _setElementContent(element, value) {
    // allows multiple components
    if (value === undefined) return;
    element.innerHTML = value;
    element.value = value;
  }

  _setValue(obj, access, value) {
    let _access = access;
    if (typeof(_access) === 'string') {
      _access = _access.split('.');
    }
    if (_access.length > 1 && obj[_access[0]]) {
      this._setValue(obj[_access.shift()], _access, value);
    } else if (typeof obj[_access[0]] === 'string') {
      obj[_access[0]] = value;
    }
  }

  _getValue(obj, access) {
    let _access = access;
    if (typeof(_access) === 'string') {
      _access = _access.split('.');
    }
    if (_access.length > 1 && obj[_access[0]]) {
      return this._getValue(obj[_access.shift()], _access);
    } else {
      return obj[_access[0]];
    }
  }

  refresh(data) {
    this.data = data;
    this._populateBindings();
  }
}
