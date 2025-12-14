# construct-new
Like the new operator, but as a function for convenience and familiarity.

## Usage
What you would normally do:
```js
class Foo {
  constructor(name) {
    this.name = name
  }
  print() {
    console.log("Hi, I am " + this.name)
  }
}
const myFoo = new Foo("bar")
myFoo.print() // output: Hi, I am bar
```
What you would do with this:
```js
const construct = require('construct-new')
class Foo {
  constructor(name) {
    this.name = name
  }
  print() {
    console.log("Hi, I am " + this.name)
  }
}
const myFoo = construct({
  target: Foo,
  args: ["bar"]
})

myFoo.print() // Hi, I am bar
```
or
```js
construct({
  target: Foo,
  args: ["bar"],
  callback: (myFoo) => {
    myFoo.print() // Hi, I am bar
  }
})
```

If the class doesn't take any arguments, you don't have to pass in the args property, it will still work like the args is an empty array.
