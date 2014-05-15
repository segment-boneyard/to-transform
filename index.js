
var Transform = require('stream').Transform;
var inherits = require('util').inherits;
var tick = process.nextTick;

/**
 * Create a simple way
 */

module.exports = function(fn){

  function Stream(){
    Transform.apply(this, arguments);
  }

  /**
   * Inherit from Transform
   */

  inherits(Stream, Transform);

  /**
   * Set up our transform function
   */

  Stream.prototype._transform = function(chunk, encoding, callback){
    if (fn.length == 1) { // synchronous case
      var ret, err;
      try {
        ret = fn(chunk);
      } catch (e) {
        err = e;
      }
      return tick(function(){ callback(err, ret) });
    }
    if (fn.length == 2) return fn(chunk, callback);
    return fn(chunk, encoding, callback);
  };

  return Stream;
};