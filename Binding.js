export class Binding {
  constructor(data) {
    this.data = data
    this.findBindable()

    // if Chrome (Object.observe is an ES7 property)
    if (Object.observe) {
      Object.observe(this.data, (changes) => {
        changes.forEach((change) => {
          let bindings = document.querySelectorAll('[liaison-bind=' + change.name + ']')
          for (let j = 0; j < bindings.length; j++) {
            this.setElementContent(bindings[j], change.object[change.name])
          }
        });
      });
      this.populateBindings()
    } else { // Not chrome
      var currentData = currentData || {}
      setInterval(() => {
        if (JSON.stringify(currentData) !== JSON.stringify(this.data)) {
          currentData = JSON.parse(JSON.stringify(this.data));
          this.populateBindings()
        }
      }, 100)
    }
  }

  populateBindings() {
    let elms = document.querySelectorAll('[liaison-bind]')
    for (let i = 0, l = elms.length; i < l; i++) {
      this.setElementContent(elms[i], this.data[elms[i].getAttribute('liaison-bind')])
    }
  }

  findBindable() {
    var me = this;
    let elms = document.querySelectorAll('[liaison-bind]')
    for (let i = 0, l = elms.length; i < l; i++) {
      elms[i].addEventListener('keyup', function(e) {
        let newVal = e.currentTarget.value;
        me.data[this.getAttribute('liaison-bind')] = newVal
        let bindings = document.querySelectorAll('[liaison-bind=' + this.getAttribute('liaison-bind') + ']')
        for (let j = 0; j < bindings.length; j++) {
          me.setElementContent(bindings[j], newVal)
        }
      })
    }
  }

  setElementContent(element, value) {
    element.innerHTML = value
    element.value = value
  }
}
