describe('Testing the test environment', function(){
  it('expect true to be true, and false not to be true', function(){
    expect(true).toEqual(true);
    expect(false).not.toEqual(true);
  });
});

describe('spyOn', function(){
  var fakeFn;
  var obj;

  beforeEach(function() {
    fakeFn = function(){
      return 'it works';
    };
    obj = {
      text: 'context is also working!',
      getText: function(){
        return this.text;
      }
    };
  });

  it('execution should return a function', function(){
    var actual = typeof spyOn();
    var expected = 'function';
    expect(actual).toEqual(expected);
  });

  it('returns a different function from which we have passed through', function(){
    var actual = spyOn(fakeFn);
    var notExpected = fakeFn;
    expect(actual).not.toEqual(notExpected);
  });

  it('executing the returned function returns the same value of the original function', function(){
    fakeFn = spyOn(fakeFn);
    var actual = fakeFn();
    var expected = 'it works';
    expect(actual).toEqual(expected);
  });

  it('should be executed on the context we have passed as a paramter', function(){
    obj.getText = spyOn(obj.getText, obj);
    var actual = obj.getText();
    var expected = 'context is also working!';
    expect(actual).toEqual(expected);
  });

  it('restore method returns our original function', function(){
    var spy = spyOn(fakeFn);
    var actual = spy.restore();
    var expected = fakeFn;
    expect(actual).toEqual(expected);
  });

  it('getTimesCalled returns the number of times that our spied function has been called',
  function(){
    fakeFn = spyOn(fakeFn);
    var actual, expected;

    actual = fakeFn.getTimesCalled();
    expected = 0;
    expect(actual).toEqual(expected);
    fakeFn();
    actual = fakeFn.getTimesCalled();
    expected = 1;
    expect(actual).toEqual(expected);
    fakeFn();
    actual = fakeFn.getTimesCalled();
    expected = 2;
    expect(actual).toEqual(expected);
    fakeFn();
    actual = fakeFn.getTimesCalled();
    expected = 3;
    expect(actual).toEqual(expected);
  });

  it('getArgsOfCall returns an array with the arguments of the nth call', function(){
    fakeFn = spyOn(fakeFn);

    fakeFn(1,2,3,4,5);
    var actual = fakeFn.getArgsOfCall(0);
    var expected = [1,2,3,4,5];
    expect(actual).toEqual(expected);
  });
});
