'use strict';
(function(window){
  var spyOn = function(fn, ctx){
    var timesCalled = 0;
    var args = [];

    function spyfn(){
      timesCalled++;
      args.push([].slice.call(arguments));
      return fn.apply(ctx, arguments);
    };

    spyfn.restore = function(){
      return fn;
    };

    spyfn.reset = function(){
      timesCalled = 0;
      args = [];
    };

    spyfn.getTimesCalled = function(){
      return timesCalled;
    };

    spyfn.getArgsOfCall = function(callIndex){
      return [].slice.call(args[callIndex]);
    };

    return spyfn;
  };

  window.spyOn = spyOn;
}(window));
