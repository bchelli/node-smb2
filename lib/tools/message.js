
var MsErref = require('./ms_erref')
  , bigint = require('./bigint')
  ;

var defaults = {

  successCode: 'STATUS_SUCCESS'

, parse:function(connection, cb){

    var self = this;

    return function(response){
      var h = response.getHeaders()
        , err = MsErref.getStatus(bigint.fromBuffer(h.Status).toNumber())
        ;
      if(err.code == self.successCode){
        self.onSuccess && self.onSuccess(connection, response);
        cb && cb(
          null
        , self.parseResponse && self.parseResponse(response)
        );
      } else {
        var error = new Error(MsErref.getErrorMessage(err))
        error.code = err.code
        cb && cb(error);
      }
    };

  }

, parseResponse:function(response){
    return response.getResponse();
  }

};

module.exports = function(obj){

  for ( var key in defaults ) {
    obj[key] = obj[key] || defaults[key];
  }

  return obj;

};

