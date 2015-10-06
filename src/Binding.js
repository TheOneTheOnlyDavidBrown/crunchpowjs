//allowing for..of of nodelists for Chrome support
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
import Utils from './Utils'

export default class Binding {
  constructor(data) {
    this.data = data;
    this.findBindable();
    this.utils = new Utils();

    let currentData = currentData || {};

    // watching this.data for programmatical updates
    setInterval(() => {
      if (this.utils.compareByConvert(currentData, this.data) === false) {
        currentData = JSON.parse(JSON.stringify(this.data));
        this.populateBindings();
      }
    }, 10);
  }

  populateBindings() {
    for (let elm of document.querySelectorAll('[liaison-bind]')) {
      let bindName = document.activeElement.getAttribute('liaison-bind');

      //prevent the input youre typing in from updating. prevents the cursor from jumping to the end
      //only updates bindings that need to be updated
      if (elm !== document.activeElement && (elm.getAttribute('liaison-bind') === bindName || bindName === null)) {
        this.setElementContent(elm, this.getValue(this.data, elm.getAttribute('liaison-bind')));
      }
    }
  }

  findBindable() {
    for (let elm of document.querySelectorAll('[liaison-bind]')) {
      elm.addEventListener('keydown', (e) => {
        //settimeout allows the keydown event go get the new value
        setTimeout(() => this.setValue(this.data, elm.getAttribute('liaison-bind'), e.srcElement.value))
      });
    }
  }

  setElementContent(element, value) {
    // allows multiple components
    if (value === undefined) return;
    element.innerHTML = value;
    element.value = value;
  }

  setValue(obj, access, value) {
    if (typeof(access) == 'string') {
      access = access.split('.');
    }
    if (access.length > 1 && obj[access[0]]) {
      this.setValue(obj[access.shift()], access, value);
    } else if (typeof obj[access[0]] === 'string') {
      obj[access[0]] = value;
    }
  }

  getValue(obj, access) {
    if (typeof(access) == 'string') {
      access = access.split('.');
    }
    if (access.length > 1 && obj[access[0]]) {
      return this.getValue(obj[access.shift()], access);
    } else {
      return obj[access[0]];
    }
  }

  refresh(data) {
    this.data = data;
    this.populateBindings();
  }
}
