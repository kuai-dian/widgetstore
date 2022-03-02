var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { FieldType } from './constant';
import { Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon } from './geo/index';
import { ServerDate } from './serverDate/index';
var Util = (function () {
    function Util() {
    }
    Util.formatResDocumentData = function (documents) {
        return documents.map(function (document) {
            return Util.formatField(document);
        });
    };
    Util.formatField = function (document) {
        var keys = Object.keys(document);
        var protoField = {};
        if (Array.isArray(document)) {
            protoField = [];
        }
        keys.forEach(function (key) {
            var item = document[key];
            var type = Util.whichType(item);
            var realValue;
            switch (type) {
                case FieldType.GeoPoint:
                    realValue = new Point(item.coordinates[0], item.coordinates[1]);
                    break;
                case FieldType.GeoLineString:
                    realValue = new LineString(item.coordinates.map(function (point) { return new Point(point[0], point[1]); }));
                    break;
                case FieldType.GeoPolygon:
                    realValue = new Polygon(item.coordinates.map(function (line) { return new LineString(line.map(function (_a) {
                        var _b = __read(_a, 2), lng = _b[0], lat = _b[1];
                        return new Point(lng, lat);
                    })); }));
                    break;
                case FieldType.GeoMultiPoint:
                    realValue = new MultiPoint(item.coordinates.map(function (point) { return new Point(point[0], point[1]); }));
                    break;
                case FieldType.GeoMultiLineString:
                    realValue = new MultiLineString(item.coordinates.map(function (line) { return new LineString(line.map(function (_a) {
                        var _b = __read(_a, 2), lng = _b[0], lat = _b[1];
                        return new Point(lng, lat);
                    })); }));
                    break;
                case FieldType.GeoMultiPolygon:
                    realValue = new MultiPolygon(item.coordinates.map(function (polygon) {
                        return new Polygon(polygon.map(function (line) { return new LineString(line.map(function (_a) {
                            var _b = __read(_a, 2), lng = _b[0], lat = _b[1];
                            return new Point(lng, lat);
                        })); }));
                    }));
                    break;
                case FieldType.Timestamp:
                    realValue = new Date(item.$timestamp * 1000);
                    break;
                case FieldType.Object:
                case FieldType.Array:
                    realValue = Util.formatField(item);
                    break;
                case FieldType.ServerDate:
                    realValue = new Date(item.$date);
                    break;
                default:
                    realValue = item;
            }
            if (Array.isArray(protoField)) {
                protoField.push(realValue);
            }
            else {
                protoField[key] = realValue;
            }
        });
        return protoField;
    };
    Util.whichType = function (obj) {
        var type = Object.prototype.toString.call(obj).slice(8, -1);
        if (type === FieldType.Timestamp) {
            return FieldType.BsonDate;
        }
        if (type === FieldType.Object) {
            if (obj instanceof Point) {
                return FieldType.GeoPoint;
            }
            else if (obj instanceof Date) {
                return FieldType.Timestamp;
            }
            else if (obj instanceof ServerDate) {
                return FieldType.ServerDate;
            }
            if (obj.$timestamp) {
                type = FieldType.Timestamp;
            }
            else if (obj.$date) {
                type = FieldType.ServerDate;
            }
            else if (Point.validate(obj)) {
                type = FieldType.GeoPoint;
            }
            else if (LineString.validate(obj)) {
                type = FieldType.GeoLineString;
            }
            else if (Polygon.validate(obj)) {
                type = FieldType.GeoPolygon;
            }
            else if (MultiPoint.validate(obj)) {
                type = FieldType.GeoMultiPoint;
            }
            else if (MultiLineString.validate(obj)) {
                type = FieldType.GeoMultiLineString;
            }
            else if (MultiPolygon.validate(obj)) {
                type = FieldType.GeoMultiPolygon;
            }
        }
        return type;
    };
    Util.generateDocId = function () {
        var chars = 'ABCDEFabcdef0123456789';
        var autoId = '';
        for (var i = 0; i < 24; i++) {
            autoId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return autoId;
    };
    return Util;
}());
export { Util };
