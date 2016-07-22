"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var provider_1 = require("../provider");
var LinkedIn = (function (_super) {
    __extends(LinkedIn, _super);
    function LinkedIn() {
        _super.apply(this, arguments);
        this.authUrl = 'https://www.linkedin.com/oauth/v2/authorization';
        this.APP_SCOPE_DELIMITER = ' ';
        this.defaults = {
            responseType: 'code'
        };
    }
    return LinkedIn;
}(provider_1.OAuthProvider));
exports.LinkedIn = LinkedIn;
