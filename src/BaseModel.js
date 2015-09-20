// TODO: import json to use as schema
export default class BaseModel {
  constructor(modelName, schema) {
    this.modelName = modelName;
    this.data = schema;
  }

  set(key, value) {
    let existsInSchema = this.existsInSchema(this.data, key, value);
    if (!existsInSchema) {
      console.warn(`Not setting "${key}" in ${this.modelName} model to "${value}" because it doesnt exist in the schema`);
      return;
    }
    let typeMatches = this.checkType(this.data, key, value)
    if (!typeMatches) {
      console.warn(`Not setting "${key}" in ${this.modelName} model to "${value}" because it it isnt the right type`);
      return;
    }
    this.setValue(this.data, key, value);
  }

  get(access) {
    if (access) {
      return this.getValue(this.data, access);
    } else {
      return this.getData(this.data);
    }
  }

  existsInSchema(obj, access, value) {
    access = (typeof(access) == 'string') ? access.split('.') : access;
    if (access.length > 1 && obj[access[0]]) {
      return this.existsInSchema(obj[access.shift()].value, access, value);
    } else {
      return obj[access[0]] ? true : false;
    }
  }

  checkType(obj, access, value) {
    access = (typeof(access) == 'string') ? access.split('.') : access;
    if (access.length > 1 && obj[access[0]]) {
      return this.checkType(obj[access.shift()].value, access, value);
    } else {
      return obj[access[0]].type === typeof value;
    }
  }

  getData(obj, newObj = {}) {
    for (let element in obj) {
      if (obj[element].type === 'object') {
        newObj[element] = {};
        this.getData(obj[element].value, newObj[element]);
      } else {
        newObj[element] = obj[element].value;
      }
    }
    return newObj;
  }

  setValue(obj, access, value) {
    access = (typeof(access) == 'string') ? access.split('.') : access;
    if (access.length > 1 && obj[access[0]].value) {
      this.setValue(obj[access.shift()].value, access, value);
    } else if (obj[access[0]].value) {
      obj[access[0]].value = value;
    }
  }

  getValue(obj, access) {
    access = (typeof(access) == 'string') ? access.split('.') : access;
    if (access.length > 1 && obj[access[0]]) {
      return this.getValue(obj[access.shift()].value, access);
    } else {
      return obj[access[0]].value || '';
    }
  }

  set endpointPrefix(prefix) {
    this._endpointPrefix = prefix;
  }

  get endpointPrefix() {
    return this._endpointPrefix || 'api/vi';
  }

  // TODO: CRUD operations xhr calls. return promises
  save(id = this.get('id')) {
    let url = `${this.endpointPrefix}/${this.modelName}/${id}`;
    let sendObj = {};
    sendObj[this.modelName] = this.get();
    console.log(`make post xhr call to ${url}`, sendObj);
  }
  fetch(id = this.get('id')) {
    let url = `${this.endpointPrefix}/${this.modelName}/${id}`;
    console.log(`make get xhr call to ${url}`);
  }
  update(id = this.get('id')) {
    let url = `${this.endpointPrefix}/${this.modelName}/${id}`;
    let sendObj = {};
    sendObj[this.modelName] = this.get();
    console.log(`make update xhr call to ${url}`, sendObj);
  }
  destroy(id = this.get('id')) {
    let url = `${this.endpointPrefix}/${this.modelName}/${id}`;
    console.log(`make delete xhr call to ${url}`);
  }
}
