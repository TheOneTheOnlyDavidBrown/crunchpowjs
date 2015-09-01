'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ExampleUser = (function () {
  function ExampleUser(data) {
    _classCallCheck(this, ExampleUser);

    this.data = new Liaison(data);
    this.anotherFunction();
  }

  _createClass(ExampleUser, [{
    key: 'anotherFunction',
    value: function anotherFunction() {
      // here you have access to this.data.user and this.data.programming_languages
      console.log(this.data.user);
      console.log(this.data.programming_languages);
    }
  }]);

  return ExampleUser;
})();
