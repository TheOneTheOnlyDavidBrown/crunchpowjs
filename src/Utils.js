export default class Utils {
  constructor() {}

  _hasher(val) {
    let hash = 0;
    let index;
    let len;
    const string = val.toString();
    for (index = 0, len = string.length; index < len; index++) {
      hash = (((hash << 5) - hash) + string.charCodeAt(index)) & 0xFFFFFFFF;
    }
    return hash;
  }

  _object(self, obj, result = 0) {
    let _result = result;
    for (const property in obj) {
      if (typeof obj[property] === 'object') {
        return this._object(self, obj[property], _result);
      }
      if (hasOwnProperty.call(obj, property)) {
        _result += self._hasher(property + self._hasher(obj[property]));
      }
    }
    return _result;
  }

  hash(input) {
    const types = {
      'string': this._hasher,
      'number': this._hasher,
      'boolean': this._hasher,
      'object': this.object,
    };
    const type = typeof input;

    return input !== null && types[type] ? types[type](this, input) + this._hasher(type) : 0;
  }

  compareHashes(itemA, itemB) {
    return this.hash(itemA) === this.hash(itemB);
  }

  // faster than compareHashes
  compare(itemA, itemB) {
    return JSON.stringify(itemA) === JSON.stringify(itemB);
  }
}
