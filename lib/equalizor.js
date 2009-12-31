// TODO: This is an effing mess ...
// you know what to do.

var equal = function (a, b) {
  if (a === b) return true;

  if (a == b) return true;

  if (typeof (a) != typeof (b)) return false;

  if ((!a && b) || (a && !b)) return false;

  if (typeof (a) !== 'object' && typeof (a) !== 'function') return false;

  if (a.length && (a.length !== b.length)) return false;

  if (a instanceof Number) return a.valueOf() == b.valueOf();

  if (a instanceof Array) {

    for (var i = 0, ii = b.length; i < ii; i++) {
      if (!equal(a[i], b[i])) return false;
    }

    return b.length == a.length;

  } else if (a instanceof Object || a instanceof Function) {
    
    if (a.constructor !== b.constructor) return false;
    
    var aProps = [], bProps = [];
    
    for (property in a) {
      aProps.push(property);
    }

    for (property in b) {
      bProps.push(property);
    }

    aProps.sort(), bProps.sort();
    
    if (aProps.length != bProps.length) return false;

    for (var key in aProps) {
      if (!equal(aProps[key], bProps[key])) return false;
    }
  }
  
  return true;
};

exports.equal = equal;
