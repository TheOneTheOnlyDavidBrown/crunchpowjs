import Liaison from './Liaison'
import Binding from './Binding'

export default class Example2 {
  constructor(data) {
    this.data = new Liaison(data)
    new Binding(this.data)
    // this.anotherFunction()
  }

  anotherFunction() {
    // here you have access to this.data.user and this.data.programming_languages
    console.log(this.data.string)
  }
}
