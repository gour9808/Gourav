import * as _ from 'lodash';

export class Utils {

  /**
* This code was written at 3:13AM in a caffiene high state.
* Don't ask how I came up with this. I just did.
* @param list 
* @param index 
*/
  static removeByIndex(list, index) {
    return [
      ...list.slice(0, index),
      ...list.slice(index + 1)
    ];
  }

  static everythingToLower(objs) {
    //  return _.mapValues(objs, function(s){ return _.isString(s) ? s.toLowerCase() : s; });
    return JSON.parse(JSON.stringify(objs, function (key, val) {
      //add checks for enum here
      switch (key) {
        case "chargerType":
        case "countryCode":
          return val;
        default:
          return typeof val === "string" ? val.toLowerCase() : val
      }
    }));
  }

  static validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

    static returnNumbers(no){
      var value =  /^[0-9 ,+-]*$/.test(no)
      return value;
  }

  /**
   * 
   * @param obj If you are reading this. go here and upvote the answer:https://stackoverflow.com/questions/18515254/recursively-remove-null-values-from-javascript-object
   */
  static pruneEmpty(obj) {
    return function prune(current) {
      _.forOwn(current, function (value, key) {
        if (_.isUndefined(value) || _.isNull(value) || _.isNaN(value) ||
          (_.isString(value) && _.isEmpty(value)) ||
          (_.isObject(value) && _.isEmpty(prune(value)))) {

          delete current[key];
        }
      });
      // remove any leftover undefined values from the delete 
      // operation on an array
      if (_.isArray(current)) _.pull(current, undefined);

      return current;

    }(_.cloneDeep(obj));  // Do not modify the original object, create a clone instead
  }

  static equals(x, y) {
    if (x === y) return true;
    // if both x and y are null or undefined and exactly the same

    if (!(x instanceof Object) || !(y instanceof Object)) return false;
    // if they are not strictly equal, they both need to be Objects

    if (x.constructor !== y.constructor) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

    for (var p in x) {
      if (!x.hasOwnProperty(p)) continue;
      // other properties were tested using x.constructor === y.constructor

      if (!y.hasOwnProperty(p)) return false;
      // allows to compare x[ p ] and y[ p ] when set to undefined

      if (x[p] === y[p]) continue;
      // if they have the same strict value or identity then they are equal

      if (typeof (x[p]) !== "object") return false;
      // Numbers, Strings, Functions, Booleans must be strictly equal

      if (!this.equals(x[p], y[p])) return false;
      // Objects and Arrays must be tested recursively
    }

    for (p in y) {
      if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
      // allows x[ p ] to be set to undefined
    }
    return true;
  }

  static parseQueryString(str) { // lifted from https://github.com/sindresorhus/query-string
    if (typeof str !== 'string') {
      return {};
    }

    str = str.trim().replace(/^(\?|#|&)/, '');

    if (!str) {
      return {};
    }

    return str.split('&').reduce(function (ret, param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      // Firefox (pre 40) decodes `%3D` to `=`
      // https://github.com/sindresorhus/query-string/pull/37
      var key = parts.shift();
      var val = parts.length > 0 ? parts.join('=') : undefined;

      key = decodeURIComponent(key);

      // missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
      val = val === undefined ? null : decodeURIComponent(val);

      if (!ret.hasOwnProperty(key)) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }

      return ret;
    }, {});
  };

  static getExtension(name) {
    return name.slice((name.lastIndexOf(".") - 1 >>> 0) + 2);
  }

  static returnImages(files){
    return _.filter(files,function(file){
      return _.includes(['jpeg','png','jpg','gif'],Utils.getExtension(file.name))
    })
  }

}