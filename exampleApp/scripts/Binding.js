//allowing for..of of nodelists for Chrome support
// NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

export default class Binding {
  constructor(data) {
    this.data = data
    this.findBindable()

    var currentData = currentData || {}

    // watching this.data for programmatical updates
    setInterval(() => {
      // TODO find a better way to compare
      if (JSON.stringify(currentData) !== JSON.stringify(this.data)) {
        currentData = JSON.parse(JSON.stringify(this.data))
        this.populateBindings()
      }
    }, 10)
  }

  populateBindings() {
    for (let elm of document.querySelectorAll('[liaison-bind]')){
      let bindName = document.activeElement.getAttribute('liaison-bind')

      //prevent the input youre typing in from updating. prevents the cursor from jumping to the end
      //only updates bindings that need to be updated
      if (elm !== document.activeElement && (elm.getAttribute('liaison-bind') === bindName || bindName === null)){
        this.setElementContent(elm, this.getValue(this.data, elm.getAttribute('liaison-bind')))
      }
    }
  }

  findBindable() {
    for (let elm of document.querySelectorAll('[liaison-bind]')){
      //keydown gives better response but cuts off the first key because its getting the value of the pre keydown element
      elm.addEventListener('keyup', (e) => {
        this.setValue(this.data, elm.getAttribute('liaison-bind'), e.target.value)
      })
    }
  }

  setElementContent(element, value) {
    if (!value) return
    element.innerHTML = value
    element.value = value
  }

  setValue(obj, access, value) {
    if (typeof(access) == 'string') {
      access = access.split('.')
    }
    if (access.length > 1 && obj[access[0]]) {
      this.setValue(obj[access.shift()], access, value);
    } else if (obj[access[0]]) {
      obj[access[0]] = value
    }
  }

  getValue(obj, access) {
    if (typeof(access) == 'string') {
      access = access.split('.')
    }
    if (access.length > 1 && obj[access[0]]) {
      return this.getValue(obj[access.shift()], access);
    } else {
      return obj[access[0]] || ''
    }
  }

  refresh(data){
    this.data = data
    this.populateBindings()
  }
}
