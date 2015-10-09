'use strict';
export default class Utils {
  constructor() {}

  _hasher(val) {
    let hash = 0,
      i,
      l,
      string = val.toString();
    for (i = 0, l = string.length; i < l; i++) {
      hash = (((hash << 5) - hash) + string.charCodeAt(i)) & 0xFFFFFFFF;
    }
    return hash;
  }

  object(self, obj, result = 0) {
    for (let property in obj) {
      if (typeof obj[property] === 'object') {
        return this.object(self, obj[property], result);
      }
      if (hasOwnProperty.call(obj, property)) {
        result += self._hasher(property + self._hasher(obj[property]));
      }
    }
    return result;
  }

  hash(input) {
    let types = {
      'string': this._hasher,
      'number': this._hasher,
      'boolean': this._hasher,
      'object': this.object
    };
    let type = typeof input;

    return input != null && types[type] ? types[type](this, input) + this._hasher(type) : 0;
  }

  compareHashes(a, b) {
    return this.hash(a) === this.hash(b);
  }

  //faster than compareHashes
  compare(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
}
