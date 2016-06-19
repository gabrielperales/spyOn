(function(global, factory) {
  'use strict';

  if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory;
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else {
    // Global Variables
    global.spyOn = factory;
  }
}(this, function(fn, ctx){
  var timesCalled = 0;
  var args = [];

  function spyfn(/* arguments */){
    timesCalled++;
    args.push([].slice.call(arguments));
    return fn.apply(ctx, arguments);
  };

  spyfn.restore = function(){
    return fn;
  };

  spyfn.getTimesCalled = function(){
    return timesCalled;
  };

  spyfn.getArgsOfCall = function(callIndex){
    return args[callIndex];
  };

  return spyfn;
}));
