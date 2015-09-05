export class Binding {
  constructor(data) {
    this.data = data
    this.findBindable()

    var currentData = currentData || {}

    setInterval(() => {
      if (JSON.stringify(currentData) !== JSON.stringify(this.data)) {
        console.log(this.data)
        currentData = JSON.parse(JSON.stringify(this.data))
        this.populateBindings()
      }
    }, 10)
  }

  populateBindings() {
    // TODO get this working without having to run slice
    for (let elm of Array.prototype.slice.call(document.querySelectorAll('[liaison-bind]'), 0)){
      this.setElementContent(elm, this.getValue(this.data, elm.getAttribute('liaison-bind')))
    }
  }

  findBindable() {
    // TODO get this working without having to run slice
    for (let elm of Array.prototype.slice.call(document.querySelectorAll('[liaison-bind]'), 0)) {
      elm.addEventListener('keyup', (e) => this.setValue(this.data, elm.getAttribute('liaison-bind'), e.currentTarget.value))
    }
  }

  setElementContent(element, value) {
    element.innerHTML = value
    element.value = value
  }
    /**
     * @obj: the json object to change
     * @access: string dot separates route to value
     * @value: new valu
     */
  setValue(obj, access, value) {
    if (typeof(access) == 'string') {
      access = access.split('.');
    }
    if (access.length > 1) {
      this.setValue(obj[access.shift()], access, value);
    } else {
      obj[access[0]] = value;
    }
  }

  getValue(obj, access) {
    if (typeof(access) == 'string') {
      access = access.split('.');
    }
    if (access.length > 1) {
      return this.getValue(obj[access.shift()], access);
    } else {
      return obj[access[0]] || ''
    }
  }
}
