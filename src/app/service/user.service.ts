import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service'
import { Http, Headers, RequestOptions } from "@angular/http";
import { Constants } from './constants';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

   constructor(private auth: AuthService, private http: Http) { }


   fetchUserInfo(): Observable<any> {
    if (this.auth.isAuthenticated()) {
      var headers = new Headers();
      headers.append('Authorization', `Bearer ${this.auth.getSession().token}`);
      return this.http.get(Constants.CARBOOK_BASE_URL + Constants.USER_DETAILS, { headers: headers })
        .map(res => {
          localStorage.setItem("userInfo", JSON.stringify(res.json()))
          return res.json();
        })
    } else {
      console.log("Error. Not Logged in");
    }
  }
  getUserByEmail(email) {
    if (this.auth.isAuthenticated()) {
      var headers = new Headers();
      headers.append('access_token', `${this.auth.getSession().token}`);
      return this.http.get(Constants.CARBOOK_BASE_URL + Constants.SEARCH_USER + email, { headers: headers })
        .map(res => res.json());
    } else {
      console.log("Error. Not logged in")
    }
  }

  fetchUserOrgInfo(): Observable<any> {
    if (this.auth.isAuthenticated()) {
      var headers = new Headers();
      headers.append('access_token', `${this.auth.getSession().token}`);
      return this.http.get(Constants.CIDAAS_BASE_URL + Constants.CIDAAS_USER_URL, { headers: headers })
        .map(res => {
          localStorage.setItem("userorginfo", JSON.stringify(res.json()))
          return res.json();
        })
    } else {
      console.log("Error. Not logged in");
    }
  }


  fetchGroupListForUser(userID: any): Observable<any> {
    if (this.auth.isAuthenticated()) {
      var headers = new Headers();
      headers.append('access_token', `${this.auth.getSession().token}`);
      headers.append('Content-Type', 'application/json');
      return this.http.get(Constants.CIDAAS_BASE_URL + Constants.CIDAAS_USER_GROUPLIST_URL + userID, { headers: headers })
        .map(res => res.json());
    } else {
      console.log("Error. Not logged in");
    }
  }

  updateUserGroup(body: any): Observable<any> {
    if (this.auth.isAuthenticated()) {
      var headers = new Headers();
      headers.append('access_token', `${this.auth.getSession().token}`);
      headers.append('Content-Type', 'application/json');
      return this.http.post(Constants.CIDAAS_BASE_URL + Constants.CIDAAS_USER_GROUP_URL, body, { headers: headers })
        .map(res => res);
    } else {
      console.log("Error. Not logged in");
    }
  }

  getUserInfo(): Observable<any> {
    if (this.auth.isAuthenticated) {
      if (localStorage.getItem("userInfo") != null)
        return Observable.of(localStorage.getItem("userInfo")).map(res => JSON.parse(res));
      else
        return this.fetchUserInfo();
    }
  }

  getUserOrgInfo(): Observable<any> {
    if (this.auth.isAuthenticated) {
      if (localStorage.getItem("userorginfo") != null)
        return Observable.of(localStorage.getItem("userorginfo")).map(res => JSON.parse(res));
      else
        return this.fetchUserOrgInfo();
    }
  }


}
