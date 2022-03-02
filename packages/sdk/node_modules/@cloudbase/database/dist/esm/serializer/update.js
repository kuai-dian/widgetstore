import { UpdateCommand, isUpdateCommand, UPDATE_COMMANDS_LITERAL } from '../commands/update';
import { SYMBOL_UNSET_FIELD_NAME } from '../helper/symbol';
import { getType, isArray } from '../utils/type';
import { operatorToString } from '../operator-map';
import { flattenQueryObject, encodeInternalDataType, mergeConditionAfterEncode } from './common';
var UpdateSerializer = (function () {
    function UpdateSerializer() {
    }
    UpdateSerializer.encode = function (query) {
        var stringifier = new UpdateSerializer();
        return stringifier.encodeUpdate(query);
    };
    UpdateSerializer.prototype.encodeUpdate = function (query) {
        if (isUpdateCommand(query)) {
            return this.encodeUpdateCommand(query);
        }
        else if (getType(query) === 'object') {
            return this.encodeUpdateObject(query);
        }
        else {
            return query;
        }
    };
    UpdateSerializer.prototype.encodeUpdateCommand = function (query) {
        if (query.fieldName === SYMBOL_UNSET_FIELD_NAME) {
            throw new Error('Cannot encode a comparison command with unset field name');
        }
        switch (query.operator) {
            case UPDATE_COMMANDS_LITERAL.PUSH:
            case UPDATE_COMMANDS_LITERAL.PULL:
            case UPDATE_COMMANDS_LITERAL.PULL_ALL:
            case UPDATE_COMMANDS_LITERAL.POP:
            case UPDATE_COMMANDS_LITERAL.SHIFT:
            case UPDATE_COMMANDS_LITERAL.UNSHIFT:
            case UPDATE_COMMANDS_LITERAL.ADD_TO_SET: {
                return this.encodeArrayUpdateCommand(query);
            }
            default: {
                return this.encodeFieldUpdateCommand(query);
            }
        }
    };
    UpdateSerializer.prototype.encodeFieldUpdateCommand = function (query) {
        var _a, _b, _c, _d;
        var $op = operatorToString(query.operator);
        switch (query.operator) {
            case UPDATE_COMMANDS_LITERAL.REMOVE: {
                return _a = {},
                    _a[$op] = (_b = {},
                        _b[query.fieldName] = '',
                        _b),
                    _a;
            }
            default: {
                return _c = {},
                    _c[$op] = (_d = {},
                        _d[query.fieldName] = query.operands[0],
                        _d),
                    _c;
            }
        }
    };
    UpdateSerializer.prototype.encodeArrayUpdateCommand = function (query) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var $op = operatorToString(query.operator);
        switch (query.operator) {
            case UPDATE_COMMANDS_LITERAL.PUSH: {
                var modifiers = void 0;
                if (isArray(query.operands)) {
                    modifiers = {
                        $each: query.operands.map(encodeInternalDataType)
                    };
                }
                else {
                    modifiers = query.operands;
                }
                return _a = {},
                    _a[$op] = (_b = {},
                        _b[query.fieldName] = modifiers,
                        _b),
                    _a;
            }
            case UPDATE_COMMANDS_LITERAL.UNSHIFT: {
                var modifiers = {
                    $each: query.operands.map(encodeInternalDataType),
                    $position: 0
                };
                return _c = {},
                    _c[$op] = (_d = {},
                        _d[query.fieldName] = modifiers,
                        _d),
                    _c;
            }
            case UPDATE_COMMANDS_LITERAL.POP: {
                return _e = {},
                    _e[$op] = (_f = {},
                        _f[query.fieldName] = 1,
                        _f),
                    _e;
            }
            case UPDATE_COMMANDS_LITERAL.SHIFT: {
                return _g = {},
                    _g[$op] = (_h = {},
                        _h[query.fieldName] = -1,
                        _h),
                    _g;
            }
            default: {
                return _j = {},
                    _j[$op] = (_k = {},
                        _k[query.fieldName] = encodeInternalDataType(query.operands),
                        _k),
                    _j;
            }
        }
    };
    UpdateSerializer.prototype.encodeUpdateObject = function (query) {
        var flattened = flattenQueryObject(query);
        for (var key in flattened) {
            if (/^\$/.test(key))
                continue;
            var val = flattened[key];
            if (isUpdateCommand(val)) {
                flattened[key] = val._setFieldName(key);
                var condition = this.encodeUpdateCommand(flattened[key]);
                mergeConditionAfterEncode(flattened, condition, key);
            }
            else {
                flattened[key] = val = encodeInternalDataType(val);
                var $setCommand = new UpdateCommand(UPDATE_COMMANDS_LITERAL.SET, [val], key);
                var condition = this.encodeUpdateCommand($setCommand);
                mergeConditionAfterEncode(flattened, condition, key);
            }
        }
        return flattened;
    };
    return UpdateSerializer;
}());
export { UpdateSerializer };
