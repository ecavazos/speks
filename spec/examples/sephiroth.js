var Sephiroth = function() {
  var _name = 'Sephiroth';
  var _hp = 999;
  var _mp = 999;

  return {
    getName: function() {return _name;},
    setName: function(n) {return _name = n;},
    getHp: function() {return _hp;},
    getMp: function() {return _mp;}
  };
};

exports.Sephiroth = Sephiroth;
