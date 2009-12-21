var sephiroth = function() {
  this._name = "Sephiroth";
  this._hp = 999;
};

sephiroth.prototype.name = function() {
  return this._name;
};

sephiroth.prototype.hp = function() {
  return this._hp;
}

exports.sephiroth = sephiroth;
