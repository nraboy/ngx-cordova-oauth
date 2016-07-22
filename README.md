[![Build Status](https://travis-ci.org/nraboy/ng2-cordova-oauth.svg?branch=master)](https://travis-ci.org/nraboy/ng2-cordova-oauth)
[![PayPal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://paypal.me/nraboy)

# Angular 2 Cordova Oauth

ng2-cordova-oauth is an Angular 2 Apache Cordova Oauth library.  The purpose of this library is to quickly and easily obtain an access token from various web services to use their APIs.


## Requirements

* Apache Cordova 5+
* [Apache Cordova InAppBrowser Plugin](http://cordova.apache.org/docs/en/3.0.0/cordova_inappbrowser_inappbrowser.md.html)
* [Apache Cordova Whitelist Plugin](https://github.com/apache/cordova-plugin-whitelist)


## Installing ng2-cordova-oauth Into Your Project

### Installing

From the root of your Apache Cordova project, execute the following:

```
npm install ng2-cordova-oauth --save
```

This will install ng2-cordova-oauth and its dependencies.

### Injecting:

Once installed, you need to inject the library classes into every class in which you wish to use them.  For example, if you wish to use Facebook oauth in a particular class, it would look something like:

```javascript
import {CordovaOauth, Facebook, Google} from 'ng2-cordova-oauth/core';
```

Each provider will have it's own class.  At this point, ng2-cordova-oauth is installed into your project and is ready for use.


## Using ng2-cordova-oauth In Your Project

Each web service API acts independently in this library.  However, when configuring each web service, one thing must remain consistent.  You must use **http://localhost/callback** as your callback / redirect URI.  This is because this library will perform tasks when this URL is found.

```javascript
Facebook({"clientId": String, "appScope": Array<String>, "redirectUri": String, "authType": String});
Google({"clientId": String, "appScope": Array<String>, "redirectUri": String});
Imgur({"clientId": String, "redirectUri": String});
Instagram({"clientId": String, "appScope": Array<String>, "redirectUri": String});
Meetup({"clientId": String, "redirectUri": String});
LinkedIn({"clientId": String, "appScope": Array<String>, "state": String, "redirectUri": String});
```

Each API call returns a promise.  The success callback will provide a response object and the error
callback will return a string.  Not all providers use implicit grants.  Any provider that uses an explicit grant will return a `code` rather than an `access_token`.  The `code` must be
further exchanged server side for an `access_token`.  This is for the safety of your users.

```javascript
this.cordovaOauth = new CordovaOauth(new Facebook({clientId: "CLIENT_ID_HERE", appScope: ["email"]}));
this.cordovaOauth.login().then((success) => {
    console.log(JSON.stringify(success));
}, (error) => {
    console.log(JSON.stringify(error));
});
```

As of Apache Cordova 5.0.0, the [whitelist plugin](https://blog.nraboy.com/2015/05/whitelist-external-resources-for-use-in-ionic-framework/) must be used in order to reach external web services.

This library will **NOT** work with a web browser, ionic serve, or ionic view.  It **MUST** be used via installing to a device or simulator.

## A Working Example

```javascript
import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {CordovaOauth, Facebook, Google, LinkedIn} from "ng2-cordova-oauth/core";

@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

    private cordovaOauth: CordovaOauth;

    constructor(private navCtrl: NavController, private platform: Platform) { }

    public facebook() {
        this.cordovaOauth = new CordovaOauth(new Facebook({clientId: "CLIENT_ID_HERE", appScope: ["email"]}));
        this.platform.ready().then(() => {
            this.cordovaOauth.login().then(success => {
                console.log("RESULT: " + JSON.stringify(success));
            }, error => {
                console.log("ERROR: ", error);
            });
        });
    }

}
```

## Version History

Coming soon...


## Contribution Rules

All contributions must be made via the `development` branch.  This keeps the project more maintainable in terms of versioning as well as code control.


## Have a question or found a bug (compliments work too)?

This project is maintained by **Nic Raboy**.

Tweet Nic Raboy on Twitter - [@nraboy](https://www.twitter.com/nraboy)


## Resources

Ionic 2 - [http://www.ionicframework.com](http://www.ionicframework.com)

Angular 2 - [https://www.angular.io](https://www.angular.io)

Apache Cordova - [http://cordova.apache.org](http://cordova.apache.org)

Nic Raboy's Code Blog - [https://www.thepolyglotdeveloper.com](https://www.thepolyglotdeveloper.com)
