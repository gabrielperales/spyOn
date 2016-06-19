# spyOn [![Build Status](https://travis-ci.org/gabrielperales/spyOn.svg?branch=master)](https://travis-ci.org/gabrielperales/spyOn)
[![NPM](https://nodei.co/npm/spyon.png)](https://nodei.co/npm/spyon/)

## What?
Small library for creating spies for your functions and methods in your tests

## Why?
Because learn how sinon.js can create spies and implement your own version is
great!

## How?
With vanilla javascript and some time

## Installation
Just add the script `lib/spyon.js` to your project, or if you are using bower or
 npm you can also download the package:

- npm:
  ```bash
  $ npm install spyon
  ```

- bower:
  ```bash
  $ bower install spyon
  ```

## Usage and API

### spyOn(fn[, context])
  spyOn is a function with two parameters, the first one is the function we want
  to spy on, and the second one is a optional context. That function retuns
  another function with the samee behaviour of the original function, but it
  also has some methods to know how many times it has been called and with which
  arguments.

#### fn
Type: `function`

Function we want to spy

#### context
Type: `object`

Context in which `fn` should be executed

### spyOn Methods

#### getTimesCalled()
returns how many times our function has been called.

#### getArgsOfCall(callNumber)
returns an array with all the arguments of the nth call (the first call will be indexed by 0).

#### restore()
returns the original function to restore that function once we have finished spying.


## Usage example
To spy on a function, you should override the function you want to spy:

```javascript
// Start spying on console.log with the console context
console.log = spyOn(console.log, console);
console.log.getTimesCalled(); // 0

console.log('Hello world');
console.log.getTimesCalled(); // 1
console.log.getArgsOfCall(0); // ['Hello world']

console.log("I'm being spied!!");
console.log.getTimesCalled(); // 2
console.log.getArgsOfCall(1); // ["I'm being spied!!"]

// Restore the original function
console.log = console.log.restore();
```

You can also check the test [file](https://github.com/gabrielperales/spyOn/blob/master/test/spyonSpec.js) to see more details and examples.

## License

MIT © [Gabriel Perales](http://gabriel.perales.me)
