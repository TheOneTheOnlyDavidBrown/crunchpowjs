export class Binding {
  constructor(data) {
    this.data = data
    this.findBindable()

    var currentData = currentData || {}

    setInterval(() => {
      if (JSON.stringify(currentData) !== JSON.stringify(this.data)) {
        currentData = JSON.parse(JSON.stringify(this.data))
        this.populateBindings()
      }
    }, 10)
  }

  populateBindings() {
    let elms = document.querySelectorAll('[liaison-bind]')
    // TODO get this working without having to run slice
    elms = Array.prototype.slice.call(elms, 0)

    for (let elm of elms){
      this.setElementContent(elm, this.getValue(this.data, elm.getAttribute('liaison-bind')))
    }
  }

  findBindable() {
    let elms = document.querySelectorAll('[liaison-bind]')

    // TODO get this working without having to run slice
    elms = Array.prototype.slice.call(elms, 0)

    for (let elm of elms) {
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
      return obj[access[0]]
    }
  }
}
