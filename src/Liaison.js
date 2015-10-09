'use strict';
export default class Liaison {
  constructor(data) {
    let datum;
    for (datum in data) {
      this[datum] = data[datum];
    }
  }
}
export default function loadComponent(module, data) {
  new window[module](data);
}
