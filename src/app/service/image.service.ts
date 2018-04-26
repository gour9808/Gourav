import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service'
import { Http, Headers, RequestOptions } from "@angular/http";
import { Constants } from './constants';
import * as cbv from './../models/vendor';

@Injectable()
export class ImageService {

  constructor(private http: Http, private auth: AuthService) { }

  vendor: cbv.Vendor.VendorDetail = new cbv.Vendor.VendorDetail();

  public dealerlogoUpload(data) {
   if (this.auth.isAuthenticated()) {
      var headers = new Headers();
       headers.append('access_token', `${this.auth.getSession().token}`);
      headers.append('Content-Type', 'application/json');
     return this.http.post(Constants.IMAGE_UPLOAD_URL(),data,  { headers: headers })
        .map(res =>  res.json());
     }
  }

  public dealerImageUpload(data) {
    if (this.auth.isAuthenticated()) {
      var headers = new Headers();
       headers.append('access_token', `${this.auth.getSession().token}`);
      headers.append('Content-Type', 'application/json');
    return this.http.post(Constants.IMAGE_UPLOAD_URL(),data,  { headers: headers })
        .map(res => res.json());
    }
  }
  
}
