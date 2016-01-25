# CrunchPowJS
Collection of ES6/2015 modules that allow for passing of view data to ES6/2015 modules,two way data binding, base model class for persistent data structures, client side routing, a state machine, and a few utility functions. This creates a model driven data flow rather than a view driven data flow for a cleaner project.

Each module can be run independent of the rest of the modules. Data is stored within each module rather than the global namespace.

## Future Plans
* I have router added to the project but I need better docs and to flesh out some minor details. Tests are in and it works well though
* Break down the modules into their own packages
* Better semantic versioning
* Better deploy process/docs on deploying to npm

## Example usage:
Example.js
```
import Liaison from './Liaison'
import Binding from './Binding'

export class Example {
  constructor(data) {
    this.bind = new Liaison(data); // sets objects
    this.binding = new Binding(this.bind); // sets data bindings
    this.anotherFunction();
  }

  anotherFunction() {
    // here you have access to this.bind.user and this.bind.programming_languages
    console.log(this.bind.user);
    console.log(this.bind.programming_languages);
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
Or, more specifically in Rails/HAML you can pass in a user object such as @current_user. If you know of a better way to format the data to pass it in that is cleaner, please put up a PR. I would greatly appreciate it.
```
:javascript
  load_component('Example', {
    user: JSON.parse("#{escape_javascript raw @current_user.to_json}"),
    programming_languages: ['javascript', 'ruby']
  });
```

## Two way data binding
Following the example above, to bind data use `liaison-bind="variable_name"` as such and it will bind to `this.bind.variable_name`. In this example `this.bind.name` is bound to these elements in the javascript
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
    });
  }
}
```

To use this one would run the following code:
```
let myModel = new ViewModel();
myModel.set('user.name', 'new name');
myModel.get('user.name'); // returns the user's name
myModel.set('doesnt_exist_in_schema','value'); // wont add it to the model
myModel.set('user.id',{}); // wont set it in the model because its not the correct type
myModel.get(); // no params returns the whole model
```
Working on using setters and getters to see if it's cleaner.

Then you can put helper functions in your model class (eg getFullName that returns first+last name). Working on utilizing an XHR library to handle fetching/updating/deleting model data.

When using BaseModel with data binding you may need to force refresh your bindings with the refresh function on the Binding class if you are updating the root of the data binding object (eg `this.bind`) by running:
`this.binding.refresh(this.bind)`

## Running Tests
`npm run mocha` will run the Mocha tests

`npm run pioneer` will run the Pioneer tests

`npm test` will run both mocha and Pioneer tests

## Compiling
It is recommended you compile this with babel using the `--modules ignore` flag

### Contributing

Information about contributing can be found [here](https://github.com/TheOneTheOnlyDavidBrown/contributing_guidelines/blob/master/CONTRIBUTING.md)
