"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Liaison = function Liaison(data) {
  _classCallCheck(this, Liaison);

  var datum;
  for (datum in data) {
    this[datum] = data[datum];
  }
};

function load_component(module, data) {
  new window[module](data);
}
