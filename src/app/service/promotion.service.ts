import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service'
import { Http, Headers, RequestOptions } from "@angular/http";
import { Constants } from './constants';

@Injectable()
export class PromotionService {

  constructor(private auth: AuthService, private http: Http) { }

  sendPromotion(data) {
    return this.http.post(Constants.DEALER_PROMO_URL(), data)
        .map(res => res.json());
  }
}
