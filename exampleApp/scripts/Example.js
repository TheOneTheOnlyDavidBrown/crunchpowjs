import Liaison from './Liaison'
import Binding from './Binding'
import UserModel from './UserModel'
import ViewModel from './ViewModel'

export default class Example {
  constructor(data) {
    this.bind = new Liaison(data)
    new Binding(this.bind)
    this.exampleUsage()
  }

  exampleUsage() {
    // here you have access to this.bind.user and this.bind.programming_languages
    console.log(this.bind.user)
    console.log(this.bind.programming_languages)

    //model examples
    let user = new UserModel()
    // user.set('age', '8777') // should fail
    user.set('name', 'my first name') //should pass
    // user.set('age', {age:33}) // should fail
    user.set('age', 999) //should pass
    user.set('address', 'my address') //should pass

    //sets data binding
    this.bind.user.name = user.get('name')

    user.save()
    user.update()
    user.destroy()

    // TODO: instead of passing in a schema. import it in the model. have this pass in override the other one by
    // extending the objects
    let viewmodel = new ViewModel()
    viewmodel.set('single', 'updated via viewmodel model set function') // should pass
    viewmodel.set('user.name', 'my second example name') //should pass
    // viewmodel.set('user.age', {age:22}) // should fail
    viewmodel.set('user.age', 444) //should fail
    viewmodel.set('user.address', 77878) //should fail
    viewmodel.set('user.address', 'my second address') //should pass
    // console.log(viewmodel.data)

    //sets data binding
    this.bind.single = viewmodel.get('single')
    this.bind.user.name = viewmodel.get('user.name')
    console.log(user.get())

  }
}


// TODO: better model binding relationship
