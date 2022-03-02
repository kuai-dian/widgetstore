import { InternalSymbol } from './symbol';
export var getType = function (x) { return Object.prototype.toString.call(x).slice(8, -1).toLowerCase(); };
export var isObject = function (x) { return getType(x) === 'object'; };
export var isString = function (x) { return getType(x) === 'string'; };
export var isNumber = function (x) { return getType(x) === 'number'; };
export var isPromise = function (x) { return getType(x) === 'promise'; };
export var isFunction = function (x) { return typeof x === 'function'; };
export var isArray = function (x) { return Array.isArray(x); };
export var isDate = function (x) { return getType(x) === 'date'; };
export var isRegExp = function (x) { return getType(x) === 'regexp'; };
export var isInternalObject = function (x) { return x && (x._internalType instanceof InternalSymbol); };
export var isPlainObject = function (obj) {
    if (typeof obj !== 'object' || obj === null)
        return false;
    var proto = obj;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(obj) === proto;
};
