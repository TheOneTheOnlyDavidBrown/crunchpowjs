// TODO: allow a shared frontend/backend schema file
export default class BaseModel {
  constructor(modelName, schema) {
    this.modelName = modelName;
    this.data = schema;
  }

  set(key, value) {
    const existsInSchema = this._existsInSchema(this.data, key, value);
    if (!existsInSchema) {
      console.warn(`Not setting "${key}" in ${this.modelName} model to "${value}". Doesnt exist in the schema`);
      return;
    }
    const typeMatches = this._checkType(this.data, key, value);
    if (!typeMatches) {
      console.warn(`Not setting "${key}" in ${this.modelName} model to "${value}". It isnt the right type`);
      return;
    }
    this._setValue(this.data, key, value);
  }

  get(access) {
    if (access) {
      return this._getValue(this.data, access);
    } else {
      return this._getData(this.data);
    }
  }

  _existsInSchema(obj, access, value) {
    access = (typeof(access) === 'string') ? access.split('.') : access;
    if (access.length > 1 && obj[access[0]]) {
      return this._existsInSchema(obj[access.shift()].value, access, value);
    } else {
      return obj[access[0]] ? true : false;
    }
  }

  _checkType(obj, access, value) {
    access = (typeof(access) === 'string') ? access.split('.') : access;
    if (access.length > 1 && obj[access[0]]) {
      return this._checkType(obj[access.shift()].value, access, value);
    } else {
      return obj[access[0]].type === typeof value;
    }
  }

  _getData(obj, newObj = {}) {
    for (const element in obj) {
      if (obj[element].type === 'object') {
        newObj[element] = {};
        this._getData(obj[element].value, newObj[element]);
      } else {
        newObj[element] = obj[element].value;
      }
    }
    return newObj;
  }

  _setValue(obj, access, value) {
    access = (typeof(access) === 'string') ? access.split('.') : access;
    if (access.length > 1 && obj[access[0]].value) {
      this._setValue(obj[access.shift()].value, access, value);
    } else if (obj[access[0]].value) {
      obj[access[0]].value = value;
    }
  }

  _getValue(obj, access) {
    access = (typeof(access) === 'string') ? access.split('.') : access;
    if (access.length > 1 && obj[access[0]]) {
      return this._getValue(obj[access.shift()].value, access);
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

  // TODO: refactor this to helper
  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  _parseJSON(response) {
    return response.json();
  }

  // TODO: CRUD operations xhr calls. return promises
  save(id = this.get('id')) {
    const url = `${this.endpointPrefix}/${this.modelName}/${id}`;
    const sendObj = {};
    const xhrProperties = {
      method: 'post',
      body: JSON.stringify(sendObj),
    };

    sendObj[this.modelName] = this.get();
    console.log(`make post xhr call to ${url}`, sendObj);

    return fetch(url, xhrProperties)
      .then(this._checkStatus)
      .then(this._parseJSON);
  }

  fetch(id = this.get('id')) {
    const url = `${this.endpointPrefix}/${this.modelName}/${id}`;
    const xhrProperties = {
      method: 'get',
    };
    console.log(`make get xhr call to ${url}`);

    return fetch(url, xhrProperties)
      .then(this._checkStatus)
      .then(this._parseJSON);
  }

  update(id = this.get('id')) {
    const url = `${this.endpointPrefix}/${this.modelName}/${id}`;
    const sendObj = {};
    sendObj[this.modelName] = this.get();
    console.log(`make update xhr call to ${url}`, sendObj);

    // Github's fetch project doesnt appear to support UPDATE
    // TODO: investigate the above statement
    // fetch(url, {
    //   method: 'UPDATE',
    //   body: JSON.stringify(sendObj)
    // });
  }

  destroy(id = this.get('id')) {
    const url = `${this.endpointPrefix}/${this.modelName}/${id}`;
    const xhrProperties = {
      method: 'delete',
    };
    console.log(`make delete xhr call to ${url}`);

    return fetch(url, xhrProperties)
      .then(this._checkStatus)
      .then(this._parseJSON);
  }
}
