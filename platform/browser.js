"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var oauth_1 = require('../oauth');
var utility_1 = require('../utility');
var OauthBrowser = (function (_super) {
    __extends(OauthBrowser, _super);
    function OauthBrowser() {
        _super.apply(this, arguments);
        this.defaultWindowOptions = {
            width: 600,
            location: 1,
            toolbar: 0,
        };
    }
    OauthBrowser.prototype.openDialog = function (url, params, options) {
        if (options === void 0) { options = {}; }
        var windowParams = this.addWindowRect(utility_1.utils.defaults({ title: 'Authentication' }, params));
        var title = windowParams.title;
        delete windowParams.title;
        var popup = window.open(url, title, this.serializeOptions(windowParams));
        var watchDelay = this.constructor.WATCH_POPUP_TIMEOUT;
        return new Promise(function (resolve, reject) {
            if (typeof popup.focus === 'function') {
                popup.focus();
            }
            setTimeout(function watchPopup() {
                try {
                    if (popup.closed) {
                        return reject(new Error("The \"" + options.providerName + "\" sign in flow was canceled"));
                    }
                    if (popup.location.href.indexOf(options.resolveOnUri) === 0) {
                        popup.close();
                        resolve({ url: popup.location.href });
                    }
                }
                catch (e) {
                }
                setTimeout(watchPopup, watchDelay);
            }, watchDelay);
        });
    };
    OauthBrowser.prototype.addWindowRect = function (params) {
        var root = document.documentElement;
        var screenX = typeof window.screenX !== 'undefined' ? window.screenX : window.screenLeft;
        var screenY = typeof window.screenY !== 'undefined' ? window.screenY : window.screenTop;
        var outerWidth = typeof window.outerWidth !== 'undefined' ? window.outerWidth : root.clientWidth;
        var outerHeight = typeof window.outerHeight !== 'undefined' ? window.outerHeight : root.clientHeight - 22;
        screenX = screenX < 0 ? window.screen.width + screenX : screenX;
        params.height = Math.floor(outerHeight * 0.8);
        params.left = Math.floor(screenX + (outerWidth - params.width) / 2);
        params.top = Math.floor(screenY + (outerHeight - params.height) / 2.5);
        return params;
    };
    OauthBrowser.WATCH_POPUP_TIMEOUT = 100;
    return OauthBrowser;
}(oauth_1.Oauth));
exports.OauthBrowser = OauthBrowser;
