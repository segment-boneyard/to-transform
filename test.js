var Transform = require('./');
var assert = require('assert');

describe('to-transform', function(){
  it('should work for synchronous functions', function(done){
    var Stream = Transform(function(x){ return x + 1; });
    var stream = new Stream({ objectMode: true });
    stream.write(1);
    stream.write(2);
    stream.write(3);

    setTimeout(function(){
      assert.equal(stream.read(), 2);
      assert.equal(stream.read(), 3);
      assert.equal(stream.read(), 4);
      done();
    }, 10);
  });

  it('should work for async functions', function(done){
    var Stream = Transform(function(x, fn){ return fn(null, x + 1); });
    var stream = new Stream({ objectMode: true });
    stream.write(1);
    stream.write(2);
    stream.write(3);

    setTimeout(function(){
      assert.equal(stream.read(), 2);
      assert.equal(stream.read(), 3);
      assert.equal(stream.read(), 4);
      done();
    }, 10);
  });

  it('should work for custom stream implementors', function(){
    var Stream = Transform(function(chunk, encoding, fn){
      return fn(null, chunk.toString() + 'bar');
    });

    var stream = new Stream();
    stream.write(new Buffer('foo'));
    stream.write(new Buffer('bar'));
    stream.write(new Buffer('baz'));

    setTimeout(function(){
      assert.equal(stream.read(6), 'foobar');
      assert.equal(stream.read(6), 'barbar');
      assert.equal(stream.read(6), 'bazbar');
      done();
    }, 10);
  });
});