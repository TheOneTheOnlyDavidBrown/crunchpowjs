import Liaison from './Liaison';
import Binding from './Binding';
import UserModel from './UserModel';
import ViewModel from './ViewModel';

export default class Example {
  constructor(data) {
    this.bind = new Liaison(data);
    console.log(this.bind);
    this.binding = new Binding(this.bind);
    this.exampleBinding();
    this.exampleRouter();
  }

  exampleBinding() {
    // here you have access to this.bind.user and this.bind.programming_languages
    // console.log(this.bind.user);
    // console.log(this.bind.programming_languages);

    // model examples
    const user = new UserModel();
    user.set('age', '8777'); // should fail
    user.set('name', 'my first name on user model'); // should pass
    user.set('age', {
      age: 33,
    }); // should fail
    user.set('age', 999); // should pass
    user.set('address', 'my address'); // should pass

    // sets data binding
    // this.bind.user.name = user.get('name')
    user.set('address', user.upCase('my second address')); // should pass and postfix "!" to the address

    user.save().then(() => {
      console.log('then');
    }).catch((error) => {
      console.log('request failed', error);
    });
    user.update();
    user.fetch().then(() => {
      console.log('then');
    }).catch((error) => {
      console.log('request failed', error);
    });
    user.destroy().then(() => {
      console.log('then');
    }).catch((error) => {
      console.log('request failed', error);
    });

    // second model
    const viewmodel = new ViewModel();
    // should pass
    viewmodel.set('single', 'updated via viewmodel model set function');
    // should pass
    viewmodel.set('user.name', 'my second example name');
    // should fail
    viewmodel.set('user.age', {
      age: 22,
    });
    // should fail
    viewmodel.set('user.age', 444);
    // should fail
    viewmodel.set('user.address', 77878);
    // should pass
    viewmodel.set('user.address', 'my second address');

    // sets data binding
    // this.bind = viewmodel.get()
    // this.bind.user = user.get()
    this.binding.refresh(this.bind);
    setTimeout(() => this.binding.refresh(this.bind), 2000);
  }

  exampleRouter() {
    // change state to /list
    // router.go('hodor/12', {mydata:1234556, myobj:{name:'sherlock'}});
    // setTimeout(()=> window.router.go('list'),2000)
  }
}
