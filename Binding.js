export class Binding {
  constructor(data) {
    this.data = data
    this.findBindable()
    let me = this;

    // if (Object.observe) {

    //   Object.observe(this.data, (changes) => {
    //     changes.forEach((change) => {
    //       let bindings = document.querySelectorAll('[liaison-bind="' + change.name + '"]')
    //       for (let j = 0; j < bindings.length; j++) {
    //         this.setElementContent(bindings[j], change.object[change.name])
    //       }
    //       me.populateBindings()
    //     });
    //   });
    //   this.populateBindings()
    // } else {
    var currentData = currentData || {}

    setInterval(() => {
        if (JSON.stringify(currentData) !== JSON.stringify(me.data)) {
          currentData = JSON.parse(JSON.stringify(me.data))
          me.populateBindings()
        }
      }, 100)
      // }
  }

  populateBindings() {
    let elms = document.querySelectorAll('[liaison-bind]')
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
    var me = this;
    let elms = document.querySelectorAll('[liaison-bind]')
    for (let i = 0, l = elms.length; i < l; i++) {
      elms[i].addEventListener('keyup', function(e) {
        let newVal = e.currentTarget.value;

        //deep update
        let el = elms[i].getAttribute('liaison-bind');
        if (el.indexOf('.') > 0) {
          //at deepest object set it to newVal
          debugger
          me.setValue(me.data, el, newVal);
        } else {
          me.data[el] = newVal
          let bindings = document.querySelectorAll('[liaison-bind="' + this.getAttribute('liaison-bind') + '"]')
          for (let j = 0; j < bindings.length; j++) {
            me.setElementContent(bindings[j], newVal)
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
