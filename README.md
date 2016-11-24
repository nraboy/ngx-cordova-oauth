[![Build Status](https://travis-ci.org/nraboy/ng2-cordova-oauth.svg?branch=master)](https://travis-ci.org/nraboy/ng2-cordova-oauth)
[![PayPal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://paypal.me/nraboy)

# Angular 2 Cordova Oauth

ng2-cordova-oauth is an Oauth library which easily integrates in Angular2/Ionic2 or any other WEB or Cordova applications. The purpose of this library is to quickly and easily obtain an access token from various web services to use their APIs.


## Requirements

For Cordova application:
* Apache Cordova 5+
* [Apache Cordova InAppBrowser Plugin](http://cordova.apache.org/docs/en/3.0.0/cordova_inappbrowser_inappbrowser.md.html)
* [Apache Cordova Whitelist Plugin](https://github.com/apache/cordova-plugin-whitelist)

For Web application:
* webpack, systemjs or amd loaders


## Installing ng2-cordova-oauth Into Your Project

### Installing

From the root of your Apache Cordova project, execute the following:

```
npm install ng2-cordova-oauth --save
```

This will install ng2-cordova-oauth and its dependencies.

### Injecting:

There are 2 types of entities in the library: Platform (i.e., Cordova, Browser) and Provider (i.e., Facebook, LinkedIn, etc.). Each provider has it's own class.
You need to inject the Platform class into every class in which you wish to use them. For example, if you wish to use Facebook oauth in a particular class, it would look something like:

```javascript
import {Facebook, Google} from 'ng2-cordova-oauth/core';
import {OauthBrowser} from 'ng2-cordova-oauth/platform/browser'
// or
import {OauthCordova} from 'ng2-cordova-oauth/platform/cordova'
```

Alternatively you can use Angular2 Injector in order to provide platform specific service for all components:
```js
import {bootstrap} from '@angular/platform-browser-dynamic'
import {App} from './app.component'
import {OauthCordova} from 'ng2-cordova-oauth/platform/cordova'
import {Oauth} from 'ng2-cordova-oauth/oauth'

bootstrap(App, [
  { provide: Oauth, useClass: OauthCordova }
])

// and later in component

@Component({
  selector: 'my-component'
})
class MyComponent {
  constructor(oauth: Oauth) {
    this.oauth = oauth
  }
}
```


## Using ng2-cordova-oauth In Your Project

Each web service API acts independently in this library.  However, when configuring each web service, one thing must remain consistent.

Currently it supports several oAuth providers: Facebook, Instagram, LinkedIn, Google, Meetup, Imgur. Example of creating oAuth provider:

```js
const provider = new Facebook({
    clientId: string,
    appScope?: string[],
    redirectUri?: string,
    responseType?: string,
    authType?: string
});
```

Each API call returns a promise.  The success callback will provide a response object and the error callback will return an `Error` object.  Not all providers use implicit grants.  Any provider that uses an explicit grant will return a `code` rather than an `access_token`.  The `code` must be
further exchanged server side for an `access_token`.  This is for the safety of your users.

```js
const oauth = new OauthCordova();
const provider = new Facebook({
  clientId: "CLIENT_ID_HERE",
  appScope: ["email"]
})

oauth.logInVia(provider).then((success) => {
    console.log(JSON.stringify(success));
}, (error) => {
    console.log(JSON.stringify(error));
});
```

As of Apache Cordova 5.0.0, the [whitelist plugin](https://blog.nraboy.com/2015/05/whitelist-external-resources-for-use-in-ionic-framework/) must be used in order to reach external web services.

Now this library can work with a web browser, ionic serve, or ionic view in case if you use `OauthPlatform` service but do not forget to replace it with correct one for cordova project (i.e., `OauthCordova`)

### Important Note About Google

Google, as of October 2016, has started blocking requests from web views commonly found in hybrid applications. For this reason, support for Google has been removed from this library.

More information can be found at:

[https://developers.googleblog.com/2016/08/modernizing-oauth-interactions-in-native-apps.html](https://developers.googleblog.com/2016/08/modernizing-oauth-interactions-in-native-apps.html)

## A Working Example

```javascript
import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Facebook, Google, LinkedIn} from "ng2-cordova-oauth/core";
import {OauthCordova} from 'ng2-cordova-oauth/platform/cordova';

@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

    private oauth: OauthCordova = new OauthCordova();
    private facebookProvider: Facebook = new Facebook({
      clientId: "CLIENT_ID_HERE",
      appScope: ["email"]
    })

    constructor(private navCtrl: NavController, private platform: Platform) { }

    public facebook() {
        this.platform.ready().then(() => {
            this.oauth.logInVia(this.facebookProvider).then(success => {
                console.log("RESULT: " + JSON.stringify(success));
            }, error => {
                console.log("ERROR: ", error);
            });
        });
    }

}
```
Alternatively you can inject `OauthCordova` in constructor as shown in examples above.

### Custom browser window options

Browser's `window.open` and Cordova's InAppBrowser supports bunch of options which can be passed as a second argument to `logInVia`. For example if you don't know want to clear session cache, or place toolbar at the top for iOS:
```js
new OauthCordova().logInVia(facebookProvider, {
  clearsessioncache: 'no',
  toolbarposition: 'top'
})
```

the list of all available options can be found:
* https://developer.mozilla.org/en-US/docs/Web/API/Window/open for web apps
* https://github.com/apache/cordova-plugin-inappbrowser#cordovainappbrowseropen for cordova apps


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
