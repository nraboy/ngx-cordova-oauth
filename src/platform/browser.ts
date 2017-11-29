import { Oauth } from '../oauth';
import { utils } from '../utility';

export class OauthBrowser extends Oauth {
    static WATCH_POPUP_TIMEOUT = 100

    defaultWindowOptions = {
      width: 600,
      location: 1,
      toolbar: 0,
    };

    protected openDialog(url: string, params: Object, options: any = {}) {
        const windowParams = this.addWindowRect(utils.defaults({ title: 'Authentication' }, params));
        const title = windowParams.title;
        delete windowParams.title;

        const popup = window.open(url, title, this.serializeOptions(windowParams))
        const watchDelay = (<any>this.constructor).WATCH_POPUP_TIMEOUT;

        return new Promise((resolve, reject) => {
          if (typeof popup.focus === 'function') {
            popup.focus();
          }

          setTimeout(function watchPopup() {
            try {
              if (popup.closed) {
                return reject(new Error(`The "${options.providerName}" sign in flow was canceled`));
              }

              if (popup.location.href.indexOf(options.resolveOnUri) === 0) {
                popup.close();
                return resolve({ url: popup.location.href });
              }
            } catch (e) {
            }

            setTimeout(watchPopup, watchDelay);
          }, watchDelay);
        });
    }

    private addWindowRect(params) {
      const root = document.documentElement;
      let screenX = typeof window.screenX !== 'undefined' ? window.screenX : window.screenLeft;
      const screenY = typeof window.screenY !== 'undefined' ? window.screenY : window.screenTop;
      const outerWidth = typeof window.outerWidth !== 'undefined' ? window.outerWidth : root.clientWidth;
      const outerHeight = typeof window.outerHeight !== 'undefined' ? window.outerHeight : root.clientHeight - 22;

      screenX = screenX < 0 ? window.screen.width + screenX : screenX;
      params.height = Math.floor(outerHeight * 0.8);
      params.left = Math.floor(screenX + (outerWidth - params.width) / 2);
      params.top = Math.floor(screenY + (outerHeight - params.height) / 2.5);

      return params;
    }
}
