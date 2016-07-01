// Spotify web api authorization guide and scopes
// https://developer.spotify.com/web-api/authorization-guide
// https://developer.spotify.com/web-api/using-scopes/
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var provider_1 = require("../provider");
var Spotify = (function (_super) {
    __extends(Spotify, _super);
    function Spotify() {
        _super.apply(this, arguments);
        this.authUrl = 'https://accounts.spotify.com/authorize';
        this.APP_SCOPE_DELIMITER = ' ';
        this.defaults = {
            responseType: 'token'
        };
    }
    return Spotify;
}(provider_1.OAuthProvider));
exports.Spotify = Spotify;
