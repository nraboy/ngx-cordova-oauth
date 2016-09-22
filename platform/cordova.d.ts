import { Oauth } from '../oauth';
export declare class OauthCordova extends Oauth {
    defaultWindowOptions: {
        location: string;
        clearsessioncache: string;
        clearcache: string;
    };
    protected openDialog(url: string, windowParams: Object, options?: any): Promise<{}>;
}
