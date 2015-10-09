import Liaison from './Liaison';
import Binding from './Binding';

export default class Example2 {
  constructor(data) {
    this.bind = new Liaison(data);
    this.binding = new Binding(this.bind);
      // this.anotherFunction()
  }

  anotherFunction() {
    // here you have access to this.data.user and this.data.programming_languages
    console.log(this.bind.string);
  }
}
