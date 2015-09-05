import Liaison from './Liaison'
import Binding from './Binding'

export class ExampleUser {
  constructor(data) {
    console.log('uo;eee')
    this.data = new Liaison(data)
    new Binding(this.data)
    this.anotherFunction()
  }

  anotherFunction() {
    // here you have access to this.data.user and this.data.programming_languages
    console.log(this.data.user)
    console.log(this.data.programming_languages)
  }
}
