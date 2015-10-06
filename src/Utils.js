export default class Utils {
  constructor() {}

  hasher(val) {
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
        return this.object(self, obj[property], result)
      }
      if (hasOwnProperty.call(obj, property)) {
        result += self.hasher(property + self.hasher(obj[property]));
      }
    }
    return result;
  }

  hash(input) {
    let types = {
      'string': this.hasher,
      'number': this.hasher,
      'boolean': this.hasher,
      'object': this.object
    };
    let type = typeof input;

    return input != null && types[type] ? types[type](this, input) + this.hasher(type) : 0;
  }

  compare(a, b) {
    return this.hash(a) === this.hash(b);
  }

  //faster than compare
  compareByConvert(a, b) {
    return JSON.stringify(a) === JSON.stringify(b)
  }
}
