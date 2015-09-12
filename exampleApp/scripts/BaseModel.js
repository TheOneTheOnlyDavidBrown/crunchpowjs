// TODO: import json to use as schema

export default class BaseModel{
  constructor(modelName, schema){
    this.modelName = modelName
    this.data = schema
  }

  set(key, value) {
    let existsInSchema = this.existsInSchema(this.data, key, value)
    if (existsInSchema) {
      let typeMatches = this.checkType(this.data, key, value)
      if (typeMatches) {
        this.setValue(this.data, key, value)
      }
      else {
        console.warn(`Not setting "${key}" in ${this.modelName} model to "${value}" because it it isnt the right type`)
      }
    }
    else {
      console.warn(`Not setting "${key}" in ${this.modelName} model to "${value}" because it doesnt exist in the schema`)
    }
  }

  get(access) {
    if (access) {
      return this.getValue(this.data, access)
    }
    else {
      return this.getData(this.data)
    }
  }

  existsInSchema(obj, access, value){
    if (typeof(access) == 'string') {
      access = access.split('.')
    }

    if (access.length > 1 && obj[access[0]]) {
      return this.existsInSchema(obj[access.shift()].value, access, value)
    } else {
      return obj[access[0]] ? true : false
    }
  }

  checkType(obj, access, value){
    if (typeof(access) == 'string') {
      access = access.split('.')
    }

    if (access.length > 1 && obj[access[0]]) {
      return this.checkType(obj[access.shift()].value, access, value);
    } else {
      return obj[access[0]].type === typeof value
    }
  }

  getData(obj, newObj = {}) {
    for(let element in obj) {
      if (obj[element].type === 'object') {
        newObj[element] = {}
        this.getData(obj[element].value, newObj[element])
      }
      else {
        newObj[element] = obj[element].value
      }
    }
    return newObj
  }

  setValue(obj, access, value) {
    if (typeof(access) == 'string') {
      access = access.split('.')
    }
    if (access.length > 1 && obj[access[0]].value) {
      this.setValue(obj[access.shift()].value, access, value);
    } else if (obj[access[0]].value) {
      obj[access[0]].value = value
    }
  }

  getValue(obj, access) {
    if (typeof(access) == 'string') {
      access = access.split('.')
    }

    if (access.length > 1 && obj[access[0]]) {
      return this.getValue(obj[access.shift()].value, access);
    } else {
      return obj[access[0]].value || ''
    }
  }

  // TODO: CRUD operations xhr calls. return promises
  save(id = this.get('id')){
    let sendObj = {}
    sendObj[this.modelName] = this.get()
    console.log(`make post xhr call to api/v1/${this.modelName}/${id}`, sendObj)
  }
  fetch(id = this.get('id')){
    console.log(`make get xhr call to api/v1/${this.modelName}/${id}`)
  }
  update(id = this.get('id')){
    let sendObj = {}
    sendObj[this.modelName] = this.get()
    console.log(`make update xhr call to api/v1/${this.modelName}/${id}`, sendObj)
  }
  destroy(id = this.get('id')){
    console.log(`make delete xhr call to api/v1/${this.modelName}/${id}`)
  }
}
