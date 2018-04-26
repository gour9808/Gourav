import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';


@Injectable()
export class HttpServiceInterceptor extends Http {

    constructor(backend: XHRBackend, defaultOptions: RequestOptions, private router: Router) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options).catch((error: Response) => {
            console.log(error);
            if ((error.status === 401 || error.status === 403)) {
                console.log('Session Expired. Show Alert and redirect to login');
                // alert("Your session has expired. Please Login again.");
                // this.router.navigate(['/auth']);
            } else if (error.status === 500 || error.status === 0) {
                console.log("Something broke from server. Show 500 page");
                this.router.navigate(['/server-error']);
            }
            return Observable.throw(error);
        });
    }
}