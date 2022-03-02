import { QueryCommand, QUERY_COMMANDS_LITERAL } from './commands/query';
import { LogicCommand, LOGIC_COMMANDS_LITERAL } from './commands/logic';
import { UpdateCommand, UPDATE_COMMANDS_LITERAL } from './commands/update';
import { isArray, isObject, isString } from './utils/type';
import Aggregation from './aggregate';
export var Command = {
    eq: function (val) {
        return new QueryCommand(QUERY_COMMANDS_LITERAL.EQ, [val]);
    },
    neq: function (val) {
        return new QueryCommand(QUERY_COMMANDS_LITERAL.NEQ, [val]);
    },
    lt: function (val) {
        return new QueryCommand(QUERY_COMMANDS_LITERAL.LT, [val]);
    },
    lte: function (val) {
        return new QueryCommand(QUERY_COMMANDS_LITERAL.LTE, [val]);
    },
    gt: function (val) {
        return new QueryCommand(QUERY_COMMANDS_LITERAL.GT, [val]);
    },
    gte: function (val) {
        return new QueryCommand(QUERY_COMMANDS_LITERAL.GTE, [val]);
    },
    in: function (val) {
        return new QueryCommand(QUERY_COMMANDS_LITERAL.IN, val);
    },
    nin: function (val) {
        return new QueryCommand(QUERY_COMMANDS_LITERAL.NIN, val);
    },
    all: function (val) {
        return new QueryCommand(QUERY_COMMANDS_LITERAL.ALL, val);
    },
    elemMatch: function (val) {
        return new QueryCommand(QUERY_COMMANDS_LITERAL.ELEM_MATCH, [val]);
    },
    exists: function (val) {
        return new QueryCommand(QUERY_COMMANDS_LITERAL.EXISTS, [val]);
    },
    size: function (val) {
        return new QueryCommand(QUERY_COMMANDS_LITERAL.SIZE, [val]);
    },
    mod: function (val) {
        return new QueryCommand(QUERY_COMMANDS_LITERAL.MOD, [val]);
    },
    geoNear: function (val) {
        return new QueryCommand(QUERY_COMMANDS_LITERAL.GEO_NEAR, [val]);
    },
    geoWithin: function (val) {
        return new QueryCommand(QUERY_COMMANDS_LITERAL.GEO_WITHIN, [val]);
    },
    geoIntersects: function (val) {
        return new QueryCommand(QUERY_COMMANDS_LITERAL.GEO_INTERSECTS, [val]);
    },
    and: function () {
        var __expressions__ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            __expressions__[_i] = arguments[_i];
        }
        var expressions = isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
        return new LogicCommand(LOGIC_COMMANDS_LITERAL.AND, expressions);
    },
    nor: function () {
        var __expressions__ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            __expressions__[_i] = arguments[_i];
        }
        var expressions = isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
        return new LogicCommand(LOGIC_COMMANDS_LITERAL.NOR, expressions);
    },
    or: function () {
        var __expressions__ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            __expressions__[_i] = arguments[_i];
        }
        var expressions = isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
        return new LogicCommand(LOGIC_COMMANDS_LITERAL.OR, expressions);
    },
    not: function () {
        var __expressions__ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            __expressions__[_i] = arguments[_i];
        }
        var expressions = isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
        return new LogicCommand(LOGIC_COMMANDS_LITERAL.NOT, expressions);
    },
    set: function (val) {
        return new UpdateCommand(UPDATE_COMMANDS_LITERAL.SET, [val]);
    },
    remove: function () {
        return new UpdateCommand(UPDATE_COMMANDS_LITERAL.REMOVE, []);
    },
    inc: function (val) {
        return new UpdateCommand(UPDATE_COMMANDS_LITERAL.INC, [val]);
    },
    mul: function (val) {
        return new UpdateCommand(UPDATE_COMMANDS_LITERAL.MUL, [val]);
    },
    push: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var values;
        if (isObject(args[0]) && args[0].hasOwnProperty('each')) {
            var options = args[0];
            values = {
                $each: options.each,
                $position: options.position,
                $sort: options.sort,
                $slice: options.slice
            };
        }
        else if (isArray(args[0])) {
            values = args[0];
        }
        else {
            values = Array.from(args);
        }
        return new UpdateCommand(UPDATE_COMMANDS_LITERAL.PUSH, values);
    },
    pull: function (values) {
        return new UpdateCommand(UPDATE_COMMANDS_LITERAL.PULL, values);
    },
    pullAll: function (values) {
        return new UpdateCommand(UPDATE_COMMANDS_LITERAL.PULL_ALL, values);
    },
    pop: function () {
        return new UpdateCommand(UPDATE_COMMANDS_LITERAL.POP, []);
    },
    shift: function () {
        return new UpdateCommand(UPDATE_COMMANDS_LITERAL.SHIFT, []);
    },
    unshift: function () {
        var __values__ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            __values__[_i] = arguments[_i];
        }
        var values = isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
        return new UpdateCommand(UPDATE_COMMANDS_LITERAL.UNSHIFT, values);
    },
    addToSet: function (values) {
        return new UpdateCommand(UPDATE_COMMANDS_LITERAL.ADD_TO_SET, values);
    },
    rename: function (values) {
        return new UpdateCommand(UPDATE_COMMANDS_LITERAL.RENAME, [values]);
    },
    bit: function (values) {
        return new UpdateCommand(UPDATE_COMMANDS_LITERAL.BIT, [values]);
    },
    max: function (values) {
        return new UpdateCommand(UPDATE_COMMANDS_LITERAL.MAX, [values]);
    },
    min: function (values) {
        return new UpdateCommand(UPDATE_COMMANDS_LITERAL.MIN, [values]);
    },
    expr: function (values) {
        return {
            $expr: values
        };
    },
    jsonSchema: function (schema) {
        return {
            $jsonSchema: schema
        };
    },
    text: function (values) {
        if (isString(values)) {
            return {
                $search: values.search
            };
        }
        else {
            return {
                $search: values.search,
                $language: values.language,
                $caseSensitive: values.caseSensitive,
                $diacriticSensitive: values.diacriticSensitive
            };
        }
    },
    aggregate: {
        pipeline: function () {
            return new Aggregation();
        },
        abs: function (param) { return new AggregationOperator('abs', param); },
        add: function (param) { return new AggregationOperator('add', param); },
        ceil: function (param) { return new AggregationOperator('ceil', param); },
        divide: function (param) { return new AggregationOperator('divide', param); },
        exp: function (param) { return new AggregationOperator('exp', param); },
        floor: function (param) { return new AggregationOperator('floor', param); },
        ln: function (param) { return new AggregationOperator('ln', param); },
        log: function (param) { return new AggregationOperator('log', param); },
        log10: function (param) { return new AggregationOperator('log10', param); },
        mod: function (param) { return new AggregationOperator('mod', param); },
        multiply: function (param) { return new AggregationOperator('multiply', param); },
        pow: function (param) { return new AggregationOperator('pow', param); },
        sqrt: function (param) { return new AggregationOperator('sqrt', param); },
        subtract: function (param) { return new AggregationOperator('subtract', param); },
        trunc: function (param) { return new AggregationOperator('trunc', param); },
        arrayElemAt: function (param) { return new AggregationOperator('arrayElemAt', param); },
        arrayToObject: function (param) { return new AggregationOperator('arrayToObject', param); },
        concatArrays: function (param) { return new AggregationOperator('concatArrays', param); },
        filter: function (param) { return new AggregationOperator('filter', param); },
        in: function (param) { return new AggregationOperator('in', param); },
        indexOfArray: function (param) { return new AggregationOperator('indexOfArray', param); },
        isArray: function (param) { return new AggregationOperator('isArray', param); },
        map: function (param) { return new AggregationOperator('map', param); },
        range: function (param) { return new AggregationOperator('range', param); },
        reduce: function (param) { return new AggregationOperator('reduce', param); },
        reverseArray: function (param) { return new AggregationOperator('reverseArray', param); },
        size: function (param) { return new AggregationOperator('size', param); },
        slice: function (param) { return new AggregationOperator('slice', param); },
        zip: function (param) { return new AggregationOperator('zip', param); },
        and: function (param) { return new AggregationOperator('and', param); },
        not: function (param) { return new AggregationOperator('not', param); },
        or: function (param) { return new AggregationOperator('or', param); },
        cmp: function (param) { return new AggregationOperator('cmp', param); },
        eq: function (param) { return new AggregationOperator('eq', param); },
        gt: function (param) { return new AggregationOperator('gt', param); },
        gte: function (param) { return new AggregationOperator('gte', param); },
        lt: function (param) { return new AggregationOperator('lt', param); },
        lte: function (param) { return new AggregationOperator('lte', param); },
        neq: function (param) { return new AggregationOperator('ne', param); },
        cond: function (param) { return new AggregationOperator('cond', param); },
        ifNull: function (param) { return new AggregationOperator('ifNull', param); },
        switch: function (param) { return new AggregationOperator('switch', param); },
        dateFromParts: function (param) { return new AggregationOperator('dateFromParts', param); },
        dateFromString: function (param) { return new AggregationOperator('dateFromString', param); },
        dayOfMonth: function (param) { return new AggregationOperator('dayOfMonth', param); },
        dayOfWeek: function (param) { return new AggregationOperator('dayOfWeek', param); },
        dayOfYear: function (param) { return new AggregationOperator('dayOfYear', param); },
        isoDayOfWeek: function (param) { return new AggregationOperator('isoDayOfWeek', param); },
        isoWeek: function (param) { return new AggregationOperator('isoWeek', param); },
        isoWeekYear: function (param) { return new AggregationOperator('isoWeekYear', param); },
        millisecond: function (param) { return new AggregationOperator('millisecond', param); },
        minute: function (param) { return new AggregationOperator('minute', param); },
        month: function (param) { return new AggregationOperator('month', param); },
        second: function (param) { return new AggregationOperator('second', param); },
        hour: function (param) { return new AggregationOperator('hour', param); },
        week: function (param) { return new AggregationOperator('week', param); },
        year: function (param) { return new AggregationOperator('year', param); },
        literal: function (param) { return new AggregationOperator('literal', param); },
        mergeObjects: function (param) { return new AggregationOperator('mergeObjects', param); },
        objectToArray: function (param) { return new AggregationOperator('objectToArray', param); },
        allElementsTrue: function (param) { return new AggregationOperator('allElementsTrue', param); },
        anyElementTrue: function (param) { return new AggregationOperator('anyElementTrue', param); },
        setDifference: function (param) { return new AggregationOperator('setDifference', param); },
        setEquals: function (param) { return new AggregationOperator('setEquals', param); },
        setIntersection: function (param) { return new AggregationOperator('setIntersection', param); },
        setIsSubset: function (param) { return new AggregationOperator('setIsSubset', param); },
        setUnion: function (param) { return new AggregationOperator('setUnion', param); },
        concat: function (param) { return new AggregationOperator('concat', param); },
        dateToString: function (param) { return new AggregationOperator('dateToString', param); },
        indexOfBytes: function (param) { return new AggregationOperator('indexOfBytes', param); },
        indexOfCP: function (param) { return new AggregationOperator('indexOfCP', param); },
        split: function (param) { return new AggregationOperator('split', param); },
        strLenBytes: function (param) { return new AggregationOperator('strLenBytes', param); },
        strLenCP: function (param) { return new AggregationOperator('strLenCP', param); },
        strcasecmp: function (param) { return new AggregationOperator('strcasecmp', param); },
        substr: function (param) { return new AggregationOperator('substr', param); },
        substrBytes: function (param) { return new AggregationOperator('substrBytes', param); },
        substrCP: function (param) { return new AggregationOperator('substrCP', param); },
        toLower: function (param) { return new AggregationOperator('toLower', param); },
        toUpper: function (param) { return new AggregationOperator('toUpper', param); },
        meta: function (param) { return new AggregationOperator('meta', param); },
        addToSet: function (param) { return new AggregationOperator('addToSet', param); },
        avg: function (param) { return new AggregationOperator('avg', param); },
        first: function (param) { return new AggregationOperator('first', param); },
        last: function (param) { return new AggregationOperator('last', param); },
        max: function (param) { return new AggregationOperator('max', param); },
        min: function (param) { return new AggregationOperator('min', param); },
        push: function (param) { return new AggregationOperator('push', param); },
        stdDevPop: function (param) { return new AggregationOperator('stdDevPop', param); },
        stdDevSamp: function (param) { return new AggregationOperator('stdDevSamp', param); },
        sum: function (param) { return new AggregationOperator('sum', param); },
        let: function (param) { return new AggregationOperator('let', param); }
    },
    project: {
        slice: function (param) { return new ProjectionOperator('slice', param); },
        elemMatch: function (param) { return new ProjectionOperator('elemMatch', param); }
    }
};
var AggregationOperator = (function () {
    function AggregationOperator(name, param) {
        this['$' + name] = param;
    }
    return AggregationOperator;
}());
var ProjectionOperator = (function () {
    function ProjectionOperator(name, param) {
        this['$' + name] = param;
    }
    return ProjectionOperator;
}());
export default Command;
