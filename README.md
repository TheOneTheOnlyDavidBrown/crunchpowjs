# liaisonjs
ES6/2015 library that allows allows for passing of view data to ES6/2015 modules

## Example usage:
ExampleUser.js
```
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
```

## In your html
```
<script>
  load_component('ExampleUser', {user: {name: 'Sherlock Holmes', address: '221b Baker Street'}, programming_languages: ['javascript', 'ruby']})
</script>
```
Or, more specifically in Rails/HAML you can pass in a user object such as @current_user
```
:javascript
  load_component('User', { user: JSON.parse("#{escape_javascript raw @current_user.to_json}"), programming_languages: ['javascript', 'ruby']})
```
###Contributing

Information about contributing can be found [here](https://github.com/TheOneTheOnlyDavidBrown/contributing_guidelines/blob/master/CONTRIBUTING.md) 
