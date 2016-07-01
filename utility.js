"use strict";
exports.utils = {
    parseQueryString: function (url) {
        var values = url.split(/[?#]{1,2}/)[1].split('&');
        return values.reduce(function (map, value) {
            var _a = value.split('='), paramName = _a[0], paramValue = _a[1];
            map[decodeURIComponent(paramName)] = decodeURIComponent(paramValue);
            return map;
        }, {});
    },
    defaults: function (target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        sources.forEach(function (source) {
            for (var prop in source) {
                if (!target.hasOwnProperty(prop)) {
                    target[prop] = source[prop];
                }
            }
        });
        return target;
    }
};
