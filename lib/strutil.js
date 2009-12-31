var tostr = exports.tostr = function(obj) {

  function objectToStr() {
    if(obj === null) return 'null';

    var els = [], props = [];

    for(var p in obj) {
      if (obj.hasOwnProperty(p))
        props.push(p);
    }

    props = props.sort();

    for(var i = 0, ii = props.length; i < ii; i++)
      els.push([props[i], tostr(obj[props[i]])].join(': '));

    return '{\n' + els.join(',\n') + '\n}';
  }

  function arrayToStr() {
    var els = [];
    var len = obj.length;

    if(len == 0) return '[]';

    for(var i = 0, ii = len; i < ii; i++)
      els.push(tostr(obj[i]));

    return '[' + els.join(',') + ']';
  }

  var typePicker = {
    object: function() {
      if(obj instanceof Array)
        return arrayToStr(obj);

      if(obj instanceof Function)
        return obj.toString();

      return objectToStr(obj);
    },

    string: function() {
      return '"' + obj + '"';
    },

    undefined: function() {
      return 'undefined';
    }
  };

  function str() {
    var type = typeof(obj);
    
    if(typePicker.hasOwnProperty(type))
      return typePicker[typeof(obj)]();
    
    return obj.toString();
  }

  return str();
};

