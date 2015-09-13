# liaisonjs
ES6/2015 library that allows for passing of view data to ES6/2015 modules. This is an alternative to storing data in HTML data attributes that clutter the DOM. Supports two way data binding and has a base model class for persistent data structures.

Each module can be run independent of the rest of the modules. Data is stored within each module rather than the global namespace.

## Example usage:
Example.js
```
import Liaison from './Liaison'
import Binding from './Binding'

export class Example {
  constructor(data) {
    this.data = new Liaison(data) // sets objects
    new Binding(this.data) // sets data bindings
    this.anotherFunction()
  }

  anotherFunction() {
    // here you have access to this.data.user and this.data.programming_languages
    console.log(this.data.user)
    console.log(this.data.programming_languages)
  }
}
```

## In your html
```
<script>
  load_component('Example', {
    user: {
      name: 'Sherlock Holmes',
      address: '221b Baker Street'
      },
    programming_languages: ['javascript', 'ruby']
  });
</script>
```
Or, more specifically in Rails/HAML you can pass in a user object such as @current_user
```
:javascript
  load_component('Example', {
    user: JSON.parse("#{escape_javascript raw @current_user.to_json}"),
    programming_languages: ['javascript', 'ruby']
  });
```

## Two way data binding
To bind data use `liaison-bind="variable_name"` as such and it will bind to `this.data.variable_name`. In this example `this.data.name` is bound to these elements in the javascript
```
<div liaison-bind='name'></div>
<input type="text" liaison-bind='name'></input>
```

## Base Model Class
The Base Model class serves to give a more strict schema pull from. This schema would work as a contract between front and back end so data is consistent.

To untilize the base model class, create a model class that extends the BaseModel class and pass in the schema with the following format
```
import BaseModel from './BaseModel'

export class ViewModel extends BaseModel {
  constructor() {
    super('view', {
      single: {type: 'string', value: 'from schema'},
      user: {type: 'object', value:
        {
          id: {type: 'number', value:88888},
          name: {type: 'string', value:'Sherlock Holmes'},
          address: {type: 'string', value:'221b Baker Street'}
        },
      },
      programming_languages: {type:'array', value: ['javascript', 'ruby']}
    })
  }
}
```

To use this one would run the following code:
```
let myModel = new ViewModel()
myModel.set('user.name', 'new name')
myModel.get('user.name') // returns the user's name
myModel.set('doesnt_exist_in_schema','value') // wont add it to the model
myModel.set('user.id',{}) // wont set it in the model because its not the correct type
myModel.get() // no params returns the whole model
```
Working on using setters and getters to see if its cleaner.

Then you can put helper functions in your model class (eg getFullName that returns first+last name). Working on utilizing an XHR library to handle fetching/updating/deleting model data.

## Running Tests
`npm test` will run the Mocha tests

## Compiling
It is recommended you compile this with babel using the `--modules ignore` flag

### Contributing

Information about contributing can be found [here](https://github.com/TheOneTheOnlyDavidBrown/contributing_guidelines/blob/master/CONTRIBUTING.md)
