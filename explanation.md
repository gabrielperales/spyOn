#Explanation of spy function

##Basic structure

The basic structure of the file is as follows:

```
var firstAnonFunc = function(global, factory){}
var secondAnonFunc = function(fn, ctx){ return spyfn }
firstAnonFunc(this, secondAnonFunc);
```
Using the `(function(){}())` notation, the first anonymous function is executed immediately after it is defined. This function is passed the global context held in the `this` variable and another anonymous function which in turn will generate the spy function whenever it is called.

##The first anonymous function
The role of the first anonymous function is twofold. First, it ensures that all variables are private and so will not accidentally conflict with variables defined in other modules or scripts. Second, while keeping everything else private, it makes one object – the second anonymous function – publically accessible outside of the closure.

This is done in one of three ways depending on the user's chosen module format. Because the three main ways of modularising code are covered, this pattern is called a *Universal Module Definition*. What are the three ways?

1. If an `export` object exists, then we know the user can import modules using the CommonJS format (implemented by Node). We make our function (`factory`) accessible by adding it to the `exports` object.
2. Otherwise, if there is a function called `define` with a method `amd` then we know the user can import modules using the Asynchronous Module Definition format (implemented by RequireJS). We make our function accessible by passing it to the define function.
3. Finally, if neither module format is available, then the function is simply assigned to a global variable named `spyOn`.

Remember, the function that we are making accessible (`factory`) is just the second anonymous function.

##Second anonymous function
When we import `factory` in another module, we should give it a name like `spyOn` (if we accessing it through the global context, it will already have this name). `spyOn` should be passed the function that you want to spy on. It will then return this function augmented with a few methods. i.e.

```
myFuncSpiedOn = spyOn(myFunc)
```

If myFuncSpiedOn is called it will return `fn.apply(ctx, arguments)`. In other words, it will execute `fn` (the function passed to `spyOn`) with context `ctx` (if it was passed as the second argument of `spyOn`) and the arguments of `myFuncSpiedOn`.

##Methods of the spy function

What about the extra methods?

- `myFuncSpiedOn` will count how many times it is called with `timesCalled`
- its arguments will be pushed as an array to the `args` array every time it is called. `[].slice.call(arguments)` is simply to convert the `arguments` array-like object to a real array.
- These values can then be accessed using `myFuncSpiedOn.getTimesCalled()` or `myFuncSpiedOn.getArgsOfCall(n)`, where you want the arguments that were passed the n-th time you called the function.   
- Calling `myFuncSpiedOn.restore()` will return the original function. 
