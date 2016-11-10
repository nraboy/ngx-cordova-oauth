import { Oauth } from '../oauth';

declare var window: any;

function ensureEnvIsValid() {
  if (!window.cordova) {
      throw new Error('Cannot authenticate via a web browser');
  }

  if (!window.cordova.InAppBrowser) {
      throw new Error('The Apache Cordova InAppBrowser plugin was not found and is required');
  }
}

export class OauthCordova extends Oauth {
  defaultWindowOptions = {
      location: 'no',
      clearsessioncache: 'yes',
      clearcache: 'yes'
  };

  protected openDialog(url: string, windowParams: Object, options: any = {}) {
    const params = this.serializeOptions(windowParams);

    return new Promise((resolve, reject) => {
        try {
          ensureEnvIsValid();
        } catch (error) {
          return reject(error);
        }

        const browserRef = window.cordova.InAppBrowser.open(url, '_blank', params);
        const exitListener = () => reject(new Error(`The "${options.providerName}" sign in flow was canceled`));

        browserRef.addEventListener('loaderror', () => {
          browserRef.removeEventListener('exit', exitListener);
          browserRef.close();
          reject(new Error(`Error loading login page of "${options.providerName}"`));
        });

        browserRef.addEventListener('loadstart', (event) => {
            if (event.url.indexOf(options.resolveOnUri) === 0) {
                browserRef.removeEventListener('exit', exitListener);
                browserRef.close();
                resolve(event)
            }
        })

        return browserRef.addEventListener('exit', exitListener);
    })
  }
}
