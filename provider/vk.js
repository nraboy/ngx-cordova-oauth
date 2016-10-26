"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var provider_1 = require("../provider");
var utility_1 = require('../utility');
var VK = (function (_super) {
    __extends(VK, _super);
    function VK(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.authUrl = 'https://oauth.vk.com/authorize';
        this.defaults = {
            responseType: 'token',
            redirectUri: 'https://oauth.vk.com/blank.html'
        };
        if (!options.appScope || options.appScope.length <= 0) {
            throw new Error("A " + this.name + " app scope must exist");
        }
    }
    VK.prototype.optionsToDialogUrl = function (options) {
        utility_1.utils.defaults(options, this.defaults);
        var url = _super.prototype.optionsToDialogUrl.call(this, options);
        if (options.display) {
            url += "&display=" + options.display;
        }
        if (options.v) {
            url += "&v=" + options.v;
        }
        if (options.revoke) {
            url += "&revoke=" + options.revoke;
        }
        return url;
    };
    return VK;
}(provider_1.OAuthProvider));
exports.VK = VK;
