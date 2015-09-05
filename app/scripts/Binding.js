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
    // TODO clean this up. its ugly and a nested loop
    for (let i = 0, l = elms.length; i < l; i++) {
      let el = elms[i].getAttribute('liaison-bind');
      //if nested
      if (el.indexOf('.') > 0) {
        let exploded = el.split('.')
        let temp = this.data[exploded[0]];

        for (let j = 1; j < exploded.length; j++) {
          this.setElementContent(elms[i], temp[exploded[j]])
          temp = temp[exploded[j]]
        }
      } else {
        this.setElementContent(elms[i], this.data[el])
      }
    }
  }

  findBindable() {
    let elms = document.querySelectorAll('[liaison-bind]')

    // TODO get this working without having to run slice
    elms = Array.prototype.slice.call(elms, 0)

    for (let elm of elms) {
      elm.addEventListener('keyup', (e) => {
        let newVal = e.currentTarget.value;

        //deep update
        let el = elm.getAttribute('liaison-bind');
        if (el.indexOf('.') > 0) {
          //at deepest object set it to newVal
          this.setValue(this.data, el, newVal);
        } else {
          this.data[el] = newVal
          let bindings = document.querySelectorAll('[liaison-bind="' + this.getAttribute('liaison-bind') + '"]')

          // TODO get this working without having to run slice
          bindings = Array.prototype.slice.call(bindings, 0)
          for (let bind of bindings) {
            this.setElementContent(bind, newVal)
          }
        }

      })
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

}
