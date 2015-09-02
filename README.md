# liaisonjs
ES6/2015 library that allows for passing of view data to ES6/2015 modules. This is an alternative to storing data in HTML data attributes that clutter the DOM. Also supports two way data binding (currently only one level deep)

This also stores the data within each module rather than the global namespace

## Example usage:
ExampleUser.js
```
import Liaison from './Liaison'
import Binding from './Binding'

export class ExampleUser {
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
  load_component('ExampleUser', {
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
  load_component('ExampleUser', { 
    user: JSON.parse("#{escape_javascript raw @current_user.to_json}"),
    programming_languages: ['javascript', 'ruby']
  });
```

## Two way data binding
To bind data use liaison-bind="variable_name" as such and it will bind to this.data.variable_name. In this example this.data.name is bound to these elements in the javascript
```
<div liaison-bind='name'></div>
<input type="text" liaison-bind='name'></input>
```

## Compiling
It is recommended you compile this with babel using the `--modules ignore` flag

### Contributing

Information about contributing can be found [here](https://github.com/TheOneTheOnlyDavidBrown/contributing_guidelines/blob/master/CONTRIBUTING.md) 
