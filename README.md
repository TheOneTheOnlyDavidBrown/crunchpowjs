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
