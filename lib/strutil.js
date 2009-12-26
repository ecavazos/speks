exports.tostr = function(obj) {

  function objectToStr(o) {
    if(o === null) return 'null';

    var els = [], props = [];

    for(var p in o) {
      if (p.match(/^should/)) continue;
      props.push(p);
    }

    props = props.sort();

    for(var i = 0, ii = props.length; i < ii; i++)
      els.push([props[i], stringer(o[props[i]])].join(': '));

    return '{\n' + els.join(',\n') + '\n}';
  }

  function arrayToStr(a) {
    var els = [];
    var len = a.length;

    if(len == 0) return '[]';

    for(var i = 0, ii = len; i < ii; i++)
      els.push(inspect(a[i]));

    return '[' + els.join(',') + ']';
  }

  function sift() {
    switch(typeof(obj)) {
      case 'object':
        if(obj instanceof Array)
          return arrayToStr(obj);
        if(obj instanceof Function)
          return obj.toString();

        return objectToStr(obj);
      
      case 'string':
        return '"' + obj + '"';

      case 'undefined':
        return 'undefined';

      default:
        return obj.toString();
    }
  }
  
  sift();

};

