
var BigInt = module.exports = function(n, v){

  if(BigInt.isBigInt(n)){

    this.buffer = new Buffer(n.buffer.length);
    n.buffer.copy(this.buffer, 0);
    this.sign = n.sign;

  } else {

    this.buffer = new Buffer(n);
    this.buffer.fill(0);
    this.sign = 1;

    v = v || 0;

    if(v != 0){

      if(v<0) {
        this.sign = -1;
        v = -v;
      }

      v = v.toString(16);

      var size = Math.ceil(v.length/2)
        , carry = size*2 - v.length
        ;

      for(var i=0; i<size; i++) {
        var start = (size - i - 1) * 2 - carry;
        this.buffer.writeUInt8(
          parseInt( start == -1 ? v.substr(0,1) : v.substr(start, 2), 16)
        , i
        );
      }

    }

  }

}


/*
 * STATICS
 */
BigInt.isBigInt = function(v){
  return v && v.buffer && Buffer.isBuffer(v.buffer);
}

BigInt.toBigInt = function(n, v){
  return new BigInt(n, v);
}

BigInt.fromBuffer = function(b, sign){
  sign = typeof sign == 'undefined' ? 1 : sign;
  var bi = new BigInt(0);
  bi.sign = sign;
  bi.buffer = b;
  return bi;
}


/*
 * ADD / SUB
 */
BigInt.prototype.add = function(v){

  if(!BigInt.isBigInt(v)) {
    v = BigInt.toBigInt(this.buffer.length, v);
  }

  if(this.sign != v.sign){
    return this.neg().sub(v);
  }

  var carry = 0
    , n = Math.max(v.buffer.length, this.buffer.length)
    , result = new BigInt(n);
    ;

  for(var i=0;i<n;i++){
    var r = ( i<this.buffer.length ? this.buffer.readUInt8(i) : 0 )
          + ( i<v.buffer.length    ? v.buffer.readUInt8(i)    : 0 )
          + carry
          ;
    result.buffer.writeUInt8(r & 0xFF, i);
    carry = r >> 8;
  }

  result.sign = this.sign;
  
  return result;

}

BigInt.prototype.neg = function(v){
  var result = new BigInt(this);
  result.sign *= -1;
  return result;
}

BigInt.prototype.abs = function(v){
  var result = new BigInt(this);
  result.sign = 1;
  return result;
}

BigInt.prototype.sub = function(v){

  if(!BigInt.isBigInt(v)) {
    v = BigInt.toBigInt(this.buffer.length, v);
  }

  if(this.sign != v.sign) {
    return this.add(v.neg());
  }

  var carry = 0
    , a = new BigInt(this)
    , b = new BigInt(v)
    , n = Math.max(a.buffer.length, b.buffer.length)
    , result = new BigInt(n)
    , sign = this.sign
    ;

  if(a.abs().lt(b.abs())){
    var t = a;
    a = b;
    b = t;
    sign *= -1;
  }

  for(var i=0; i<n; i++){
    var va = ( i<a.buffer.length ? a.buffer.readUInt8(i) : 0 )
      , vb = ( i<b.buffer.length ? b.buffer.readUInt8(i) : 0 )
      , c = 0
      , r = va-vb-carry
      ;

    while(r<0){
      r+=0xFF;
      c--;
    }

    result.buffer.writeUInt8(r & 0xFF, i);
    carry = (r >> 8) + c;
  }

  result.sign = sign;

  return result;

}


/*
 * EXPORTS
 */
BigInt.prototype.toBuffer = function(){ return this.buffer }

BigInt.prototype.toNumber = function(){

  var b = new Buffer(this.buffer.length);

  for(var i=0; i<this.buffer.length; i++){
    b.writeUInt8(this.buffer.readUInt8(this.buffer.length - i - 1), i);
  }

  return parseInt(b.toString('hex'), 16);

}


/*
 * COMPARE
 */
BigInt.prototype.compare = function(v){

  if(!BigInt.isBigInt(v)) {
    v = BigInt.toBigInt(this.buffer.length, v);
  }

  var n = Math.max(v.buffer.length, this.buffer.length);

  if(this.sign > v.sign) return 1;
  if(this.sign < v.sign) return -1;

  for(var i=n-1;i>=0;i--){
    var a = ( i<this.buffer.length ? this.buffer.readUInt8(i) : 0 )
      , b = ( i<v.buffer.length    ? v.buffer.readUInt8(i)    : 0 )
      ;
    if(a!=b){
      return a > b ? this.sign : -this.sign;
    }
  }

  return 0;

}

BigInt.prototype.lt = function(v){
  return this.compare(v) < 0;
}

BigInt.prototype.le = function(v){
  return this.compare(v) <= 0;
}

BigInt.prototype.gt = function(v){
  return this.compare(v) > 0;
}

BigInt.prototype.ge = function(v){
  return this.compare(v) >= 0;
}




