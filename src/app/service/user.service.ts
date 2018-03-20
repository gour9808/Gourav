import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service'
import { Http, Headers, RequestOptions } from "@angular/http";
import { Constants } from './constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cache } from './storage.provider';


@Injectable()
export class UserService {
    @Cache({ pool: 'User' }) userInfo: any;
    constructor(private auth: AuthService, private http: HttpClient) { }


    fetchUserInfo(): Observable<any> {
        return this.http.get<any>(Constants.HEALTHCUBE_BASE_URL + Constants.USER_DETAILS)
            .map(res => {
                localStorage.setItem('userInfo', JSON.stringify(res))
                this.userInfo = res;
                return res;
            })
    }

    getVisits(id) {
        return this.http.get<any>(Constants.GET_VISITS(id));
    }

    getFamily(phone) {
        return this.http.get<any>(Constants.GET_FAMILY_DETAILS(phone));
    }

}
