// TODO: import json to use as schema

export class BaseModel{
  constructor(schema){
    this.data = schema
  }

  set(key, value) {
    let existsInSchema = this.existsInSchema(this.data, key, value)
    if (existsInSchema) {
      let typeMatches = this.checkType(this.data, key, value)
      if (typeMatches) {
        this.setValue(this.data, key, value)
      }
      else{
        console.log(`Not setting ${key} to ${value} because it it isnt the right type`)
      }
    }
    else{
      console.log(`Not setting ${key} to ${value} because it doesnt exist in the schema`)
    }
  }

  get(access) {
    if (access) {
      return this.getValue(this.data, access)
    }
    else {
      // TODO: traverse and only return values of each. not {type, value}
      console.log('broken, shouldnt see this text')
      return this.data
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

  // TODO: CRUD operations xhr calls
  // save()
  // delete()
  // update()
}
