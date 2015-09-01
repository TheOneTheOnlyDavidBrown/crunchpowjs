import Liaison from './Liaison'

export class ExampleUser {
  constructor(data) {
    this.data = new Liaison(data)
    this.anotherFunction()
  }

  anotherFunction() {
    // here you have access to this.data.user and this.data.programming_languages
    console.log(this.data.user)
    console.log(this.data.programming_languages)
  }
}
