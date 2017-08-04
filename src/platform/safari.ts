import { Oauth } from '../oauth'

declare var SafariViewController: any;
declare var IonicDeeplink: any;

export class OauthSafariController extends Oauth {
  private resolveOpenedDialog: Function
  defaultWindowOptions: any = {
    timeout: 60000
  }

  constructor() {
    super()
    this.setupDeeplinks({ loginPath: '/login' })
  }

  protected setupDeeplinks(options) {
    IonicDeeplink.route({}, null, match => {
      if (match.$link.path === options.loginPath && this.resolveOpenedDialog) {
        this.resolveOpenedDialog({ url: match.$link.url })
      }
    })
  }

  protected openDialog(url: string, params: any) {
    return new Promise((resolve, reject) => {
      SafariViewController.isAvailable(isAvailable => {
        if (!isAvailable) {
          return reject(new Error('SafariViewController is not available'))
        }

        const { timeout, ...windowParams } = params
        const timerId = this.setupTimer(timeout, reject)

        this.resolveOpenedDialog = data => {
          this.closeDialog(timerId)
          resolve(data)
        }
        SafariViewController.show({ url, ...windowParams }, null, message => {
          this.closeDialog(timerId)
          reject(new Error(message))
        })
      })
    })
  }

  protected setupTimer(delay, done) {
    if (delay === 0) {
      return 0
    }

    return setTimeout(() => {
      this.closeDialog()
      done(new Error(`Did not receive response from Oauth provider after ${delay}ms`))
    }, delay)
  }

  protected closeDialog(timerId = null) {
    if (timerId) {
      clearTimeout(timerId)
    }

    this.resolveOpenedDialog = null
    SafariViewController.hide()
  }
}
