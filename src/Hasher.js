export default class Hasher {
  constructor() {}

  hash(val) {
    let hash = 0,
      i,
      l,
      string = val.toString();
    for (i = 0, l = string.length; i < l; i++) {
      hash = (((hash << 5) - hash) + string.charCodeAt(i)) & 0xFFFFFFFF;
    }
    return hash;
  }

  object(self, obj) {
    let result = 0;
    for (let property in obj) {
      if (typeof obj[property] === 'object') {
        return this.object(self, obj[property])
      }
      if (hasOwnProperty.call(obj, property)) {
        result += self.hash(property + self.hash(obj[property]));
      }
    }
    return result;
  }

  value(input) {
    let types = {
      'string': this.hash,
      'number': this.hash,
      'boolean': this.hash,
      'object': this.object
    };
    let type = typeof input;

    return input != null && types[type] ? types[type](this, input) + this.hash(type) : 0;
  }

  compare(a, b) {
    return this.value(a) === this.value(b);
  }
}
