#Explanation of spy function

##Basic structure

The basic structure of the file is as follows:

```
var firstAnonFunc = function(global, factory){}
var secondAnonFunc = function(fn, ctx){ return spyfn }
firstAnonFunc(this, secondAnonFunc);
```
Using the (function(){}()) notation, the first anonymous function is executed as it is defined. This function is passed the global context held in the `this` variable and another anonymous function which in turn will generate the spy function whenever it is called.

##The first anonymous function
The role of the first anonymous function is to make the second anonymous function callable from any point in our script. This is done in one of three ways depending on the version of JavaScript. The simplest way is to simply assign the second anonymous function to a global variable named `spyOn`.

```
global.spyOn = factory
``` 
Remember, `factory` is just the second anonymous function. Now that function is globally accessible through `spyOn`.

##Second anonymous function
When `spyOn` is called it should be passed the function that you want to spy on. It will then return this function augmented with a few methods. i.e.

```
myFuncSpiedOn = spyOn(myFunc)
```

If myFuncSpiedOn is called it will return `fn.apply(ctx, arguments)`. In other words, it will execute `fn` (the function passed to `spyOn`) with context `ctx` (if it was passed as the second argument of `spyOn`) and the arguments of `fn`.

##Methods of the spy function

What about the extra methods?

- `myFuncSpiedOn` will count how many times it is called with `timesCalled`
- its arguments will be pushed as an array to the `args` array every time it is called. `[].slice.call(arguments)` is simply to convert the `arguments` array-like object to a real array.
- These values can then be accessed using `myFuncSpiedOn.getTimesCalled()` or `myFuncSpiedOn.getArgsOfCall(n)`, where you want the arguments that were passed the n-th time you called the function.   
- Calling `myFuncSpiedOn.restore()` will return the original function. 
