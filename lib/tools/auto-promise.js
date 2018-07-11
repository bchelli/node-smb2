var slice = Array.prototype.slice;

// decorate an async function taking a callback to make it return a promise if
// no callback is passed
//
// `makeResult` is optional function
module.exports = function autoPromise(fn, makeResult) {
  return function() {
    var promise;

    var args = arguments;
    var n = args.length;
    if (n !== 0 && typeof args[n - 1] !== 'function') {
      args = slice.call(arguments);
      promise = new Promise(function(resolve, reject) {
        args.push(function(err, result) {
          if (err != null) {
            reject(err);
          } else {
            resolve(
              makeResult !== undefined
                ? makeResult.apply(this, slice.call(arguments, 1))
                : result
            );
          }
        });
      });
    }

    fn.apply(this, args);

    return promise;
  };
};
