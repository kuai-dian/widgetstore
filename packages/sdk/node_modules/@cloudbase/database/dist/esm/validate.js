import { ErrorCode, WhereFilterOpList, OrderDirectionList, FieldType } from './constant';
import { Util } from './util';
var Validate = (function () {
    function Validate() {
    }
    Validate.isGeopoint = function (point, degree) {
        if (Util.whichType(degree) !== FieldType.Number) {
            throw new Error('Geo Point must be number type');
        }
        var degreeAbs = Math.abs(degree);
        if (point === 'latitude' && degreeAbs > 90) {
            throw new Error('latitude should be a number ranges from -90 to 90');
        }
        else if (point === 'longitude' && degreeAbs > 180) {
            throw new Error('longitude should be a number ranges from -180 to 180');
        }
        return true;
    };
    Validate.isInteger = function (param, num) {
        if (!Number.isInteger(num)) {
            throw new Error(param + ErrorCode.IntergerError);
        }
        return true;
    };
    Validate.isFieldOrder = function (direction) {
        if (OrderDirectionList.indexOf(direction) === -1) {
            throw new Error(ErrorCode.DirectionError);
        }
        return true;
    };
    Validate.isFieldPath = function (path) {
        if (!/^[a-zA-Z0-9-_\.]/.test(path)) {
            throw new Error();
        }
        return true;
    };
    Validate.isOperator = function (op) {
        if (WhereFilterOpList.indexOf(op) === -1) {
            throw new Error(ErrorCode.OpStrError);
        }
        return true;
    };
    Validate.isCollName = function (name) {
        if (!/^[a-zA-Z0-9]([a-zA-Z0-9-_]){1,32}$/.test(name)) {
            throw new Error(ErrorCode.CollNameError);
        }
        return true;
    };
    Validate.isDocID = function (docId) {
        if (!/^([a-fA-F0-9]){24}$/.test(docId)) {
            throw new Error(ErrorCode.DocIDError);
        }
        return true;
    };
    return Validate;
}());
export { Validate };
