import Liaison from './Liaison'
import Binding from './Binding'
import UserModel from './UserModel'
import ViewModel from './ViewModel'

export default class Example {
  constructor(data) {
    this.bind = new Liaison(data)
    console.log(this.bind)
    this.binding = new Binding(this.bind)
    this.exampleUsage()
  }

  exampleUsage() {
    // here you have access to this.bind.user and this.bind.programming_languages
    console.log(this.bind.user)
    console.log(this.bind.programming_languages)

    //model examples
    let user = new UserModel()
    user.set('age', '8777') // should fail
    user.set('name', 'my first name on user model') //should pass
    user.set('age', {age:33}) // should fail
    user.set('age', 999) //should pass
    user.set('address', 'my address') //should pass

    //sets data binding
    this.bind.user.name = user.get('name')
    user.set('address', user.upCase('my second address')) //should pass and postfix "!" to the address

    // user.save()
    // user.update()
    // user.destroy()

    // second model
    let viewmodel = new ViewModel()
    viewmodel.set('single', 'updated via viewmodel model set function') // should pass
    viewmodel.set('user.name', 'my second example name') //should pass
    viewmodel.set('user.age', {age:22}) // should fail
    viewmodel.set('user.age', 444) //should fail
    viewmodel.set('user.address', 77878) //should fail
    viewmodel.set('user.address', 'my second address') //should pass

    //sets data binding
    this.bind = viewmodel.get()
    this.bind.user = user.get()
    this.binding.refresh(this.bind)
  }
}
