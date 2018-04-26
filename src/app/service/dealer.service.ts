import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AuthService } from './auth.service';
import { Constants } from './constants';
import { Observable } from 'rxjs';
import * as cbv from './../models/vendor';

@Injectable()
export class DealerService {

  constructor(private auth: AuthService, private http: Http) { }

  vendor: cbv.Vendor.VendorDetail = new cbv.Vendor.VendorDetail();

  /**
   * get list of all dealers
   */
  getDealerDetails(id): Observable<any> {   
      if (localStorage.getItem("vendor") != null)
        return Observable.of(localStorage.getItem("vendor")).map(res => JSON.parse(res));
      else
        return this.fetchDealer(id);   
  }

  fetchDealer(id) {
    if (this.auth.isAuthenticated()) {
       var headers = new Headers();
       headers.append('access_token', `${this.auth.getSession().token}`);
      headers.append('Content-Type', 'application/json');
    return this.http.get(Constants.GET_DEALER_DETAILS(id), { headers: headers }) 
      .map(res => {
        localStorage.setItem('vendor', JSON.stringify(res.json()));
        return res.json();
      });
    }
  }

  /**
   * Create a new dealer
   */
  createDealer(data) {
    if (this.auth.isAuthenticated()) {
       var headers = new Headers();
       headers.append('access_token', `${this.auth.getSession().token}`);
      headers.append('Content-Type', 'application/json');
    return this.http.post(Constants.CREATE_DEALER(), data, { headers: headers })
      .map(res => {
        return res.json();
      },
      err => {
        console.log("error", err);
      });
    }
  }

  /**
   * Update existing dealer
   */
  updateDealer(id, data) {     
    if (this.auth.isAuthenticated()) {
      var headers = new Headers();
      headers.append('access_token', `${this.auth.getSession().token}`);
      headers.append('Content-Type', 'application/json');
    return this.http.put(Constants.UPDATE_VENDOR_SRV_URL(id), data, { headers: headers })
      .map(res => res.json());
    }
  }

  /**
   * Get users for dealer
   */
  getUsersForDealer(id) {
    if (this.auth.isAuthenticated()) {
       var headers = new Headers();
     headers.append('access_token', `${this.auth.getSession().token}`);
    return this.http.get(Constants.CARBOOK_BASE_URL + Constants.GET_USER_LIST(id), { headers: headers })
      .map(res => res.json());
    }
  }

  searchDealer(query) {
    if (this.auth.isAuthenticated()) {
       var headers = new Headers();
       headers.append('access_token', `${this.auth.getSession().token}`);
       return this.http.get(Constants.SEARCH_DEALER_URL(query), { headers: headers })
      .map(res => res.json());
      }
  }

  searchDealerfromES(name,countrycode) {
    if (this.auth.isAuthenticated()) {
       var headers = new Headers();
      headers.append('access_token', `${this.auth.getSession().token}`);
      headers.append('Content-Type', 'application/json');
       return this.http.get(Constants.SEARCH_DEALER_ES(name,countrycode), { headers: headers })
      .map(res => res.json());
      }
  }

  dealerList(make,countrycode){
    if(this.auth.isAuthenticated){
      var headers = new Headers();
      headers.append('access_token', `${this.auth.getSession().token}`);
     return this.http.get(Constants.CARBOOK_BASE_URL + Constants.DEALER_LIST+ make.toLowerCase() + '/countrycode/'+ countrycode,{headers : headers})
      .map(res=>res.json());
    }
  }

  dealerByEmail(email){
     if(this.auth.isAuthenticated){
      var headers = new Headers();
      headers.append('access_token', `${this.auth.getSession().token}`);
       return this.http.get(Constants.CARBOOK_BASE_URL + Constants.DEALER_SEARCH_BY_EMAIL + email,{headers : headers})
      .map(res=>res.json());
     }
  }

}
