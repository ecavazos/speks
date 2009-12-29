var Cloud = function() {
  var _name = 'Cloud';
  var _hp = 99;
  var _mp = 77;

  return {
    getName: function() {return _name;},
    setName: function(n) {return _name = n;},
    getHp: function() {return _hp;},
    getMp: function() {return _mp;}
  };
};

exports.Cloud = Cloud;
